// GRAPHQL TYPES
const { MessageType } = require("../../types/types");
const { decodeToken } = require("../../../policies");
const {
  send_verification_email,
} = require("../../../controllers/auth/validate_controller");

const forgetPasswordRequestMutation = {
  type: MessageType,

  async resolve(parent, args, root) {

    return await changePasswordRequest(args.email);
  },
};

module.exports = {
    forgetPasswordRequestMutation
};
