const graphql = require("graphql");
const { GraphQLString, GraphQLNonNull } = graphql;

const { Create_Clinic } = require("../../../controllers/clinic");

const { ClinicType_CRUD } = require("../../types/types");
const { validate } = require("../../../validations");
const {
  decodeToken,
  checkClinicExist,
  checkUserExistance
} = require("../../../policies");

const createClinicMutation = {
  type: ClinicType_CRUD,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
  },

  async resolve(parent, args, root) {
    let v_errors = validate(args);
    if (v_errors.length) return { errors: v_errors };

    let { decoded, errors } = decodeToken(root.headers.authorization, false);
    if (errors.length) return { errors };

    let { p_userErrors } = await checkUserExistance(decoded._id, root.headers.authorization, false);
    if (p_userErrors.length) return { errors: p_userErrors };

    let { p_clinicErrors } = await checkClinicExist(false);
    if (p_clinicErrors.length) return { errors: p_clinicErrors };

    return await Create_Clinic({ name: args.name });
  },
};

module.exports = {
  Create_Clinic: createClinicMutation,
};
