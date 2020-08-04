const graphql = require('graphql')
const { GraphQLInt, GraphQLID, GraphQLString, GraphQLList } = graphql

// GRAPHQL TYPES
const { RegisterType } = require('../../types/types')

// MONGODB MODELS
const clinic = require('../../../models/clinic')
const user = require('../../../models/user')

const RegisterMutation = {
    type: RegisterType,
    args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        password: { type: GraphQLString },
        clinic_name: { type: GraphQLString },
        clinic_phone: { type: GraphQLString },
        specializations_ids: { type: new GraphQLList(GraphQLString) },
    },
    async resolve(parent, args) {
        let userObj = new user({
            name: args.name,
            email: args.email,
            phone: args.phone,
            role_id: "1",
            password: args.password
        })


        await userObj.save().then(async savedUser => {
            let clinicObj = new clinic({
                owner_id: savedUser._id,
                clinic_name: args.clinic_name,
                clinic_phone: args.clinic_phone,
                specializations_ids: args.specializations_ids
            })


            await clinicObj.save()
        })


        return {
            message: "please activate your account"
        }


    }
}

module.exports = RegisterMutation
