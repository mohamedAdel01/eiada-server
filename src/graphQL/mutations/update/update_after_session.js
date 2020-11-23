const graphql = require("graphql");
const {GraphQLNonNull, GraphQLList, GraphQLID, GraphQLFloat } = graphql;

const { Update_After_Session } = require("../../../controllers/session");

const { MessageType, PartialInputType } = require("../../types/types");

const {
  decodeToken,
  checkUserExistance,
  checkSessionExist,
} = require("../../../policies");

const updateAfterSessionMutation = {
  type: MessageType,
  args: {
    session_id: { type: new GraphQLNonNull(GraphQLID) },
    partials: { type: new GraphQLList(PartialInputType) },
    paid: { type: new GraphQLNonNull(GraphQLFloat) }
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

    let { p_sessionErrors, exSession } = await checkSessionExist(args.session_id, true);
    if (p_sessionErrors.length) return { errors: p_sessionErrors };

    return await Update_After_Session(args, exSession);
  },
};

module.exports = {
  Update_After_Session: updateAfterSessionMutation,
};
