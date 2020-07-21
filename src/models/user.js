const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    name: {
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
        type: String,
        maxlength: 11,
        minlength: 11,
        trim: true,
        required: true,
        unique: true
    },
    image: String,
    birthdate: Date,
    role_id: {
        type: String,
        required: true
    },
    permission_id: {
        type: String,
        // required: true
    },
    specialization_id: {
        type: String,
        // required: true
    },
    activated: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = {
    Schema: User,
    UserModel: mongoose.model('User', User)
}