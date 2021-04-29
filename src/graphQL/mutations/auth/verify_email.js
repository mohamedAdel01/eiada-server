const graphql = require("graphql");
const { GraphQLString, GraphQLNonNull } = graphql;

const {
  validate_email,
  send_verification_email,
} = require("../../../controllers/emails");

const { MessageType, RegisterType } = require("../../types/types");
const { decodeToken, checkUserExistance } = require("../../../policies");

const VERIFY_EMAIL = {
  type: RegisterType,
  args: {
    verification_code: { type: new GraphQLNonNull(GraphQLString) },
  },

  async resolve(_, args) {
    let decoded_VCode = decodeToken(args.verification_code, true);
    if (decoded_VCode.errors.length) return decoded_VCode;

    let { exUser, p_userErrors } = await checkUserExistance(
      decoded_VCode.decoded.user_id
    );
    if (p_userErrors.length) return { errors: p_userErrors };

    return await validate_email(decoded_VCode.decoded, exUser);
  },
};

const RESEND_VERIFICATION_EMAIL = {
  type: MessageType,

  async resolve(parent, args, root) {
    let { decoded, errors } = decodeToken(root.headers.authorization, false);
    if (errors.length) return { errors };

    return await send_verification_email(decoded, "email", false);
  },
};

module.exports = {
  VERIFY_EMAIL,
  RESEND_VERIFICATION_EMAIL,
};
