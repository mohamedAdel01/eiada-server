const graphql = require("graphql");
const { GraphQLString } = graphql;

const { Create_Branch } = require("../../../controllers/branch");

const { BranchType_CRUD } = require("../../types/types");
const { validate } = require("../../../validations");
const { decodeToken, checkUserExistance } = require("../../../policies");

const createBranchMutation = {
  type: BranchType_CRUD,
  args: {
    address: { type: GraphQLString },
  },

  async resolve(parent, args, root) {
    let v_errors = validate(args);
    if (v_errors.length) return { errors: v_errors };

    let { decoded ,errors } = decodeToken(root.headers.authorization, false);
    if (errors.length) return { errors };

    let { p_userErrors } = await checkUserExistance(decoded._id, root.headers.authorization);
    if (p_userErrors.length) return { errors: p_userErrors };

    return await Create_Branch({ address: args.address });
  },
};

module.exports = {
  Create_Branch: createBranchMutation,
};
