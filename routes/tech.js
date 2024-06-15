const express = require('express')
const moment = require('moment')
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
        const dupe = await User.find({ _id: req.user.id, tech: { $elemMatch: { $eq: techID } } })
    
        if (dupe.length > 0) return res.json('Tech already exists')

        const result = await User.updateOne(
            { _id: req.user.id }, 
            { $push: { tech: techID } }
        )

        res.json('Item added successfully')
    } catch (err) {
        console.error(err)
    }
})

// @desc     Delete tech from dashboard
// @route    DELETE /tech/deleteTech

router.delete('/deleteTech', ensureAuth, async (req, res) => {
    const techID = req.body.techToDelete
    try {
        const result = await User.updateOne(
            { _id: req.user.id }, 
            { $pull: { tech: techID } }
        )
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
        const techLogo = techArr[0].faClass
        const topic = await Topic.find({ user: req.user.id, tech: techID }).lean()

        res.render('tech/overview', { techName, techID, topic, techLogo })
    } catch (err) {
        console.error(err)
    }
})

// @desc     Add tech topic
// @route    POST /tech/addTopic

router.post('/addTopic', ensureAuth, async (req, res) => {
    const topic = req.body.topicToAdd
    const techID = req.body.techID
    const userID = req.user.id
    try {
        const result = await Topic.create(
            { topic: topic, tech: techID, user: userID }
        )
        res.json('Topic added successfully')
    } catch (err) {
        console.log(err)
    }
})

// @desc     Add session history
// @route    POST /tech/addSession

router.post('/addSession', ensureAuth, async (req, res) => {
    const topicID = req.body.topicID
    const techID = req.body.techID
    const userID = req.user.id
    const rating = req.body.rating
    const date = moment().format('MMMM Do, YYYY')
    const time = moment().format('h:mm A')

    console.log(topicID, techID, userID, rating)

    try {
        const result = await Topic.updateOne(
            { _id: topicID, tech: techID, user: userID }, 
            { $push: { history: { date: date, time: time, rating: rating } } }
        )
        res.json('Session saved')
    } catch (err) {
        console.log(err)
    }
})

// @desc     Delete topic 
// @route    DELETE /tech/deleteTopic

router.delete('/deleteTopic', ensureAuth, async (req, res) => {
    const topicID = req.body.topicID
   
    try {
        const result = await Topic.findOneAndDelete(
            { user: req.user.id, _id: topicID }, 
        )
        res.json('Topic deleted')
    } catch (err) {
        console.error(err)
    }
})

// @desc     Edit topic 
// @route    PUT /tech/editTopic

router.put('/editTopic', ensureAuth, async (req, res) => {
    const topicID = req.body.topicID
    const newTopic = req.body.newTopic
    
    try {
        const result = await Topic.updateOne(
            { user: req.user.id, _id: topicID },
            { $set: { topic: newTopic} } 
        )
        res.json('Topic changed')
    } catch (err) {
        console.error(err)
    }
})



module.exports = router