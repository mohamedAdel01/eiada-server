const graphql = require("graphql");
const { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLList } = graphql;

const { Update_During_Session } = require("../../../controllers/session");

const {
  MessageType,
  ServiceInputType,
  PartialInputType,
} = require("../../types/types");

const { checkSessionExist } = require("../../../policies");

const updateDuringSessionMutation = {
  type: MessageType,
  args: {
    session_id: { type: new GraphQLNonNull(GraphQLID) },
    chief_complaint: { type: new GraphQLNonNull(GraphQLString) },
    session_summary: { type: new GraphQLNonNull(GraphQLString) },
    services: { type: new GraphQLList(ServiceInputType) },
    partials: { type: new GraphQLList(PartialInputType) },
  },

  async resolve(parent, args, root) {
    let { p_sessionErrors, exSession } = await checkSessionExist(
      args.session_id,
      false
    );
    if (p_sessionErrors.length) return { errors: p_sessionErrors };

    return await Update_During_Session(args, exSession);
  },
};

module.exports = {
  Update_During_Session: updateDuringSessionMutation,
};
