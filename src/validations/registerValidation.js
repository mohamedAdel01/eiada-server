const Schema = require('validate')

const Register = new Schema({
    fullname: {
        type: String,
        required: true,
        length: { min: 3, max: 32 },
        message: {
            type: 'Name must be a string.',
            required: 'Name is required.',
            length: 'Name must be between 3 and 32 letters only.'
        }
    },
    email: {
        type: String,
        required: true,
        message: {
            type: 'Email must be a string.',
            required: 'Email is required.'
        }
    },
    phone: {
        type: String,
        required: true,
        message: {
            type: 'Phone must be a string.',
            required: 'Phone is required.'
        }
    },
    password: {
        type: String,
        required: true,
        message: {
            required: 'Password is required.'
        }
    }
})

module.exports = Register