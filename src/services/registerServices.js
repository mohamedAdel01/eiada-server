// MONGODB MODELS
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user')
const {
    mail
} = require('../../config/nodemail')

const service = async (args) => {
    let errors = []
    let exUser = await User.findOne({
        email: args.email
    })

    if (exUser) {
        errors.push({
            key: 'DB',
            message: 'User is already exist'
        })
        return {
            errors: errors
        }
    }

    const hash = bcrypt.hashSync(args.password, 10);

    let userObj = new User({
        fullname: args.fullname,
        email: args.email,
        phone: args.phone,
        password: hash,
        role: "admin"
    })


    let NewUser = await userObj.save()

    const Token = jwt.sign({
        data: NewUser
    }, 'secret', {
        expiresIn: 60 * 10
    });

    mail(NewUser.email, 'Email verification', `Press here to Verify your email and this code is available for 10min: ${Token}`)

    return {
        message: "Please check your mail to verify mail",
        user: NewUser,
        errors: []
    }

}

module.exports = {
    service
}