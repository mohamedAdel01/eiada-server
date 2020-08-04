const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Specialization = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }
})

module.exports = mongoose.model('Specialization', Specialization)