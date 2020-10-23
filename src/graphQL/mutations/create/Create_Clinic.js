const graphql = require('graphql')
const { GraphQLString, GraphQLID } = graphql

// GRAPHQL TYPES
const { CreateClinicType } = require('../../types/types')
const { checkToken } = require('../../../policies')
const {Add_Clinic} = require('../../../services/clinicServices')

const ClinicMutation = {
    type: CreateClinicType,
    args: {
        name: { type: GraphQLString }
    },

    async resolve(parent, args, root) {
        let decoded = checkToken(root.headers.authorization)
        if (decoded.errors.length) return decoded
        return await Add_Clinic({name: args.name, owner_id: decoded.user._id})
    }
}

module.exports = ClinicMutation
