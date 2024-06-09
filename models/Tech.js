const mongoose = require('mongoose')

const TechSchema = new mongoose.Schema({
    techName: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    faClass: {
        type: String,
        required: false
    },
}, { collection: 'tech_list' })

module.exports = mongoose.model('Tech', TechSchema)