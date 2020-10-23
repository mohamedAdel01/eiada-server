const graphql = require('graphql')
const { GraphQLObjectType, GraphQLSchema } = graphql

// GRAPHQL QUERIES
const { Clinics } = require('./queries/clinic')
const { Users } = require('./queries/user')


// MUTATIONS
const Register = require('./mutations/auth/register')


// GRAPHQL ROOT QUERY
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    clinics: Clinics,
    users: Users
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    register: Register
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
