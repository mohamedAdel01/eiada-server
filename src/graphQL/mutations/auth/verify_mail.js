const { checkToken } = require("../../../policies");
const { MessageType } = require("../../types/types");
const { validate_email } = require("../../../controllers/validate_controller");

const VerifyMailMutation = {
  type: MessageType,

  async resolve(parent, args, root) {
    let decoded = checkToken(root.headers.authorization);
    if (decoded.errors.length) return decoded;

    return await validate_email(decoded.user);
  },
};

module.exports = VerifyMailMutation;
