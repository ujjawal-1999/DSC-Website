const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const slugify = require("slugify");
const User = require("../models/user");
const Ratings = require("../models/Ratings");
const auth = require("../middleware/auth");
const methodOverride = require("method-override");
const jwt = require("jsonwebtoken");

router.use(methodOverride("_method"));
router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// blogs page home (show one full blog along with other new and popular blogs)
// clicking any blog will redirect to view blog route (/dsc/blog/view/:slug)
router.get("/", async (req, res) => {
  try {
    const token = req.cookies.authorization;
    const finduser = await User.find();
    let user;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) console.log(err);
        else user = payload;
      });
    }
    if (user) user = await User.findById(user.userId);
    const popularBlogs = await Blog.find()
      .sort({
        views: -1,
      })
      .limit(10)
      .populate("author");
    const newBlogs = await Blog.find()
      .sort({
        createdAt: -1,
      })
      .limit(10)
      .populate("author");
    // const blogsCount = {
    //     webDev: await Blog.countDocuments({
    //       category: 'Web Dev'
    //     }),
    //     androidDev: await Blog.countDocuments({
    //       category: 'Android Dev'
    //     }),
    //     graphicDesign: await Blog.countDocuments({
    //       category: 'Graphic Design'
    //     })
    //   }
    // console.log(blogsCount)
    //render the blog using template
    res.render("blogs-new", {
      user: user,
      found: finduser,
      newBlogs: newBlogs || [],
      popularBlogs: popularBlogs || [],
      // blogsCount: blogsCount
    });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
    return e;
  }
});

router.post("/bookmark/:bookmark_id", auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.userId);
    let bookmarkArr = user.bookmarkBlogs || [];
    if (bookmarkArr.includes(req.params.bookmark_id)) {
      bookmarkArr.remove(req.params.bookmark_id);
    } else {
      bookmarkArr.push(req.params.bookmark_id);
    }
    user.bookmarkBlogs = bookmarkArr;
    await user.save();
    res.redirect(req.get("referer"));
  } catch (error) {
    console.log(error);
    res.statusCode(200);
    res.send(error);
  }
});

router.get("/bookmarks", auth, async (req, res) => {
  const finduser = await User.find();
  const user = await User.findById(req.user.userId).populate("bookmarkBlogs");

  // const user = await User.findById(req.user.userId).populate('bookmarkBlogs', 'bookmarkBlogs.author')
  const bookmarks = await Promise.all(
    user.bookmarkBlogs.map(async (blog) => {
      blog.author = await User.findById(blog.author);
      return blog;
    })
  );
  res.render("bookmarks", {
    user: req.user,
    found: finduser,
    bookmarks: bookmarks,
  });
});

//Establish Storage for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log(req.body);
    const newDestination =
      __dirname + `/../../public/upload/cover/${req.user.userId}`;
    console.log("New Destination: ", newDestination);
    var stat = null;
    try {
      stat = fs.statSync(newDestination);
    } catch (err) {
      fs.mkdir(
        newDestination,
        {
          recursive: true,
        },
        (err) => {
          if (err) console.error("New Directory Error: ", err.message);
          else console.log("New Directory Success");
        }
      );
    }
    if (stat && !stat.isDirectory())
      throw new Error("Directory Couldnt be created");
    cb(null, newDestination);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 10000000,
  },
  fileFilter: (req, file, cb) => {
    //allowed extension
    const filetypes = /jpeg|jpg|png|gif/;
    //check extension
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    //check mimetype
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      cb(null, true);
    } else {
      cb("Error: Image only !", false);
    }
  },
});

// form to create blog
router.get("/create", auth, (req, res) => {
  res.render("create-blog");
});

//route to save blog
router.post("/create", auth, upload.single("cover"), async (req, res) => {
  if (req.file) {
    var cover = `/upload/cover/${req.user.userId}/${req.file.filename}`;
  } else {
    var cover =
      "https://cdn-images-1.medium.com/max/800/1*fDv4ftmFy4VkJmMR7VQmEA.png";
  }
  try {
    const blog = req.body;
    // console.log(blog)
    if (!blog)
      return res.status(400).json({
        error: "empty query sent",
      });

    const saved = await new Blog({
      title: blog.title,
      slug: (
        slugify(blog.title) +
        "-" +
        Math.random().toString(36).substr(2, 8)
      ).toLowerCase(),
      author: req.user.userId,
      category: blog.category,
      cover: cover,
      summary: blog.summary,
      body: blog.body,
    }).save();
    if (req.dbUser.blogs) {
      req.dbUser.blogs.push(saved);
    } else {
      req.dbUser.blogs = [saved];
    }
    await req.dbUser.save();
    res.redirect("/dsc/blog");
  } catch (e) {
    console.log(e.message);
    res.status(400).json({
      error: "Some error occured",
    });
    return e;
  }
});

//route to display blog
router.get("/view/:slug", async (req, res) => {
  try {
    //find the corresponding blog in db
    let slug = req.params.slug;
    if (!slug)
      return res.status(400).json({
        error: "empty query sent",
      });

    const finduser = await User.find();
    const blog = await Blog.findOneAndUpdate(
      {
        slug,
      },
      {
        $inc: {
          views: 1,
        },
      },
      {
        new: true,
      }
    ).populate("author");
    if (!blog)
      return res.status(404).json({
        error: "Wrong Query! This blog doesn't exist",
      });
    const popularBlogs = await Blog.find()
      .sort({
        views: -1,
      })
      .limit(5)
      .populate("author");
    const blogsCount = {
      webDev: await Blog.countDocuments({
        category: "Web Dev",
      }),
      androidDev: await Blog.countDocuments({
        category: "Android Dev",
      }),
      graphicDesign: await Blog.countDocuments({
        category: "Graphic Design",
      }),
    };
    //render result page
    res.render("fullblog", {
      user: req.user,
      found: finduser,
      blog: blog,
      popularBlogs: popularBlogs || [],
      blogsCount: blogsCount,
    });
  } catch (e) {
    res.status(400).json({
      error: "some error occured",
    });
    console.log(e.message);
    return e;
  }
});

//route to rate a blog
router.put("/rate/:blogid", auth, async (req, res) => {
  try {
    const blogId = req.params.blogid;
    var value = req.body.rating;
    console.log(blogId);
    console.log(value);
    const userId = req.user.userId;
    if (!blogId || !value) {
      return res.status(422).json({
        error: "Empty queries received",
      });
    }
    value = parseInt(value);

    const ratedBefore = await Ratings.findOne({
      userId,
      blogId,
    });

    //if not rated by user previously
    if (!ratedBefore) {
      await new Ratings({
        userId,
        blogId,
        value,
      }).save();
      // apply update to blog schema
      const updatedBlog = await Blog.findById(blogId);
      updatedBlog.ratingCount += 1;
      updatedBlog.ratingSum += value;
      updatedBlog.ratingAverage =
        updatedBlog.ratingSum / updatedBlog.ratingCount;
      await updatedBlog.save();

      console.log("Rating updated: ", value);
      res.locals.flashMessages = req.flash("success", "Thanks for rating!");
      res.redirect(`/dsc/blog/view/${updatedBlog.slug}`);
      return;
    } else {
      //set new value if already rated
      const updatedBlog = await Blog.findById(blogId);
      updatedBlog.ratingSum += value - ratedBefore.value;
      updatedBlog.ratingAverage =
        updatedBlog.ratingSum / updatedBlog.ratingCount;
      await updatedBlog.save();
      ratedBefore.value = value;
      await ratedBefore.save();

      console.log("Rating updated: ", value);
      res.locals.flashMessages = req.flash("success", "Thanks for rating!");
      res.redirect(`/dsc/blog/view/${updatedBlog.slug}`);
    }
  } catch (e) {
    console.log(e.message);
    res.status(422).json({
      error: e.message,
    });
  }
});

module.exports = router;
