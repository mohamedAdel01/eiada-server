const graphql = require("graphql");
const { GraphQLObjectType, GraphQLSchema } = graphql;
const Queries = require("./queries");
const Mutations = require("./mutations");

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
