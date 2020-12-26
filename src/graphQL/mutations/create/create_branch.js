const graphql = require("graphql");
const { GraphQLList } = graphql;

const { Create_Branches } = require("../../../controllers/branch");

const { BranchType_CRUD, BranchInputType } = require("../../types/types");
const { checkClinicExist } = require("../../../policies");

const createBranchesMutation = {
  type: BranchType_CRUD,
  args: {
    addresses: { type: new GraphQLList(BranchInputType) },
  },

  async resolve(parent, args, root) {
    let { p_clinicErrors } = await checkClinicExist(true);
    if (p_clinicErrors.length) return { errors: p_clinicErrors };

    return await Create_Branches({ addresses: args.addresses });
  },
};

module.exports = {
  CREATE_BRANCHES: createBranchesMutation,
};
