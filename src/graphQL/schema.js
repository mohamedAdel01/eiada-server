const graphql = require("graphql");
const { GraphQLObjectType, GraphQLSchema } = graphql;

// GRAPHQL QUERIES
const Queries = require("./queries");

// MUTATIONS
const Mutations = require("./mutations");

// GRAPHQL ROOT QUERY
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    ...Queries,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutations",
  fields: {
    ...Mutations,
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
