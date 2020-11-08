const graphql = require("graphql");
const { GraphQLString, GraphQLNonNull } = graphql;

const { validate_email, send_verification_email } = require("../../../controllers/emails");

const { MessageType } = require("../../types/types");
const { decodeToken, checkUserExistance } = require("../../../policies");

const VerifyEmailMutation = {
  type: MessageType,
  args: {
    verification_code: { type: new GraphQLNonNull(GraphQLString) },
  },

  async resolve(_, args, root) {
    let { errors, decoded } = decodeToken(root.headers.authorization, false);
    if (errors.length) return { errors };

    let { exUser, p_userErrors } = await checkUserExistance(decoded._id, root.headers.authorization, true);
    if (p_userErrors.length) return { errors: p_userErrors };

    let decoded_VCode = decodeToken(args.verification_code, true);
    if (decoded_VCode.errors.length) return decoded_VCode;

    return await validate_email(decoded_VCode.decoded, exUser);
  },
};

const resendVerificationEmailMutation = {
  type: MessageType,

  async resolve(parent, args, root) {
    let { decoded, errors } = decodeToken(root.headers.authorization, false);
    if (errors.length) return { errors };

    return await send_verification_email(decoded, "email", false);
  },
};

module.exports = {
  Verify_Email: VerifyEmailMutation,
  resend_verification_email: resendVerificationEmailMutation,
};
