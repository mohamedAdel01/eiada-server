const graphql = require("graphql");
const { GraphQLList } = graphql;

const { Create_Branches } = require("../../../controllers/branch");

const { BranchType_CRUD, BranchInputType } = require("../../types/types");
const { decodeToken, checkUserExistance, checkClinicExist } = require("../../../policies");

const createBranchesMutation = {
  type: BranchType_CRUD,
  args: {
    addresses: { type: new GraphQLList(BranchInputType) },
  },

  async resolve(parent, args, root) {
    let { decoded ,errors } = decodeToken(root.headers.authorization, false);
    if (errors.length) return { errors };

    let { p_userErrors } = await checkUserExistance(decoded._id, root.headers.authorization, false);
    if (p_userErrors.length) return { errors: p_userErrors };

    let { p_clinicErrors } = await checkClinicExist(true);
    if (p_clinicErrors.length) return { errors: p_clinicErrors };

    return await Create_Branches({ addresses: args.addresses });
  },
};

module.exports = {
  CREATE_BRANCHES: createBranchesMutation,
};
