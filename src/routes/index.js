const express = require('express');
const router = express.Router();
const multer = require('multer');
const async = require('async');
const uuid = require("uuid");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const User = require('../models/user');
const flash = require('connect-flash');
const session = require("express-session");

//method Flash
router.use(cookieParser('secret_passcode'));
router.use(session({
    secret: "secret_passcode",
    cookie: {
      maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
  }));
router.use(flash());


router.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
  });



//Config Modules
const { checkType } = require("../config/checkType");

//Mongoose Schemas
const Mail = require("../models/Mail");

//Nodemailer Account
const { contact, contactAdmin } = require("../account/nodemailer");

router.use(cookieParser());

//Route for Homepage
router.get('/',async(req, res)=>{
	var token = req.cookies.authorization;
	const finduser = await User.find();
	if(token)
    {
        jwt.verify(token, process.env.JWT_SECRET,(err,user)=>{
            if(err)
                console.log(err);
            else
				req.user = user;
            res.render("index",{user:user,found:finduser});
        });
    }
    else
        res.render("index",{user:req.user,found:finduser});

});


// router.get('/', async(req, res)=>{
// 	// res.render("index")
// 	const user = await User.find();
// 	// console.log(user)
//     res.render('index',{
// 		// user:req.user,
// 		// message:msg,
// 		// flag,
// 		users:user
//     });
// });

//Establish Storage for file upload (Contact Us issues)
const storage = multer.diskStorage({
	destination: function(req,file,cb){
		// console.log(req.body);
		const newDestination = __dirname+`/../../public/upload/cover/${req.body.author}`;
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

const upload = multer({
	storage:storage,
	limits:{fileSize:1000000},
	fileFilter:function(req,file,cb){
		checkType(file,cb);
	}
}).array('issues',4);

//Post Route to send mail for any issues
router.post('/contact',async (req,res)=>{
	let errors = [];
	let avatar = [];
	async.each(['issues'],(item,cb)=>{
		upload(req,res,(err)=>{
			if(err){
				errors.push({message:err});
				console.log('Error: ',errors);
				avatar = [];
				cb(avatar);
			}
			else{
				console.log('Files sent: ',req.files);
				if(req.files.length === 0 || req.files === undefined){
					avatar = ['admin'];
					errors.push({message:'0 image selected'});
					console.log('Error2 ',errors);
					cb(avatar);
				}
				else{
					for(var i=0;i<req.files.length;i++){
						avatar[i] = `/report/${req.body.email}/${req.files[i].filename}`;
					}
					console.log(avatar);
					cb(avatar);
				}
			}
		})
	},(avatar)=>{
		if(avatar.length === 0){
			res.locals.flashMessages = req.flash('contact_error',"Error: Only 4 Files upto 1Mb size can be uploaded");
			res.redirect('/dsc/#contactus');
		}

		else{
			console.log(req.body);
			contact({
				email:req.body.email,
				name:req.body.name,
				message:req.body.message,
				subject:req.body.subject
			});
			const newMail = new Mail({
				email:req.body.email,
				name:req.body.name,
				message:req.body.message,
				subject:req.body.subject
			});
			if(avatar[0] != 'admin'){
				var location = ''
				for(var i=0;i<avatar.length;i++){
					location += `${avatar[i]}--`;
				}
				newMail.imageLocation = location;
			}
			contactAdmin({
				email:req.body.email,
				name:req.body.name,
				message:req.body.message,
				subject:req.body.subject,
				img:newMail.imageLocation?'yes':'no'
			});
			newMail.save()
				.then((result)=>{
					console.log(result);
					res.locals.flashMessages = req.flash('contact_success',"Your response has been recorded");
					res.redirect('/dsc/#contactus')
				})
				.catch((err)=>{
					console.log(err);
					res.locals.flashMessages = req.flash('contact_error',"Something went wrong. Please try again");
					res.redirect('/dsc/#contactus');
				});
			}
		})
	});

//Export
module.exports = router