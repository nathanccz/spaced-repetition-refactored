const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Tech = require('../models/Tech')
const User = require('../models/User')

//@desc     Login/Landing page
//@route    GET /

router.get('/', ensureGuest, (req, res) => {
    res.render('home', {
        layout: 'home'
    })
})

//@desc     Login/Landing page
//@route    GET /

router.get('/login', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login'
    })
})

//@desc     Dashboard
//@route    GET /dashboard

router.get('/profile', ensureAuth, async(req, res) => {
   console.log(req.user.image)
    try {
        const user = await User.findOne({  _id: req.user.id }).populate('tech').lean()
        const tech = user.tech
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