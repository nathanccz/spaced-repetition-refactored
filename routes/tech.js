const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Tech = require('../models/Tech')

// @desc     Show add page
// @route    GET /tech/add

router.get('/add', ensureAuth, (req, res) => {
    res.render('tech/add')
})




module.exports = router