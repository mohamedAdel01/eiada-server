const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        maxlength: 11,
        minlength: 11,
        trim: true,
        required: true,
        unique: true
    },
    image: String,
    birthdate: Date,
    position_id: {
        type: String,
        required: true
    },
    permission_id: {
        type: String,
        required: true
    },
    specialization_id: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('user', User)