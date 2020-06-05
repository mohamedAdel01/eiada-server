const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ServiceDetails = new Schema({
    service_details_id: {
        type: String,
        required: true
    },
    opened_at: String,
    closed_at: String
})

module.exports = mongoose.model('service_details', ServiceDetails)