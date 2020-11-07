const graphql = require("graphql");
const { GraphQLString } = graphql;

const { Create_Clinic } = require("../../../controllers/clinic");

const { ClinicType_CRUD } = require("../../types/types");
const { validate } = require("../../../validations");
const {
  decodeToken,
  checkClinicExist,
  checkEmailVerification,
} = require("../../../policies");

const createClinicMutation = {
  type: ClinicType_CRUD,
  args: {
    name: { type: GraphQLString },
  },

  async resolve(parent, args, root) {
    let v_errors = validate(args);
    if (v_errors.length) return { errors: v_errors };

    let { decoded, errors } = decodeToken(root.headers.authorization, false);
    if (errors.length) return { errors };

    let { p_emailErrors } = await checkEmailVerification(decoded._id, true);
    if (p_emailErrors.length) return { errors: p_emailErrors };

    let { p_clinicErrors } = await checkClinicExist();
    if (p_clinicErrors.length) return { errors: p_clinicErrors };

    return await Create_Clinic({ name: args.name });
  },
};

module.exports = {
  Create_Clinic: createClinicMutation,
};
