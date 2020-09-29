const express = require("express");
const router = express.Router();
const async = require('async');
const Projects = require("../models/projects");
const User = require("../models/user");
const multer = require('multer');
const bodyParser = require("body-parser");
const auth = require('../middleware/auth');
const methodOverride = require("method-override");
const { route } = require(".");

//Middleware setup
router.use(methodOverride("_method"));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

// get route to the "/dsc/project"
router.get('/' , async (req,res) => {
    const finduser = await User.find();
    const projects = await Projects.find().sort(
        {createdAt: 'desc'}
    );
    res.json(projects);
    //res.render('projects' , {projects: projects, user: req.user, found: finduser});
})

// post route for creating new project "/dsc/project/create"
router.post('/create', async (req,res) => {
  try{
    const project = req.body;
    console.log(project);
    if(!project) return res.status(400).json({
      error: "Empty req body!"
    })
    await new Projects({
      title: project.title,
      description: project.description,
      author: project.author,
      category: project.category
    })
    .save((err,saved)=>{
      if(err){
        console.log(err);
      }else{
        console.log(saved);
      }
      res.json(saved);
    })
  } catch(e){
    console.log(e.message)
    res.status(400).json({
      error: "Some error occured"
    });
    return e;
  }
})

// route to edit project "/dsc/project/edit/:id"
router.post('/edit/:id', async (req,res) => {
  let projects = await Projects.findById(req.params.id);
  if(req.body.title) projects.title = req.body.title;
  if(req.body.description) projects.description = req.body.description
  if(req.body.author) projects.author = req.body.author
  if(req.body.category) projects.category = req.body.category
  try{
    project = await projects.save();
    res.json(project);
  }catch(e){
    res.json(e);
  }
})

// route for deleting project "/dsc/project/remove/:id"
router.delete('/remove/:id', async (req, res) => {
  try{
    const project = await Projects.findByIdAndDelete(req.params.id);
    res.json("Deleted successfully!")
  } catch(e){
    res.json(e);
  }
})


// get route to /project/new

// router.get('/new', (req,res)=>{
//     res.render('projects' ,{projects: new Projects()} )
// })

// //  post route for new project
// router.post('/', auth, async (req, res, next) => {
//     req.projects = new Projects()
//     next()
//   }, saveProjectAndRedirect('new'))

// // route for editing a project
// router.put('/:id', async (req, res, next) => {
//     req.projects = await Projects.findById(req.params.id)
//     next()
//   }, saveProjectAndRedirect('edit'))

// // route for deleting a project


// //function to save and edit Project

// function saveProjectAndRedirect(path) {
//     //const user = User.find();
//     return async (req, res) => {
//       let projects = req.projects
//       projects.title = req.body.title
//       projects.description = req.body.description
//       projects.author = req.user.userId
//       projects.category = req.body.category
//       projects.gitRepoLink = req.body.gitRepoLink
//       projects.hostLink = req.body.hostLink
//       projects.projectLeads.push(req.body.projectLeads)
//       projects.projectDevelopers.push(req.body.projectDevelopers)
//       projects.ongoing = req.body.ongoing
//       try {
//         projects = await projects.save()
//         res.redirect(`/dsc/project`)
//       } catch (e) {
//         res.render(`dsc/project/${path}`, { projects: projects })
//       }
//     }
//   }

module.exports = router;