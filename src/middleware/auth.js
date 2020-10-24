var jwt = require("jsonwebtoken");
var User = require('../models/user')

module.exports = async(req, res, next) => {
  try {

    // console.log('authorization: ', req.cookies);
    const token = req.cookies.authorization;
    // console.log(token);\
    if(!token){
      throw new Error("User is not logged in")
    }
    jwt.verify(token, process.env.JWT_SECRET, async(err, user) => {
      if (err){
        res.redirect("/");
        next();
      }
      else {
        req.user = user;
        req.dbUser = await User.findById(user.userId)
        next();
      }
      // console.log(req.user);
    });

  } catch (error) {
    // res.status(401).json({ message: "Authentication failed!" });
    res.redirect("/user/register?type=login");
  }
};