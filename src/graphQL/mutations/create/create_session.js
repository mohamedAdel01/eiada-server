const graphql = require("graphql");
const { GraphQLString, GraphQLNonNull, GraphQLID } = graphql;

const { Create_Session } = require("../../../controllers/sessions");

const { MessageType } = require("../../types/types");

const { decodeToken, checkUserExistance } = require("../../../policies");

const createSessionMutation = {
  type: MessageType,
  args: {
    specialization_id: { type: new GraphQLNonNull(GraphQLID) },
    doctor_id: { type: new GraphQLNonNull(GraphQLID) },
    patient_phone: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: new GraphQLNonNull(GraphQLString) },
  },

  async resolve(parent, args, root) {
    let { decoded, errors } = decodeToken(root.headers.authorization, false);
    if (errors.length) return { errors };

    let { p_userErrors } = await checkUserExistance(
      decoded._id,
      root.headers.authorization,
      false
    );
    if (p_userErrors.length) return { errors: p_userErrors };

    // session must be to check if booking 
    // is still open or closed before create

    return await Create_Session(args, decoded._id);

  },
};

module.exports = {
  Create_Session: createSessionMutation,
};
