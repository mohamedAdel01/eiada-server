const graphql = require('graphql')
const { GraphQLObjectType, GraphQLSchema } = graphql

// GRAPHQL QUERIES
const queries  = require('./queries')

// MUTATIONS
const mutations = require('./mutations')


// GRAPHQL ROOT QUERY
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...queries
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    ...mutations
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
