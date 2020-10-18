const graphql = require('graphql')
const { GraphQLInt, GraphQLID, GraphQLString, GraphQLList } = graphql

// GRAPHQL TYPES
const { RegisterType } = require('../../types/types')
const {validate} = require('../../../validations/registerValidation')

// MONGODB MODELS
const clinic = require('../../../models/clinic')
const User = require('../../../models/user')

const RegisterMutation = {
    type: RegisterType,
    args: {
        fullname: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        password: { type: GraphQLString }
    },

    async resolve(parent, args) {

        let errors = validate(args)

        if(errors.length) {
            return {
                user: null,
                errors: errors
            }
        }

        let userObj = new User({
            fullname: args.fullname,
            email: args.email,
            phone: args.phone,
            password: args.password,
            role_id: "1"
        })

        let createdUser = await userObj.save()

        return {
            user: createdUser,
            errors: null
        }

    }
}

module.exports = RegisterMutation
