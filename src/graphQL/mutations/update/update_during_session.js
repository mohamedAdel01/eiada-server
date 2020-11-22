const graphql = require("graphql");
const { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLList } = graphql;

const { Update_During_Session } = require("../../../controllers/sessions");

const { MessageType, ServiceInputType, PartialInputType } = require("../../types/types");

const { decodeToken, checkUserExistance, checkSessionExist } = require("../../../policies");

const createSessionMutation = {
  type: MessageType,
  args: { 
    session_id: { type: new GraphQLNonNull(GraphQLID) },
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
    
    let { p_sessionErrors } = await checkSessionExist(args.session_id)
    if (p_sessionErrors.length) return { errors: p_sessionErrors };

    return await Update_During_Session(args);
  },
};

module.exports = {
  Create_Session: createSessionMutation,
};
