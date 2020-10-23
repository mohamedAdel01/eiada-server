const graphql = require('graphql')
const { GraphQLString, GraphQLID } = graphql

// GRAPHQL TYPES
const { CreateClinicType } = require('../../types/types')
// const {validate} = require('../../../validations/registerValidation')
// const {service} = require('../../../services/registerServices')

const ClinicMutation = {
    type: CreateClinicType,
    args: {
        name: { type: GraphQLString }
    },

    async resolve(parent, args, root) {
        console.log('loooo',args.name)
        console.log('loooo',root.headers.authorization)
    }
}

module.exports = ClinicMutation
