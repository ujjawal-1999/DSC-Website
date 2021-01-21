const router = require('express').Router()
const WebBlitzParticipant = require("../models/web-blitz-participants")

router.post('/register', async (req, res) => {
    try {
        const participant = await WebBlitzParticipant.create(req.body)
        res.render("web-blitz");
    } catch (error) {
        console.log(error)
        res.render("404-page");
    }
})

module.exports = router