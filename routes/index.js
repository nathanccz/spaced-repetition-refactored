const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Tech = require('../models/Tech')

//@desc     Login/Landing page
//@route    GET /

router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login'
    })
})

//@desc     Dashboard
//@route    GET /dashboard

router.get('/profile', ensureAuth, async(req, res) => {
   console.log(req.user.image)
    try {
        const tech = await Tech.find({  user: req.user.id }).lean()
        res.render('profile', {
            name: req.user.firstName,
            tech
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})


module.exports = router