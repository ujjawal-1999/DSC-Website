const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const path = require("path");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const session = require("express-session");
const app = express();
app.use(express.json());

// using dotenv module for environment
require("dotenv").config();

//setting up configuration for flash

const PORT = process.env.PORT || 8080;
//Mongoose connection
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to mongo server"))
  .catch((err) => console.error(err));

//Setting EJS view engine
app.set("view engine", "ejs");

//setting jwt
app.set("jwtTokenSecret", process.env.JWT_SECRET);

//body parser
app.use(
  express.urlencoded({
    extended: true,
  })
);

//setting up methods
app.use(bodyParser.json());
app.use(cookieParser("secret_passcode"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret_passcode",
    cookie: {
      maxAge: 4000000,
    },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});


//Setup for rendering static pages
//for static page
const publicDirectory = path.join(__dirname, "../public");
app.use(express.static(publicDirectory));

//Routes===========================================
var indexRoutes = require("./routes/index");
const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");
const ProjectRoutes = require("./routes/project");
const webBlitzRouter = require('./routes/web-blitz')

app.use("/", indexRoutes);
app.use("/user", userRoutes);
app.use("/blog", blogRoutes);
app.use("/project", ProjectRoutes);
app.use('/web-blitz', webBlitzRouter)

app.get("/404", (req, res) => {
  res.render("404-page");
});

app.get("*", (req, res) => {
  res.render("404-page");
});

// Start the server
app.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
// const User = require('./models/user')

// const fun = async()=>{
//     const users = await User.find({ });
//     users.forEach(async (user) =>{
//       if(user.profileImageLocation){
//         user.profileImageLocation = null;
//         await user.save();
//         console.log(`${user.name} ${user.profileImageLocation}`);
//       }
//     })
//     console.log("Done");
// }

// fun()