const graphql = require("graphql");
const { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLList } = graphql;

const { Update_During_Session } = require("../../../controllers/sessions");

const { MessageType, ServiceInputType, PartialInputType } = require("../../types/types");

const { decodeToken, checkUserExistance } = require("../../../policies");

const createSessionMutation = {
  type: MessageType,
  args: {
    chief_complaint: { type: new GraphQLNonNull(GraphQLString) },
    session_summary: { type: new GraphQLNonNull(GraphQLString) },
    services: { type: new GraphQLList(ServiceInputType) },
    partials: { type: new GraphQLList(PartialInputType) },
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
