const graphql = require("graphql");
const { GraphQLList } = graphql;
const { BranchType } = require("../types/types");
const Branch = require("../../models/branch");

const BranchQueries = {
  Branches: {
    type: new GraphQLList(BranchType),
    async resolve(parent, args, root) {
      return Branch.find({});
    },
  },
};

module.exports = BranchQueries;
