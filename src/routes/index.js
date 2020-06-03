const express = require('express');
const router = express.Router();

//Route for Homepage
router.get('/',(req, res)=>{
    res.render("index")
})

//Export
module.exports = router