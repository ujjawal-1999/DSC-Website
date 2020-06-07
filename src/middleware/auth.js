var jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
    try {

        // console.log('authorization: ', req.cookies);
        const token = req.cookies.authorization;
        // console.log(token);
        jwt.verify(token, process.env.JWT_SECRET,(err,user)=>{
            if(err)
                console.log(err);
            else
                req.user = user;
            
            // console.log(req.user);
            next();
        });
        
    } catch (error) {
        // res.status(401).json({ message: "Authentication failed!" });
        res.redirect("/login");
    }
};