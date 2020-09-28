var jwt = require("jsonwebtoken");
var User = require('../models/user')

module.exports = async(req, res, next) => {
  try {

    // console.log('authorization: ', req.cookies);
    const token = req.cookies.authorization;
    // console.log(token);
    jwt.verify(token, process.env.JWT_SECRET, async(err, user) => {
      if (err)
        console.log(err);
      else {
        req.user = user;
        req.dbUser = await User.findById(user.userId)
      }
      // console.log(req.user);
      next();
    });

  } catch (error) {
    // res.status(401).json({ message: "Authentication failed!" });
    res.redirect("/login");
  }
};