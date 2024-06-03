const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Tech = require('../models/Tech')
const User = require('../models/User')

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
        res.json(techList)
    } catch (err) {
        console.error(err)
    }
})

// @desc     Add new tech
// @route    POST /tech/addTech

router.post('/addTech', ensureAuth, async (req, res) => {
    const newTech = req.body.techToAdd
    
    try {
        const techArr = await Tech.find({ techName: newTech }).lean()
        const techID = techArr[0]._id
        const result = await User.updateOne({ _id: req.user.id }, { $push: { tech: techID } })
        console.log(result)
        res.json('Item added successfully')
    } catch (err) {
        console.error(err)
    }
})

// @desc     Delete tech from dashboard
// @route    DELETE /tech/deleteTech

router.delete('/deleteTech', ensureAuth, async (req, res) => {
    const techID = req.body.techToDelete
    console.log(techID)
    try {
        const result = await User.updateOne({ _id: req.user.id }, { $pull: { tech: techID } })
        res.json('Item deleted')
    } catch (err) {
        console.error(err)
    }
})


module.exports = router