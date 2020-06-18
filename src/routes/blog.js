const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const multer = require('multer');
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const slugify = require('slugify');
const User = require("../models/user");
const Ratings = require("../models/Ratings");
const auth = require('../middleware/auth')





router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

// blogs page home (show one full blog along with other new and popular blogs)
// clicking any blog will redirect to view blog route (/dsc/blog/view/:slug)
router.get('/', async (req, res)=>{
	try{
		const finduser = await User.find();
		const popularBlogs = await Blog.find().sort({ views: -1 }).limit(10)
		const newBlogs = await Blog.find().sort({ createdAt: -1 }).limit(10)
		console.log(newBlogs)
		const blogsCount = {
			webDev: await Blog.countDocuments({ category: 'Web Dev' }),
			androidDev: await Blog.countDocuments({ category: 'Android Dev' }),
			graphicDesign: await Blog.countDocuments({ category: 'Graphic Design' })
		}
		//render the blog using template 
		res.render( 'blogs', {
			user: req.user, // it will remail undefines bcz req.user won't exist as we don't use auth middleware here
			found: finduser,
			newBlogs: newBlogs || [],
			popularBlogs: popularBlogs || [],
			blogsCount: blogsCount
		})
	}

	catch(e) {
		res.status(400).json({ error: e });
		return e;
	}
})



router.get('/fullblog', async(req, res)=>{
	const finduser = await User.find();
	res.render("fullblog",{user:req.user,found:finduser});
})







//Establish Storage for file upload 
const storage = multer.diskStorage({
	destination: function(req,file,cb){
		// console.log(req.body);
		const newDestination = __dirname+`/../../public/upload/cover/${req.body.author}`;
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
router.get('/create', auth, (req, res) => {
	res.render('create-blog');
})



//route to save blog
router.post('/create', auth, upload.single('cover'), async (req, res) => {
	if (req.file) {
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
router.get('/view/:slug', auth, async (req, res)=>{

	try{
		//find the corresponding blog in db
		let slug = req.params.slug;
		if (!slug) return res.status(400).json({ error: "empty query sent" });

		const finduser = await User.find();
		const blog = await Blog.findOneAndUpdate({ slug }, { $inc: { views: 1 } }, { new: true });
		if (!blog) return res.status(404).json({ error: "Wrong Query! This blog doesn't exist" })
		const popularBlogs = await Blog.find().sort({ views: -1 }).limit(5)
		const blogsCount = {
			webDev: await Blog.countDocuments({ category: 'Web Dev' }),
			androidDev: await Blog.countDocuments({ category: 'Android Dev' }),
			graphicDesign: await Blog.countDocuments({ category: 'Graphic Design' })
		}

		//render result page
		res.render('show-blog', {
			user: req.user,
			found: finduser,
			blog: blog,
			popularBlogs: popularBlogs || [],
			blogsCount: blogsCount
		});
	}

	catch(e) {
		res.status(400).json({error: "some error occured"});
		return e;
	}
})



//route to rate a blog
router.put('/rate', auth, async (req,res)=>{
	try {
		const { blogId, value } = req.body
		const userId = req.user.userId
		if (!blogId || !value) {
			return res.status(422).json({error: "Empty queries received"})
		}
		value = parseInt(value)

		const ratedBefore = await Ratings.findOne({ userId, blogId })

		//if not rated by user previously
		if (!ratedBefore) {
			await new Ratings({
				userId,
				blogId,
				value
			})
			.save()
			// apply update to blog schema
			const updatedBlog = await Blog.findById( blogId )
			updatedBlog.ratingCount+=1
			updatedBlog.ratingSum+=value
			updatedBlog.ratingAverage = updatedBlog.ratingSum / updatedBlog.ratingCount
			await updatedBlog.save()

			console.log('Rating updated: ', value)
			return res.json(updatedBlog)
		}
		else {
			//set new value if already rated
			const updatedBlog = await Blog.findById( blogId )
			updatedBlog.ratingSum += (value - ratedBefore.value)
			updatedBlog.ratingAverage = updatedBlog.ratingSum / updatedBlog.ratingCount
			await updatedBlog.save()
			ratedBefore.value = value
			await ratedBefore.save()

			console.log('Rating updated: ', value)
			return res.json(updatedBlog)
		}
	}
	catch(e) {
		console.log(e)
		res.status(422).json({ error:e })
	}
})

module.exports = router;
