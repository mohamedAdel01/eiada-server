const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Patient = new Schema({
    patient_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true
    },
    phone: {
        type: String,
        maxlength: 11,
        minlength: 11,
        trim: true,
        required: true,
        unique: true
    },
    image: String,
    birthdate: Date,
    chief_complaint: String,
    past_history: String,
    medical_history: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Patient', Patient)