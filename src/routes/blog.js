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





router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get('/', async (req, res)=>{
	const finduser=await User.find();
    res.render('blogs',{user:req.user,found:finduser});
  });




var config = {
	//include inline styling in the resulting html from delta
	inlineStyles: false
};

//Establish Storage for file upload 
const storage = multer.diskStorage({
	destination: function(req,file,cb){
		// console.log(req.body);
		const newDestination = __dirname+`/../../public/upload/cover/`;
		console.log("New Destination: ", newDestination);
		fs.mkdir(newDestination, function(err) {
			if(err) {
				console.log(err.stack)
			} else {
				callback(null, newDestination);
			}
		})
	
	},
	filename:function(req,file,cb){
		cb(null,file.fieldname + '-' + uuid.v4() + path.extname(file.originalname));
	}
});

var upload = multer({
	storage: storage,
	limits:{fileSize:10000000},
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    }
})


// form to create blog
router.get('/create',(req, res)=>{

	res.render('create-blog');
})



//route to save blog
router.post('/create',upload.single('userFile'), async (req, res)=>{
	if(req.file!=undefined) {
		console.log(req.file)
		cover=req.file.path
	 }else {
	   cover=false
	 }
	try {
		const blog = req.body;
		console.log(blog)
		if (!blog) return res.status(400).json({error: "empty query sent"})

		await new Blog({
			title: blog.title,
			author: blog.author,
			body: blog.body.toString(),
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
router.get('/view/:slug', async (req, res)=>{

	try{
		//find the corresponding blog in db
		let slug = req.params.slug;
		if (!slug) return res.status(400).json({error: "empty query sent"});

		const blog = await Blog.findOne({ slug });
		//render result page with resulting html
		res.render('show-blog', { blogContent: blog.body});
	}

	catch(e) {
		res.status(400).json({error: "some error occured"});
		return e;	
	}
})
//route to rate a blog
router.put('/view/rate',(req,res)=>{
    Blog.findByIdAndUpdate(req.body.blogId,{
        $push:{rating:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})
//export
module.exports = router;
