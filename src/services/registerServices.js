// MONGODB MODELS
const User = require('../models/user')

const service = async (args) => {
    let errors = []
    let exUser = await User.findOne({email: args.email})

    if(exUser) {
        errors.push({
            key: 'DB',
            message: 'User is already exist'
        })
        return {
            errors: errors,
            user: null
        }
    }

    let userObj = new User({
        fullname: args.fullname,
        email: args.email,
        phone: args.phone,
        password: args.password,
        role_id: "1"
    })

    
    let newUser = await userObj.save()

    return {
        errors: [],
        user: newUser
    }
     
}

module.exports = {
    service
}