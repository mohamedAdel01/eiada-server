const graphql = require("graphql");
const { GraphQLID, GraphQLList } = graphql;

// GRAPHQL TYPES
const { UserType } = require("../types/types");

// MONGODB MODELS
const userModel = require("../../models/user");

const UserQueries = {
  Users: {
    type: new GraphQLList(UserType),
    resolve() {
      return userModel.find({});
    },
  },
};

module.exports = UserQueries;
