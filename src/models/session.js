const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Session = new Schema({
    doctor_id: {
        type: String,
        required: true
    },
    patient_id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    time: {
        type: Date,
        required: true
    },
    services_ids: [String],
    state: {
        type: String,
        enum: ["Opened", "Closed"]
    },
    partial: {
        description: String,
        price: Number
    },
    paid: Number,
    total: Number
})

module.exports = mongoose.model('session', Session)