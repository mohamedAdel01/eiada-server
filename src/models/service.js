const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Service = new Schema({
    service_details_id: {
        type: String,
        required: true
    },
    opened_at: String,
    closed_at: String
})

module.exports = {
    Schema: Service,
    ServiceModel: mongoose.model('Service', Service)
}