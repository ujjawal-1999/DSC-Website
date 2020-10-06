const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Project = require("../models/project");
const authorization = require("../middleware/auth");
const multer = require("multer");
const uuid = require("uuid");
const fs = require("fs");
const path = require("path");
const async = require("async");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { check, validationResult } = require("express-validator");
const flash = require("connect-flash");
const session = require("express-session");
const nodemailer = require("nodemailer");
const cryptoRandomString = require("crypto-random-string");

//setting up methods
router.use(bodyParser.json());
router.use(cookieParser("secret_passcode"));
router.use(bodyParser.urlencoded({ extended: true }));
router.use(
  session({
    secret: "secret_passcode",
    cookie: {
      maxAge: 4000000,
    },
    resave: false,
    saveUninitialized: false,
  })
);
router.use(flash());

router.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

//nodemailer methods

var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_EMAIL, //email id
    pass: process.env.NODEMAILER_PASSWORD, //my gmail password
  },
});

var rand, mailOptions, host, link;
/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/
router.get("/new", (req, res) => {
  res.render("register");
});

router.get("/verify/:id", function (req, res) {
  // console.log(req.protocol+":/"+req.get('host'));

  if (req.protocol + "://" + req.get("host") == "http://" + host) {
    console.log("Domain is matched. Information is from Authentic email");

    User.findById(req.params.id, function (err, user) {
      if (err) console.log(err);
      else {
        date2 = new Date();
        date1 = user.created_at;
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffhrs = Math.ceil(timeDiff / (1000 * 60));
        console.log(diffhrs);

        if (diffhrs <= 3) {
          User.findByIdAndUpdate(user._id, { active: true }, function (
            err,
            user
          ) {
            if (err) console.log(err);
            else {
              console.log("email is verified");
              // res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
              res.render("verify");
            }
          });
        } else {
          User.findByIdAndUpdate(
            user._id,
            { created_at: new Date() },
            function (err, user) {
              if (err) console.log(err);
            }
          );
          console.log("Link has expired try logging in to get a new link");
          // res.end("<h1>Link has expired try logging in to get a new link</h1>");
          res.render("notverified");
        }
      }
    });
  } else {
    res.end("<h1>Request is from unknown source");
  }
});
router.get("/verify/forgotpassword/:id", function (req, res) {
  // console.log(req.protocol+":/"+req.get('host'));

  if (req.protocol + "://" + req.get("host") == "http://" + host) {
    console.log("Domain is matched. Information is from Authentic email");

    User.findById(req.params.id, function (err, user) {
      if (err) console.log(err);
      else {
        if (user.active) res.render("changepassword", { user: user });
        else {
          User.findByIdAndUpdate(user._id, { active: true }, function (
            err,
            user
          ) {
            if (err) console.log(err);
            else {
              console.log("email is verified");
              res.render("changepassword", { user: user });
            }
          });
        }
      }
    });
  } else {
    res.end("<h1>Request is from unknown source");
  }
});
//==============================

router.post("/changepassword/:id", function (req, res) {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    User.findByIdAndUpdate(req.params.id, { password: hash }, function (
      err,
      user
    ) {
      if (err) console.log(err);
      else {
        req.flash("success", "Your password has been reset try logging in");
        res.redirect("/dsc/");
      }
    });
  });
});

//==============================

//Config Modules

const { checkProfileImageType } = require("../config/checkType");
const blog = require("../models/blog");

//Setup a test Router for user routes
router.get("/", (req, res) => {
  res.json({ message: "User routes connected" });
});

// route to check if the handle is vaild
router.get("/verify-handle/:handle", async (req, res) => {
  const handle = req.params.handle.toLowerCase();
  const found = await User.find({ dscHandle: handle });
  const valid = /([a-z\.]{2,6})([\%\?\=\/\w \.-]*)*\/?$/.test(handle);
  res.json({
    inUse: found.length !== 0,
    valid: valid,
  });
});

//get route for signup
router.get("/register", async (req, res) => {
  var token = req.cookies.authorization;
  const finduser = await User.find();
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) console.log(err);
      else req.user = user;
      console.log(user);
      res.render("register", { user: user, found: finduser });
    });
  } else res.render("register", { user: req.user, found: finduser });
});

//post route for signup
router.post("/register", (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).jsonp(errors.array());
  } else {
    bcrypt.hash(req.body.password, 10).then((hash) => {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then((response) => {
          //nodemailer
          rand = cryptoRandomString({ length: 100, type: "url-safe" });
          host = req.get("host");
          link =
            "http://" +
            req.get("host") +
            "/dsc/user/verify/" +
            user._id +
            "?tkn=" +
            rand;
          mailOptions = {
            from: process.env.NODEMAILER_EMAIL,
            to: user.email,
            subject: "Please confirm your Email account",
            html:
              "Hello,<br> Please Click on the link to verify your email.<br><a href=" +
              link +
              ">Click here to verify</a>",
          };
          // console.log(mailOptions);
          transporter.sendMail(mailOptions, function (error, response) {
            if (error) {
              console.log(error);
              res.end("error");
            } else {
              console.log("Message sent: " + response.message);
            }
          });
          //nodemailer ends
          res.locals.flashMessages = req.flash(
            "success",
            user.name + " Email has been sent to you for verification"
          );
          res.redirect("/dsc/");
        })
        .catch((error) => {
          // res.status(500).json({
          //     error: error
          // });
          // console.log(error);
          res.locals.flashMessages = req.flash(
            "error",
            "Email already in use try logging in"
          );
          res.redirect("/dsc/");
        });
    });
  }
});

//get route for login
router.get("/login", function (req, res) {
  res.render("register");
});

//post route for login
router.post("/login", (req, res, next) => {
  let getUser;
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        req.flash("error", "User not found try creating a new account");
        res.redirect("/dsc/");
      }
      getUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((response) => {
      if (!response) {
        req.flash("error", "You have entered wrong password");
        res.redirect("/dsc/");
      }
      if (getUser.active) {
        var token = jwt.sign(
          {
            name: getUser.name,
            email: getUser.email,
            userId: getUser._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );
        console.log(token);
        res.cookie("authorization", token, {
          maxAge: 24 * 60 * 60 * 1000,
          httpOnly: false,
        });
      }
      if (getUser.active) {
        req.flash("success", getUser.name + " you are logged in");
        res.redirect("/dsc/");
      } else {
        rand = cryptoRandomString({ length: 100, type: "url-safe" });
        host = req.get("host");
        link =
          "http://" +
          req.get("host") +
          "/dsc/user/verify/" +
          getUser._id +
          "?tkn=" +
          rand;
        mailOptions = {
          from: process.env.NODEMAILER_EMAIL,
          to: getUser.email,
          subject: "Please confirm your Email account",
          html:
            "Hello,<br> Please Click on the link to verify your email.<br><a href=" +
            link +
            ">Click here to verify</a>",
        };
        // console.log(mailOptions);
        transporter.sendMail(mailOptions, function (error, response) {
          if (error) {
            console.log(error);
            res.end("error");
          } else {
            console.log("Message sent: " + response.message);
          }
        });
        req.flash(
          "error",
          getUser.name + " your email is not verified we have sent you an email"
        );
        res.redirect("/dsc/");
      }
    });
});

//checking for user
// router.get("/user",authorization,function(req,res){
//     res.send(req.user);
// });

//get route for logging out user
router.get("/logout", function (req, res) {
  res.clearCookie("authorization");
  req.flash("success", "You are successfully logged out");
  res.redirect("/dsc/");
});
//get route for forget password
router.get("/forgotpassword", function (req, res) {
  res.render("forgotpassword");
});

//post route for forgotpassword
router.post("/forgotpassword", function (req, res) {
  let getUser;
  User.findOne({
    email: req.body.email,
  }).then((user) => {
    if (!user) {
      req.flash("error", "User not found try creating a new account");
      res.redirect("/dsc/");
    }
    getUser = user;
    rand = cryptoRandomString({ length: 100, type: "url-safe" });
    host = req.get("host");
    link =
      "http://" +
      req.get("host") +
      "/dsc/user/verify/forgotpassword/" +
      getUser._id +
      "?tkn=" +
      rand;
    mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: getUser.email,
      subject: "Please confirm your Email account",
      html:
        "Hello,<br> Please Click on the link to verify your email.<br><a href=" +
        link +
        ">Click here to verify</a>",
    };
    // console.log(mailOptions);
    transporter.sendMail(mailOptions, function (error, response) {
      if (error) {
        console.log(error);
        res.end("error");
      } else {
        console.log("Message sent: " + response.message);
      }
    });
    req.flash(
      "success",
      getUser.name + " we sent you an email to reset your password"
    );
    res.redirect("/dsc/");
  });
});

// Get Route for Profile

router.get("/profile", authorization, async (req, res) => {
  try {
    const token = req.cookies.authorization;
    const finduser = await User.find();
    const userBlog = await blog.find();
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        var timelineBlogs = [];
        userBlog.forEach((blog) => {
          if (blog.author == req.dbUser.id) {
            timelineBlogs.push(blog);
          }
        });
        // console.log(timelineBlogs);
        res.render("profile", {
          user: req.dbUser,
          myblogs: timelineBlogs,
          found: finduser,
        });
      });
    } else {
      res.redirect("/dsc/user/register");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get("/public-profile/:handle", async (req, res) => {
  try {
    // const token = req.cookies.authorization;
    const finduser = await User.find();
    const userBlog = await blog.find();
    req.dbUser = await User.findOne({ dscHandle: req.params.handle });
    if (req.dbUser) {
      var timelineBlogs = [];
      userBlog.forEach((blog) => {
        if (blog.author == req.dbUser.id) {
          timelineBlogs.push(blog);
        }
      });
      // console.log(timelineBlogs);
      console.log(req.dbUser.dscHandle);
      console.log(typeof req.dbUser);
      res.render("public-profile", {
        user: req.dbUser,
        myblogs: timelineBlogs,
        found: finduser,
      });
    } else {
      res.redirect("/dsc/404");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.post("/skill", authorization, async (req, res) => {
  try {
    // console.log(req);
    // console.log(req.body);
    const user = req.dbUser;
    const newSkill = {
      name: req.body.skillname,
      level: req.body.skilllevel,
      duration: req.body.skillduration,
      description: req.body.skilldescription,
    };

    user.skills.push(newSkill);
    // console.log(newSkill);
    await user.save();

    res.redirect(req.get("referer"));
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/delete/skill/:id", authorization, async (req, res) => {
  try {
    const user = req.dbUser;
    user.skills = user.skills.filter(
      (skill) => !skill._id.equals(req.params.id)
    );
    await user.save();
    res.redirect(req.get("referer"));
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/experience", authorization, async (req, res) => {
  try {
    // console.log("experience route called");
    const user = req.dbUser;
    // console.log(req.body);
    const newExp = {
      name: req.body.exp_name,
      role: req.body.exp_role,
      startdate: req.body.exp_startdate,
      enddate: req.body.exp_enddate,
      status: req.body.exp_status,
      description: req.body.exp_description,
    };
    user.experiences.push(newExp);
    // console.log(newExp);
    await user.save();
    res.redirect(req.get("referer"));
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/delete/experience/:id", authorization, async (req, res) => {
  try {
    const user = req.dbUser;
    user.experiences = user.experiences.filter(
      (experience) => !experience._id.equals(req.params.id)
    );
    await user.save();
    res.redirect(req.get("referer"));
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//Post Route to edit User Profile Details
router.post("/profile", authorization, (req, res) => {
  try {
    const token = req.cookies.authorization;
    if (token) {
      var id;
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        id = user.userId;
      });
      console.log(req.body);
      User.findByIdAndUpdate(id, {
        name: req.body.name,
        dscHandle: req.body.hname,
        degree: req.body.degree,
        branch: req.body.branch,
        batch: req.body.batchYear,
        bio: req.body.bio,
        socialLinks: {
          linkedin: req.body.linkedin,
          twitter: req.body.twitter,
          facebook: req.body.facebook,
        },
      }).then((result) => {
        // console.log(result);
        res.redirect("/dsc/user/profile");
      });
    } else {
      console.log("Token was not found");
      res.redirect("/dsc");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});
router.post("/project/personal", authorization, async (req, res) => {
  try {
    const user = req.dbUser;
    const newProject = {
      title: req.body.title,
      description: req.body.description,
      role: req.body.role,
      techstack: req.body.techstack,
      githuburl: req.body.githuburl,
      startdate: req.body.startdate,
      enddate: req.body.enddate,
      hosturl: req.body.hosturl,
    };

    user.personalProjects.push(newProject);
    // console.log(newSkill);
    await user.save();
    console.log(user);

    res.redirect("/dsc/user/profile");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/delete/project/personal/:id", authorization, async (req, res) => {
  try {
    const user = req.dbUser;
    user.personalProjects = user.personalProjects.filter(
      (proj) => !proj._id.equals(req.params.id)
    );
    await user.save();
    res.redirect(req.get("referer"));
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//to add new achievement
router.post("/achievement", authorization, async (req, res) => {
  try {
    console.log(req.body);
    const user = req.dbUser;
    const newAchievement = {
      name: req.body.achievementname,
      platform: req.body.achievementnameplatform,
      date: req.body.achievementnamedate,
      serial: req.body.achievementnameserial,
      description: req.body.projectdescription,
    };

    user.achievements.push(newAchievement);
    console.log(newAchievement);
    await user.save();
    // console.log(user);

    res.redirect(req.get("referer"));
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/delete/achievement/:id", authorization, async (req, res) => {
  try {
    const user = req.dbUser;
    user.achievements = user.achievements.filter(
      (achievement) => !achievement._id.equals(req.params.id)
    );
    await user.save();
    res.redirect(req.get("referer"));
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
//Post Route to add new Project
router.post("/project/:user", async (req, res) => {
  var title = req.body.projectname;
  var role = req.body.projectrole;
  var description = req.body.projectdescription;
  var newProject = {
    title: title,
    role: role,
    description: description,
  };
  User.findById(
    {
      _id: req.params.user,
    },
    (err, user) => {
      if (err) {
        console.log(err);
      } else {
        Project.create(newProject, function (err, project) {
          if (err) {
            console.log(err);
          } else {
            project.save();
            user.projects.push(project);
            user.save();
            console.log(user);
            res.redirect("/dsc/user/profile");
          }
        });
      }
    }
  );
});
//Establish Storage for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const newDestination =
      __dirname + `/../../public/upload/profile/${req.params.id}`;
    console.log("New Destination: ", newDestination);
    var stat = null;
    try {
      stat = fs.statSync(newDestination);
    } catch (err) {
      fs.mkdir(newDestination, { recursive: true }, (err) => {
        if (err) console.error("New Directory Error: ", err);
        else console.log("New Directory Success");
      });
    }
    if (stat && !stat.isDirectory())
      throw new Error("Directory Couldnt be created");
    cb(null, newDestination);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + uuid.v4() + path.extname(file.originalname)
    );
  },
});
//(Profile Image)

var uploadProfileImage = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: function (req, file, cb) {
    checkProfileImageType(file, cb);
  },
}).single("profile-image");

//Post Route to update Profile Image
router.post("/profile/upload/:id", uploadProfileImage, async (req, res) => {
  const id = req.params.id;
  let errors = [];
  let avatar;
  console.log(req.file);
  User.findById({ _id: id })
    .then((user) => {
      if (!user) {
        errors.push({ msg: "No Records of user found at this moment" });
        res.send({ message: "Error" });
      }
      uploadProfileImage(req, res, (err) => {
        if (err) {
          errors.push({ message: err });
          console.log("Error1", err);
          avatar = "";
        } else {
          if (req.file == undefined) {
            errors.push({ msg: "No Image Selected" });
            console.log("err2", errors);
            avatar = undefined;
          } else {
            avatar = `/profile/${user._id}/${req.file.filename}`;
            console.log("avatar", avatar);
          }
        }
        if (avatar != undefined) {
          user.profileImageLocation = `${avatar}`;
        } else {
          user.profileImageLocation = "/img/avatar.png"; //if no image is set then select this for user
        }
        user
          .save()
          .then((user) => {
            console.log("avatar value", avatar);
            if (errors.length == 0) {
              console.log(" Profile Updated!");
              res.redirect("/dsc/user/profile");
            } else {
              console.log(" Profile not Updated!");
              res.redirect("/dsc/user/profile");
            }
          })
          .catch((err) => {
            console.log("profile not updated");
          });
      });
    })
    .catch((err) => {
      console.log("error", err);
    });
});

module.exports = router;
