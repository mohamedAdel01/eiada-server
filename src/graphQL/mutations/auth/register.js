const graphql = require('graphql')
const { GraphQLInt, GraphQLID, GraphQLString, GraphQLList } = graphql

// GRAPHQL TYPES
const { RegisterType } = require('../../types/types')
const RegisterValidateSchema = require('../../../validations/registerValidation')

// MONGODB MODELS
const clinic = require('../../../models/clinic')
const user = require('../../../models/user')

const RegisterMutation = {
    type: RegisterType,
    args: {
        fullname: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        password: { type: GraphQLString }
    },

    async resolve(parent, args) {
        console.log('--------------------------------')
        // let ee = RegisterValidateSchema.validate(args).reduce((initial,item)=> {
        //     initial.push({
        //         key: item.path,
        //         message: item.message
        //     })
        //     return initial
        // },[])
        // console.log(ee)
        console.log('--------------------------------')

        let userObj = new user({
            fullname: args.fullname,
            email: args.email,
            phone: args.phone,
            password: args.password,
            role_id: "1"
        })

        let user = await userObj.save()

        return {
            message: 'Welcome ' + user.fullname
        }

        // await userObj.save().then(async savedUser => {
        //     let clinicObj = new clinic({
        //         owner_id: savedUser._id,
        //         clinic_name: args.clinic_name,
        //         clinic_phone: args.clinic_phone,
        //         specializations_ids: args.specializations_ids
        //     })


        //     await clinicObj.save()
        // })

        // throw {
        //     message: 'RegisterValidateSchema.validate(args).toString()',
        //     customField: RegisterValidateSchema.validate(args).toString()
        // }


    }
}

module.exports = RegisterMutation
