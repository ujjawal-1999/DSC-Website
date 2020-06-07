const express = require("express");
const router = express.Router();
const User = require("../models/user");
const authorization = require("../middleware/auth");
const multer = require("multer");
const uuid = require("uuid");
const fs = require("fs");
const path = require("path");
const async = require("async");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const { check, validationResult } = require('express-validator');

//setting up methods
router.use(bodyParser.json());
router.use(cookieParser());
router.use(bodyParser.urlencoded({extended:true}));



//Config Modules

const { checkProfileImageType } = require("../config/checkType");

//Setup a test Router for user routes
router.get('/',(req,res)=>{
    res.json({message:'User routes connected'})
});


router.get("/newusermobile",(req,res)=>{
    res.render("newusermobile");
});


//get route for signup
router.get("/register",(req,res)=>{
    res.render("newuser");
})

//post route for signup
router.post("/register",
(req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }
    else {
        bcrypt.hash(req.body.password, 10).then((hash) => {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash
            });
            user.save().then((response) => {
                // res.status(201).json({
                //     message: "User successfully created!",
                //     result: response
                // });
                // console.log(user);
                var token = jwt.sign({
                    name: user.name,
                    email: user.email,
                    userId: user._id
                }, process.env.JWT_SECRET, {
                    expiresIn: "1d"
                });
                //console.log(token);
                res.cookie( 'authorization', token,{ maxAge: 24*60*60*1000, httpOnly: false });
                res.redirect("/dsc/");
            }).catch(error => {
                // res.status(500).json({
                //     error: error
                // });
                console.log(error);
                res.redirect("/dsc/user/register");
            });
        });
    }
});

//get route for login
router.get("/login",function(req,res){
    res.render("newuser");
});

//post route for login
router.post("/login", (req, res, next) => {
    let getUser;
    User.findOne({
        email: req.body.email
    }).then(user => {
        if (!user) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        getUser = user;
        return bcrypt.compare(req.body.password, user.password);
    }).then(response => {
        if (!response) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        var token = jwt.sign({
            name: getUser.name,
            email: getUser.email,
            userId: getUser._id
        },process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        // console.log(token);
        res.cookie( 'authorization', token,{ maxAge: 24*60*60*1000, httpOnly: false });
        // console.log('authorization: ', req.cookies);
        // res.status(200).json({
        //     token: token,
        //     expiresIn: 3600,
        //     msg: getUser
        // });
        // res.send(getUser);
        // req.user = getUser;
        // console.log(req.user);
        res.redirect("/dsc/");
    }).catch(err => {
        // return res.status(401).json({
        //     message: "Authentication failed"
        // });
        res.redirect("/dsc/user/login");
    });
});

//checking for user
// router.get("/user",authorization,function(req,res){
//     res.send(req.user);
// });

//get route for logging out user
router.get("/logout",function(req,res){
    res.clearCookie('authorization');
      res.redirect("/dsc/");
  });


//Post Route to edit User Profile Details
router.post('/profile',async (req,res)=>{
    const id = "5ed7cfe27cd0ad0860e3604b";
    try{
        const user = await User.findByIdAndUpdate(id,req.body);
        if(!user)
            throw new Error("User not found"); 
        res.status(200).send("Updated Successfully");
    }
    catch(error){
        console.error(error);
        res.status(500).send(error);
    }
});

//Establish Storage for file upload
const storage = multer.diskStorage({
	destination: function(req,file,cb){
		const newDestination = __dirname+`/../../public/upload/profile/${req.params.id}`;
		console.log("New Destination: ", newDestination);
		var stat = null;
		try{
			stat = fs.statSync(newDestination);
		}
		catch(err){
			fs.mkdir(newDestination,{recursive:true},(err)=>{
				if(err)
					console.error('New Directory Error: ',err);
				else
					console.log('New Directory Success');
			})
		}
		if(stat && !stat.isDirectory())
			throw new Error('Directory Couldnt be created');
		cb(null,newDestination);
	},
	filename:function(req,file,cb){
		cb(null,file.fieldname + '-' + uuid.v4() + path.extname(file.originalname));
	}
});
//(Profile Image)

const uploadProfileImage = multer({
	storage:storage,
	limits:{fileSize:1000000},
	fileFilter:function(req,file,cb){
		checkProfileImageType(file,cb);
	}
}).single('profile-image');


//Post Route to update Profile Image
router.post('/profile/upload/:id',async (req,res)=>{
    const id = req.params.id;
    let errors = [];
    let avatar;
        User.findById({_id:id})
        .then(user=>{
            if(!user)
            {
                errors.push({msg:'No Records of user found at this moment'})
                res.send({message:'Error'});
            }
            uploadProfileImage(req,res,(err)=>{
                if(err){
                    errors.push({message:err});
                    console.log("Error1",err);
                    avatar = '';
                }
                else{
                    if(req.file == undefined){
                        errors.push({msg:'No Image Selected'});
                        console.log("err2",errors);
                        avatar = undefined;
                    }
                    else{
                        avatar = `/profile/${user._id}/${req.file.filename}`;
                        console.log("avatar",avatar);
                    }
                }
            if(avatar != undefined){
                user.profileImageLocation = `${avatar}`;
            }
            else{
                user.profileImageLocation = '/img/avatar.png'  //if no image is set then select this for user  
            }   
            user.save()
            .then(user => {
                console.log("avatar value",avatar);
                if(errors.length==0){
                    console.log(' Profile Updated!');
                    res.send({message:'Profile Image Updated'});
                }
                else{
                    console.log(' Profile not Updated!');
                    res.send({message:'Profile Image not Updated'});
                }

            })
            .catch(err =>{
                console.log("profile not updated");             
            })
            });
    })
    .catch(err => {
        console.log("error",err); 
    })
});

module.exports = router;