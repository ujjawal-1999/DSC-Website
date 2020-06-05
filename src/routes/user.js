const express = require("express");
const router = express.Router();
const User = require("../models/user");
const multer = require("multer");
const uuid = require("uuid");
const fs = require("fs");
const path = require("path");
const async = require("async");
//Config Modules

const { checkProfileImageType } = require("../config/checkType");

//Setup a test Router for user routes
router.get('/',(req,res)=>{
    res.json({message:'User routes connected'})
})

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