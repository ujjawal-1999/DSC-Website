const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(express.json());

// using dotenv module for environment
require("dotenv").config();

const PORT = process.env.PORT || 3000;
//Mongoose connection
mongoose.connect(process.env.MONGODB_URL,{
	useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true
}).then(()=>console.log('Connected to mongo server'))
	.catch(err => console.error(err));

//Setting EJS view engine
app.set('view engine','ejs');

//body parser
app.use(express.urlencoded({extended:true}));

//Setup for rendering static pages
//for static page
const publicDirectory = path.join(__dirname,'../public');
app.use(express.static(publicDirectory));

//Test Get response
app.get('/',(req,res)=>{
	res.status(200).json({message:'Server up and running'});
})
//Start the server
app.listen(PORT,()=>{
	console.log('Server listening on port',PORT);
})