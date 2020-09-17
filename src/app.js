const express = require('express');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const path = require('path');

const app = express();
app.use(express.json());

// using dotenv module for environment
require("dotenv").config();

//setting up configuration for flash


const PORT = process.env.PORT || 3000;
//Mongoose connection
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }).then(() => console.log('Connected to mongo server'))
  .catch(err => console.error(err));

//Setting EJS view engine
app.set('view engine', 'ejs');

//setting jwt 
app.set('jwtTokenSecret', process.env.JWT_SECRET);

//body parser
app.use(express.urlencoded({
  extended: true
}));

//Setup for rendering static pages
//for static page
const publicDirectory = path.join(__dirname, '../public');
app.use(express.static(publicDirectory));

//Routes===========================================
var indexRoutes = require("./routes/index");
const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");

app.use('/dsc', indexRoutes);
app.use('/dsc/user', userRoutes);
app.use('/dsc/blog', blogRoutes);


//Start the server
app.listen(PORT, () => {
  console.log('Server listening on port', PORT);
})