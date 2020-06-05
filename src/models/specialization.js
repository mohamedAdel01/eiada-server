const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Specialization = new Schema({
    specialization_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    
})

module.exports = mongoose.model('specialization', Specialization)