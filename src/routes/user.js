const express = require("express");
const router = express.Router();
const User = require("../models/user");
// const Project = require("../models/project");
const Blog = require("../models/blog");
const authorization = require("../middleware/auth");
const multer = require("multer");
const uuid = require("uuid");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { validationResult } = require("express-validator");
const flash = require("connect-flash");
const session = require("express-session");
// const cryptoRandomString = require("crypto-random-string");
const { signUpMail, forgotPassword } = require("../account/nodemailer");
const { checkProfileImageType } = require("../config/checkType");


/*------------------Routing Started ------------------------*/
router.get("/new", (req, res) => {
  res.render("register");
});

router.get("/verify/:id", async (req, res) => {
  // console.log(req.protocol+":/"+req.get('host'));
  if (req.protocol + "://" + req.get("host") == "http://" + req.get("host")) {
    //console.log("Domain is matched. Information is from Authentic email");

    const user = await User.findById(req.params.id);

    if (!user) {
      // console.log("Error from /user/verify route", error);
      res.locals.flashMessages = req.flash("error", "User not found");
      res.redirect("/");
    } else {
      const currDate = new Date();
      const initialCreatedAt = user.created_at;
      const timeDiff = Math.abs(
        currDate.getTime() - initialCreatedAt.getTime()
      );
      // const diffhrs = Math.ceil(timeDiff / (1000 * 60));
      // console.log(diffhrs);
      if (diffhrs <= 21600000) {
        const updatedUser = await User.findByIdAndUpdate(user._id, {
          active: true,
        });
        if (!updatedUser) {
          console.log(err);
          res.locals.flashMessages = req.flash("error","An error occured");
          res.redirect("/");
        } else {
          // console.log("Email Verified");
          res.render("verification", {
            verified: true,
          });
        }
      } else {
        await User.findByIdAndUpdate(user._id, { created_at: new Date() });
        // console.log("Link has expired try logging in to get a new link");
        // res.end("<h1>Link has expired try logging in to get a new link</h1>");
        res.render("verification", {
          verified: false,
        });
      }
    }
  } else {
    // console.log("Response is from an unknown source");
    res.redirect("/")
  }
});

router.get("/verify/forgotpassword/:id", function (req, res) {
  // console.log(req.protocol+":/"+req.get('host'));

  if (req.protocol + "://" + req.get("host") == "http://" + req.get("host")) {
    // console.log("Domain is matched. Information is from Authentic email");

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
              // console.log("email is verified");
              res.render("changepassword", { user: user });
            }
          });
        }
      }
    });
  } else {
    res.end("<h1>Request is from unknown source</h1>");
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
        res.locals.flashMessages = req.flash(
          "success",
          "Your password has been reset successfully. Try Logging in again"
        );
        res.redirect("/user/register?type=login");
      }
    });
  });
});

// Route to change the password from within the profile
router.get("/update-password", authorization, async (req, res) => {
  const findUser = await User.find({ active: true });
  res.render("updatepassword", {
    user: req.user,
    found: findUser,
  });
});

router.post("/update-password", authorization, async (req, res) => {
  const checkPassword = await bcrypt.compare(
    req.body.oldPassword,
    req.dbUser.password
  );
  if (!checkPassword) {
    req.flash("error", "You have entered a wrong password");
    res.redirect("/user/update-password");
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    req.flash("error", "Password and Confirm Password does not match");
    res.redirect("/user/update-password");
  }
  if (req.body.oldPassword === req.body.newPassword) {
    req.flash("error", "New Password cannot be the same as old password");
    res.redirect("/user/update-password");
  }
  const hash = await bcrypt.hash(req.body.newPassword, 10);
  await User.findByIdAndUpdate(req.dbUser._id, { password: hash });
  req.flash(
    "success",
    "Your password has been reset successfully."
  );
  res.redirect("/");
});

//==============================

//Setup a test Router for user routes
router.get("/testUser", (req, res) => {
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
  const finduser = await User.find({ active: true });
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) console.log(err);
      else req.user = user;
      // console.log(user);
      res.render("register", { user: user, found: finduser });
    });
  } else res.render("register", { user: req.user, found: finduser });
});

//post route for signup
router.post("/register", async (req, res, next) => {
  const errors = validationResult(req);
  // console.log(errors);
  if (!errors.isEmpty()) {
    // res.status(422).jsonp(errors.array());
    req.flash("Something went wrong. Try again");
    res.redirect("/");
  } else {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userExists = await User.findOne({ email: req.body.email });
    if(userExists){
      res.locals.flashMessages = req.flash("error","Email already registered");
      res.redirect("/user/register");
      return;
    }
    
    const user = new User({
      email: req.body.email,
      name: req.body.name,
      password: hashedPassword,
      dscHandle: req.body.dscHandle,
    });

    const savedUser = await user.save();
    if (!savedUser) {
      res.locals.flashMessages = req.flash(
        "error",
        "Unable to sign up. Please try again."
      );
      res.redirect("/user/register");
      return;
    }
    signUpMail(savedUser);
    res.locals.flashMessages = req.flash(
      "success",
      `${savedUser.name}, kindly verify the email sent to your registered email address`
    );

    res.redirect("/");
  }
});

//post route for login
router.post("/login", async (req, res, next) => {
  let user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    user = await User.findOne({
      dscHandle: req.body.email,
    });
  }
  if (!user) {
    // res.locals.flashMessages = req.flash("error", "User not found. Try creating a new account");
    res.locals.flashMessages = req.flash(
      "error",
      "Email address is not registered. Try creating a new account"
    );
    res.redirect("/user/register?type=login");
    return;
  }
  const checkPassword = await bcrypt.compare(req.body.password, user.password);
  if (!checkPassword) {
    res.locals.flashMessages = req.flash("error", "Invalid Login Credentials");
    res.redirect("/user/register?type=login");
    return;
  }
  if (user.active) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("authorization", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: false,
    });
    res.redirect("/user/profile");
  } else {
    signUpMail(user);
    res.locals.flashMessages = req.flash(
      "error",
      `${user.name}, your email is not verified yet. We have sent you a verification email`
    );
    res.redirect("/");
  }
});

//get route for logging out user
router.get("/logout", function (req, res) {
  res.clearCookie("authorization");
  req.flash("success", "You are successfully logged out");
  res.redirect("/");
});

//get route for forget password
router.get("/forgotpassword", async (req, res) => {
  var token = req.cookies.authorization;
  const findUser = await User.find({ active: true });
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) console.log(err);
      else req.user = user;
      // console.log(user);
      res.render("forgotpassword", { user: user, found: findUser });
    });
  } else res.render("forgotpassword", { user: req.user, found: findUser });
});

//post route for forgotpassword
router.post("/forgotpassword", function (req, res) {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        req.flash("error", "User not found try creating a new account");
        res.redirect("/user/register");
      }
      forgotPassword(user);
      res.locals.flashMessages = req.flash(
        "success",
        `${user.name}, we sent you an email to reset your password`
      );
      res.redirect("/");
    })
    .catch((err) => {
      console.error(err);
      res.render("404-page");
    });
});

// Get Route for Profile

router.get("/profile", authorization, async (req, res) => {
  try {
    const finduser = await User.find({ active: true });
    // const userBlog = await blog.find();
    await req.dbUser.populate("blogs").execPopulate();
    res.render("profile", {
      user: req.dbUser,
      found: finduser,
    });
  } catch (error) {
    console.error("Error getting the profile", error);
    // req.flash("error", "Error in getting the profile");
    // res.redirect("/");
  }
});

router.get("/public-profile/:handle", async (req, res) => {
  try {
    // const token = req.cookies.authorization;
    const finduser = await User.find({ active: true });
    // const userBlog = await Blog.find();
    // req.dbUser = await (await User.findOne({ dscHandle: req.params.handle }))
    const token = req.cookies.authorization;
    let user;
    if (token) {
      const decodedData = await jwt.verify(token, process.env.JWT_SECRET);
      if (decodedData) user = await User.findById(decodedData.userId);
    }
    const searchedUser = await (
      await User.findOne({ dscHandle: req.params.handle })
    )
      .populate("blogs")
      .execPopulate();
    if (searchedUser) {
      res.render("public-profile", {
        searchedUser,
        user,
        found: finduser,
      });
    } else {
      res.render("404-page");
    }
  } catch (error) {
    console.error(error);
    res.render("404-page");
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
    req.flash("error","Something went wrong. Try again");
    res.redirect("/user/profile");
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
    res.render("404-page");
  }
});

router.post("/experience", authorization, async (req, res) => {
  try {
    // console.log("experience route called");
    const user = req.dbUser;
    // console.log(req.body)
    // console.log(user);
    const newExp = {
      name: req.body.exp_name,
      role: req.body.exp_role,
      startdate: req.body.exp_startdate,
      enddate: req.body.exp_enddate,
      status: req.body.exp_status,
      description: req.body.exp_description,
    };
    user.experiences.push(newExp);
    // console.log(user);
    // console.log(newExp);
    await user.save();
    res.redirect(req.get("referer"));
  } catch (error) {
    console.log(error);
    req.flash("error","Something went wrong. Try again");
    res.redirect("/user/profile");
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
    res.render("404-page");
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
      // console.log(req.body);
      User.findByIdAndUpdate(id, {
        name: req.body.name,
        degree: req.body.degree,
        branch: req.body.branch,
        batch: req.body.batchYear,
        bio: req.body.bio,
        socialLinks: {
          linkedin: req.body.linkedin,
          github: req.body.github,
          facebook: req.body.facebook,
        },
      }).then((result) => {
        // console.log(result);
        req.flash("success","Profile Update Successful");
        res.redirect("/user/profile");
      })
      .catch((err)=>{
        console.log(err)
        res.redirect("/user/profile")
      });
    } else {
      req.flash("error","Something went wrong. Try again");
      res.redirect("/");
    }
  } catch (error) {
    console.error(error);
    res.redirect("/");
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
      status: req.body.status,
    };
    // console.log("New Project-- ", newProject);

    user.personalProjects.push(newProject);
    // console.log(newSkill);
    await user.save();
    // console.log(user);

    res.redirect("/user/profile");
  } catch (error) {
    console.log(error);
    req.flash("error","Something went wrong. Try again");
    res.redirect("/user/profile");
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
    res.render("404-page");
  }
});

//to add new achievement
router.post("/achievement", authorization, async (req, res) => {
  try {
    // console.log(req.body);
    const user = req.dbUser;
    const newAchievement = {
      name: req.body.achievementname,
      platform: req.body.achievementnameplatform,
      date: req.body.achievementnamedate,
      serial: req.body.achievementnameserial,
      description: req.body.projectdescription,
    };

    user.achievements.push(newAchievement);
    // console.log(newAchievement);
    await user.save();
    // console.log(user);

    res.redirect(req.get("referer"));
  } catch (error) {
    console.log(error);
    req.flash("error","Something went wrong. Try again");
    res.redirect("/user/profile");
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
    res.render("404-page");
  }
});

router.get("/profile", authorization, async (req, res) => {
  try {
    const token = req.cookies.authorization;
    const finduser = await User.find({ active: true });
    // const userBlog = await blog.find();
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        await req.dbUser.populate("blogs").execPopulate();
        res.render("profile", {
          user: req.dbUser,
          // myblogs: req.dbuser.blogs,
          found: finduser,
        });
      });
    } else {
      res.redirect("/user/register");
    }
  } catch (error) {
    console.error(error);
    res.render("/");
  }
});
router.get("/blog/delete/:blog_id", authorization, async (req, res) => {
  try {
    await Blog.findOneAndDelete({ _id: req.params.blog_id }, (e) => {
      // console.log(e);
    });

    res.redirect(req.get("referer"));
  } catch (error) {
    console.log(error);
    res.render("404-page");
  }
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
router.post("/profile/upload/:id", authorization, async (req, res) => {
  const id = req.params.id;
  let errors = [];
  let avatar;
  User.findById({ _id: id })
    .then((user) => {
      if (!user) {
        errors.push({ msg: "No Records of user found at this moment" });
        res.locals.flashMessages = req.flash(
          "error",
          "No Records of user found at this moment"
        );
        res.redirect("/user/profile");
      }
      uploadProfileImage(req, res, (err) => {
        if (err) {
          errors.push({ message: err });
          // console.log("Error1", err);
          avatar = "";
        } else {
          if (req.file == undefined) {
            errors.push({ msg: "No Image Selected" });
            console.log("err2", errors);
            avatar = undefined;
          } else {
            avatar = `/profile/${user._id}/${req.file.filename}`;
            // console.log("avatar", avatar);
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
            // console.log("avatar value", avatar);
            if (errors.length == 0) {
              console.log(" Profile Updated!");
              res.locals.flashMessages = req.flash(
                "success",
                "Profile Picture Updated!"
              );
              res.redirect("/user/profile");
            } else {
              // console.log(" Profile not Updated!");
              res.locals.flashMessages = req.flash(
                "error",
                "Profile Picture Update error!"
              );
              res.redirect("/user/profile");
            }
          })
          .catch((err) => {
            console.log("profile not updated", err);
            res.redirect("/user/profile");
          });
      });
    })
    .catch((err) => {
      console.log("error", err);
      res.redirect("/user/profile");
    });
});

module.exports = router;
