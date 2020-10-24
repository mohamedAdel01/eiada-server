const graphql = require('graphql')
const { GraphQLString, GraphQLID } = graphql

// GRAPHQL TYPES
const { ClinicType_CRUD } = require('../../types/types')
const { checkToken } = require('../../../policies')
const { Clinic_Create } = require('../../../controllers/clinic_controller')

const ClinicMutation = {
    type: ClinicType_CRUD,
    args: {
        name: { type: GraphQLString }
    },

    async resolve(parent, args, root) {
        let decoded = checkToken(root.headers.authorization)
        if (decoded.errors.length) return decoded
        return await Clinic_Create({name: args.name, owner_id: decoded.user._id})
    }
}

module.exports = ClinicMutation
