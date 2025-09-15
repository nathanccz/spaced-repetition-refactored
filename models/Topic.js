const mongoose = require('mongoose')

const TopicSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true,
    },
    tech: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tech'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    history: [
        {
            date: {
                type: String,
                required: true,
            },
            time: {
                type: String,
                required: true,
            },
            rating: {
                type: String,
                required: true,
            },
        }
    ]
})

module.exports = mongoose.model('Topic', TopicSchema)