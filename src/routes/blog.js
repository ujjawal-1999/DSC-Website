const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const multer = require('multer');

//Establish Storage for file upload 
const storage = multer.diskStorage({
	destination: function(req,file,cb){
		// console.log(req.body);
		const newDestination = __dirname+`/../../public/upload/report/${req.body.email}`;
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

module.exports=router;