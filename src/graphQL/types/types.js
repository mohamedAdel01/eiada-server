const graphql = require('graphql')
const { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLID } = graphql
// const ObjectId = require('mongodb').ObjectID

// MONGODB MODELS
// const clinic = require('../../models/clinic')
const user = require('../../models/user')
const role = require('../../models/role')
const specialization = require('../../models/specialization')

const RegisterType = new GraphQLObjectType({
    name: 'Register',
    fields: () => ({
        token: {type: GraphQLString},
        user: {type: UserType},
        errors: { type: new GraphQLNonNull(new GraphQLList(ErrorType)) }
    })
})

const CreateClinicType = new GraphQLObjectType({
    name: 'CraeteClinic',
    fields: () => ({
        clinic: {type: ClinicType},
        errors: { type: new GraphQLNonNull(new GraphQLList(ErrorType)) }
    })
})

const ClinicType = new GraphQLObjectType({
    name: 'Clinic',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        owner_id: {type: GraphQLID},
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

const ErrorType = new GraphQLObjectType({
    name: 'Error',
    fields: () => ({
        key: {type: GraphQLString},
        message: {type: GraphQLString}
    })
})

module.exports = {
    RegisterType,
    CreateClinicType,
    ClinicType,
    UserType,
    RoleType
}