const router = require('express').Router()
const WebBlitzParticipant = require("../models/web-blitz-participants")

router.post('/register', async (req, res) => {
    try {
        const participant = await WebBlitzParticipant.create(req.body)
        res.status(201).json(participant)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
})

module.exports = router