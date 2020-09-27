const express = require("express");
const router = express.Router();
const Projects = require("../models/projects");
const multer = require('multer');
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const { route } = require(".");

//Middleware setup
router.use(methodOverride("_method"));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

// get route to the /project
router.get('/' , async (req,res)=>{
    const projects = await Projects.find().sort(
        {createdAt: 'desc'}
    );
    res.render('' , {projects: projects});
})

// get route to /new/project
router.get('/new', (req,res)=>{
    res.render('' ,{projects: new Projects()} )
})

//  post route for new project
router.post('/', async (req, res, next) => {
    req.projects = new Projects()
    next()
  }, saveProjectAndRedirect('new'))

// route for editing a project
router.put('/:id', async (req, res, next) => {
    req.projects = await Projects.findById(req.params.id)
    next()
  }, saveProjectAndRedirect('edit'))

// route for deleting a project
router.delete('/:id', async (req, res) => {
    await Projects.findByIdAndDelete(req.params.id)
    res.redirect('/')
  })

//function to save and edit Project

function saveProjectAndRedirect(path) {
    return async (req, res) => {
      let projects = req.projects
      projects.title = req.body.title
      projects.description = req.body.description
      projects.author = req.body.author
      projects.category = req.body.category
      projects.gitRepoLink = req.body.gitRepoLink
      projects.hostLink = req.body.hostLink
      projects.projectLeads.push(req.body.projectLeads)
      projects.projectDevelopers.push(req.body.projectDevelopers)
      projects.ongoing = req.body.ongoing
      try {
        projects = await projects.save()
        res.redirect(`/dsc/project`)
      } catch (e) {
        res.render(`dsc/project/${path}`, { projects: projects })
      }
    }
  }

  module.exports = router;