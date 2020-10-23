const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// get route to the "/project"
router.get("/", async (req, res) => {
  var token = req.cookies.authorization;
  const finduser = await User.find({active : true});
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) console.log(err);
      else req.user = user;
      res.render("projectpage", { user: user, found: finduser });
    });
  } else res.render("projectpage", { user: req.user, found: finduser });
});

module.exports = router;
