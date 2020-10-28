const graphql = require("graphql");
const { GraphQLString } = graphql;

// GRAPHQL TYPES
const { MessageType } = require("../../types/types");
const { decodeToken } = require("../../../policies");
const {
  changePasswordRequest,
} = require("../../../controllers/auth/forget_password_controller");

const forgetPasswordRequestMutation = {
  type: MessageType,
  args: {
    email: { type: GraphQLString },
  },

  async resolve(parent, args, root) {
    return await changePasswordRequest(args.email);
  },
};

module.exports = {
  forget_password_request: forgetPasswordRequestMutation,
};
