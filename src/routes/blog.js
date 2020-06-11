const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const multer = require('multer');

router.get('/', (req, res)=>{
    res.render("blogs")
})

module.exports=router;