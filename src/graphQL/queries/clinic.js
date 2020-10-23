const graphql = require('graphql')
const { GraphQLID, GraphQLList } = graphql

// GRAPHQL TYPES
const { ClinicType } = require('../types/types')

// MONGODB MODELS
const ClinicModel = require('../../models/clinic')

const ClinicQueries = {
    Clinics: {
        type: new GraphQLList(ClinicType),
        resolve() {
            return ClinicModel.find({})
        }
    }
}

module.exports = ClinicQueries
