const graphql = require("graphql");
const { GraphQLString } = graphql;

const { decodeToken } = require("../../../policies");
const { MessageType } = require("../../types/types");
const { validate_email } = require("../../../controllers/auth/validate_controller");

const VerifyMailMutation = {
  type: MessageType,
  args: {
    verification_code: {
      type: GraphQLString,
    },
  },
  async resolve(parent, args, root) {
    let decodedToken = decodeToken(root.headers.authorization, false);
    if (decodedToken.errors.length) return decodedToken;

    let decoded_verification_code = decodeToken(args.verification_code, true);
    if (decoded_verification_code.errors.length)
      return decoded_verification_code;

    return await validate_email(decoded_verification_code.user);
  },
};

module.exports = VerifyMailMutation;
