const graphql = require('graphql')
const { GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLString, GraphQLID } = graphql
// const ObjectId = require('mongodb').ObjectID

// MONGODB MODELS
// const clinic = require('../../models/clinic')
const user = require('../../models/user')
const role = require('../../models/role')
const specialization = require('../../models/specialization')

const RegisterType = new GraphQLObjectType({
    name: 'Register',
    fields: () => ({
        message: { type: GraphQLString }
    })
})

const ClinicType = new GraphQLObjectType({
    name: 'Clinic',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        logo: { type: GraphQLString },
        theme_settings: { type: GraphQLString },
        owner: {
            type: UserType,
            resolve(parent, args) {
                return user.findById(parent.owner_id)
            }
        }
    })
})

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        fullname: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        image: { type: GraphQLString },
        birthdate: { type: GraphQLString },
        password: { type: GraphQLString },
        role: {
            type: RoleType,
            resolve(parent, args) {
                return role.findById(parent.role_id)
            }
        },
        specialization: {
            type: SpecializationType,
            resolve(parent, args) {
                return specialization.findById(parent.specialization_id)
            }
        },

    })
})

const RoleType = new GraphQLObjectType({
    name: 'Role',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString }
    })
})

const SpecializationType = new GraphQLObjectType({
    name: 'Specialization',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString }
    })
})

module.exports = {
    RegisterType,
    ClinicType,
    UserType,
    RoleType
}