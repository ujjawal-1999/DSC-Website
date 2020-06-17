const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const authorization = require("../middleware/auth");
const multer = require('multer');
const uuid = require("uuid");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const await=require('await')
var slugify = require('slugify');
const User = require("../models/user");
const auth=require('../middleware/auth')





router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get('/', async (req, res)=>{
	const finduser=await User.find();
    res.render('blogs',{user:req.user,found:finduser});
  });

router.get('/fullblog', async(req, res)=>{
	const finduser = await User.find();
	res.render("fullblog",{user:req.user,found:finduser});
})







//Establish Storage for file upload 
const storage = multer.diskStorage({
	destination: function(req,file,cb){
		// console.log(req.body);
		const newDestination = __dirname+`/../../public/upload/cover/${req.user.userId}`;
		console.log("New Destination: ", newDestination);
		fs.mkdir(newDestination, function(err) {
			if(err) {
				console.log(err)
			} else {
				cb(null, newDestination);
			}
		})
	
	},
	filename:function(req,file,cb){
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))	}
});

var upload = multer({
	storage: storage,
	limits:{fileSize:10000000},
	fileFilter:(req,file,cb)=>{
        //allowed extension
        const filetypes = /jpeg|jpg|png|gif/
        //check extension
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
        //check mimetype
        const mimetype = filetypes.test(file.mimetype)

        if(mimetype && extname){
            cb(null,true)
        }else{
            cb("Error: Image only !",false)
        }
      }
})


// form to create blog
router.get('/create',auth,(req, res)=>{

	res.render('create-blog');
})



//route to save blog
router.post('/create',auth,upload.single('cover'), async (req, res)=>{
	if(req.file){
		var cover = req.file.filename;
	} else {
		var cover = 'https://cdn-images-1.medium.com/max/800/1*fDv4ftmFy4VkJmMR7VQmEA.png';
	}
	try {
		const blog = req.body;
		console.log(blog)
		if (!blog) return res.status(400).json({error: "empty query sent"})

		await new Blog({
			title: blog.title,
			author: blog.author,
			body: blog.body,
			category: blog.category,
			slug: (slugify(blog.title) + '-' + Math.random().toString(36).substr(2, 8)).toLowerCase(),
			summary: blog.summary,
			cover:cover

		})
		.save((err, saved)=> {
			res.json(saved);
		})
	}

	catch(e) {
		console.log(e)
		res.status(400).json({error: "Some error occured"});
		return e;
	}
})



//route to display blog
router.get('/view/:slug',auth, async (req, res)=>{

	try{
		//find the corresponding blog in db
		let slug = req.params.slug;
		if (!slug) return res.status(400).json({error: "empty query sent"});

		const blog = await Blog.findOne({ slug });
		const finduser = await User.find();
		//render result page with resulting html
		res.render('show-blog', { blog: blog, user:req.user, found:finduser });
	}

	catch(e) {
		res.status(400).json({error: "some error occured"});
		return e;
	}
})



//route to rate a blog
router.put('/view/rate', auth, async (req,res)=>{
	try {
		const { blogId, rating } = req.body
		console.log(blogId, rating, req.body)
		const found = await Blog.findById( blogId )

		const currentValue = found.rating.currentValue
		const totalRatings = found.rating.totalRatings
		found.rating.totalRatings = totalRatings + 1
		found.rating.currentValue = ((currentValue * totalRatings) + (parseInt(rating))) / (totalRatings + 1)
		found.save()
		console.log(found)
		res.json(found)
	}
	catch(e) {
		console.log(e)
		res.status(422).json({error:e})
	}
})
//export
module.exports = router;
