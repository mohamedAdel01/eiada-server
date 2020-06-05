const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Subscription = new Schema({
    doctors_num: {
        type: Number,
        required: true
    },
    specializations_num: {
        type: Number,
        required: true
    },
    end_at: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('subscription', Subscription)