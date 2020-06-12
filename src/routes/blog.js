let express = require('express');
let router	= express.Router();
const Blog = require('../models/blog')
var slugify = require('slugify')



router.get('/', (req, res)=>{
	res.render("blogs");
})



// form to create blog
router.get('/create', (req, res)=>{
	res.render('create-blog');
})



//route to save blog
router.post('/create', async (req, res)=>{

	try {
		const blog = req.body;
		if (!blog) return res.status(400).json({ error: "empty query sent" });

		await new Blog({
			title: blog.title,
			author: blog.author,
			body: blog.body.toString(),
			category: blog.category,
			slug: (slugify(blog.title) + '-' + Math.random().toString(36).substr(2, 8)).toLowerCase(),
			summary: blog.summary
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
		res.render('show-blog', { blogContent: blog.body });
	}

	catch(e) {
		res.status(400).json({error: "some error occured"});
		return e;
	}
})


//export
module.exports = router;
