const graphql = require("graphql");
const { GraphQLString, GraphQLNonNull } = graphql;

const { Create_Clinic } = require("../../../controllers/clinic");

const { ClinicType_CRUD } = require("../../types/types");
const { validate } = require("../../../validations");
const { decodeToken, checkClinicExist } = require("../../../policies");

const createClinicMutation = {
  type: ClinicType_CRUD,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
  },

  async resolve(_, args, root) {
    let v_errors = validate(args);
    if (v_errors.length) return { errors: v_errors };

    let { decoded } = decodeToken(root.headers.authorization, true);

    let { p_clinicErrors } = await checkClinicExist(decoded.owner_id, false);
    if (p_clinicErrors.length) return { errors: p_clinicErrors };

    return await Create_Clinic({ name: args.name, owner_id: decoded.owner_id });
  },
};

module.exports = {
  CREATE_CLINIC: createClinicMutation,
};
