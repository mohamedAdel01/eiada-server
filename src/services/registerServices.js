// MONGODB MODELS
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
      }, 'secret', { expiresIn: '1h' });

    return {
        token: Token,
        user: NewUser,
        errors: [],
    }
     
}

module.exports = {
    service
}