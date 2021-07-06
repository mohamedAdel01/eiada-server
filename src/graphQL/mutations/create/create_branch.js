const graphql = require("graphql");
const { GraphQLList } = graphql;

const { Create_Branches } = require("../../../controllers/branch");

const { BranchType_CRUD, BranchInputType } = require("../../types/types");
const { checkClinicExist, decodeToken } = require("../../../policies");

const createBranchesMutation = {
  type: BranchType_CRUD,
  args: {
    addresses: { type: new GraphQLList(BranchInputType) },
  },

  async resolve(_, args, root) {
    let { decoded } = decodeToken(root.headers.authorization, true);

    let { p_clinicErrors } = await checkClinicExist(decoded._id, true);
    if (p_clinicErrors.length) return { errors: p_clinicErrors };

    return await Create_Branches({ owner_id: decoded._id, addresses: args.addresses });
  },
};

module.exports = {
  CREATE_BRANCHES: createBranchesMutation,
};
