// MONGODB MODELS
const User = require('../models/user')

const service = async (user) => {

    await User.findOneAndUpdate(user._id, {email_verified: true})

    return {
        message: "Email verified successfully",
        errors: []
    }
}

module.exports = {
    service
}