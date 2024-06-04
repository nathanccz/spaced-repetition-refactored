const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Tech = require('../models/Tech')
const User = require('../models/User')
const Topic = require('../models/Topic')

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

// @desc     Show tech overview page with all topics
// @route    GET /tech/:id

router.get('/:id', ensureAuth, async (req, res) => {
    const techID = req.params.id
    try {
        const techArr = await Tech.find({ _id: techID }).lean()
        const techName = techArr[0].techName
        const topic = await Topic.find({ user: req.user.id, tech: techID }).lean()
        res.render('tech/overview', { techName, techID, topic })
    } catch (err) {
        console.error(err)
    }
})

// @desc     Add tech topic
// @route    POST /tech/:id/addTopic

router.post('/addTopic', ensureAuth, async (req, res) => {
    const topic = req.body.topicToAdd
    const techID = req.body.techID
    const userID = req.user.id
    try {
        const result = await Topic.create({ topic: topic, tech: techID, user: userID })
        res.json('Topic added successfully')
    } catch (err) {
        console.log(err)
    }
})



module.exports = router