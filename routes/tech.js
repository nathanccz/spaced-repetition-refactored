const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Tech = require('../models/Tech')

// @desc     Show add page
// @route    GET /tech/add

router.get('/add', ensureAuth, (req, res) => {
    res.render('tech/add')
})

// @desc     Retrieve complete tech list
// @route    GET /tech/techlist

router.get('/techlist', ensureAuth, async (req, res) => {
    try {
        const techList = await Tech.find()
        console.log('techlist', techList)
        res.json(techList)
    } catch (err) {
        console.error(err)
    }
})




module.exports = router