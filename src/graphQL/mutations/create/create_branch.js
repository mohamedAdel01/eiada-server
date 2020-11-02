const graphql = require("graphql");
const { GraphQLString } = graphql;

const { Create_Branch } = require("../../../controllers/branch");

const { BranchType_CRUD } = require("../../types/types");
const { validate } = require("../../../validations");
const { decodeToken } = require("../../../policies");

const BranchMutation = {
  type: BranchType_CRUD,
  args: {
    address: { type: GraphQLString },
  },

  async resolve(parent, args, root) {
    let v_errors = validate(args);
    if (v_errors.length) return { errors: v_errors };

    let { errors } = decodeToken(root.headers.authorization, false);
    if (errors.length) return { errors };

    return await Create_Branch({ address: args.address });
  },
};

module.exports = {
  Create_Branch: BranchMutation,
};
