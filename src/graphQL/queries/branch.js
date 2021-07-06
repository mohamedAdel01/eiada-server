const graphql = require("graphql");
const { GraphQLList } = graphql;
const { BranchType } = require("../types/types");
const Branch = require("../../models/branch");
const { decodeToken } = require("../../policies");

const BranchQueries = {
  Branches: {
    type: new GraphQLList(BranchType),
    async resolve(_, args, root) {
      let { decoded } = decodeToken(root.headers.authorization, true);
      return Branch.find({ owner_id: decoded.owner_id });
    },
  },
};

module.exports = BranchQueries;
