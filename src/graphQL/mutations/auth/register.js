const graphql = require('graphql')
const { GraphQLString } = graphql

// GRAPHQL TYPES
const { RegisterType } = require('../../types/types')
const {validate} = require('../../../validations/registerValidation')
const {service} = require('../../../services/registerServices')

const RegisterMutation = {
    type: RegisterType,
    args: {
        fullname: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        password: { type: GraphQLString }
    },

    async resolve(parent, args) {

        let validationErrors = validate(args)

        if(validationErrors.length) return {
                token: null,
                user: null,
                errors: validationErrors
            }
        
        return await service(args)

    }
}

module.exports = RegisterMutation
