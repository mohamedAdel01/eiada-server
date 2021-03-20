const graphql = require("graphql");
const { GraphQLID, GraphQLList } = graphql;

// GRAPHQL TYPES
const { RoleType } = require("../types/types");

// MONGODB MODELS
const roleModal = require("../../models/role");

const RoleQueries = {
  Roles: {
    type: new GraphQLList(RoleType),
    resolve() {
      return roleModal.find({ custom: false });
    },
  },
};

module.exports = RoleQueries;
