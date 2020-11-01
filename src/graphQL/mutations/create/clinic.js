const graphql = require("graphql");
const { GraphQLString } = graphql;

const { Create_Clinic } = require("../../../controllers/clinic");

const { ClinicType_CRUD } = require("../../types/types");
const { validate } = require("../../../validations")
const { decodeToken } = require("../../../policies");

const ClinicMutation = {
  type: ClinicType_CRUD,
  args: {
    name: { type: GraphQLString },
  },

  async resolve(parent, args, root) {
    let v_errors = validate(args);
    if (v_errors.length) return { errors: v_errors };

    let {decoded, errors} = decodeToken(root.headers.authorization, false);
    if (errors.length) return { errors };

    return await Create_Clinic({ name: args.name, owner_id: decoded._id });
  },
};

module.exports = {
  Create_Clinic: ClinicMutation
};
