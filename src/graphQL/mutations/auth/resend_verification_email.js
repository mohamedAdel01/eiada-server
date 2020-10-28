// GRAPHQL TYPES
const { MessageType } = require("../../types/types");
const { decodeToken } = require("../../../policies");
const {
  send_verification_email,
} = require("../../../controllers/validate_controller");

const resendVerificationMail = {
  type: MessageType,

  async resolve(parent, args, root) {
    let decoded = decodeToken(root.headers.authorization, false);
    if (decoded.errors.length) return decoded;

    return await send_verification_email(decoded.user);
  },
};

module.exports = resendVerificationMail;
