const graphql = require("graphql");
const { GraphQLString } = graphql;

const { MessageType } = require("../../types/types");
const { decodeToken } = require("../../../policies");
const { validate_email } = require("../../../controllers/emails");

const VerifyEmailMutation = {
  type: MessageType,
  args: {
    verification_code: { type: GraphQLString },
  },

  async resolve(_, args, root) {
    let decodedToken = decodeToken(root.headers.authorization, false);
    if (decodedToken.errors.length) return decodedToken;

    let decoded_VCode = decodeToken(args.verification_code, true);
    if (decoded_VCode.errors.length) return decoded_VCode;

    return await validate_email(decoded_VCode.decoded);
  },
};

module.exports = {
  Verify_Email: VerifyEmailMutation,
};
