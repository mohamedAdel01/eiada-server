const graphql = require('graphql')
const {GraphQLObjectType, GraphQLSchema} = graphql

// GRAPHQL QUERIES


// MUTATIONS



// GRAPHQL ROOT QUERY
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {

  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
      
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
