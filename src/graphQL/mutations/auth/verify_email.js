const graphql = require("graphql");
const { GraphQLString } = graphql;

const { decodeToken } = require("../../../policies");
const { MessageType } = require("../../types/types");
const { validate_email } = require("../../../controllers/validate_controller");

const VerifyMailMutation = {
  type: MessageType,
  args: {
    verification_code: {
      type: GraphQLString,
    }
  },
  async resolve(parent, args, root) {
    let decoded = decodeToken(root.headers.authorization);
    if (decoded.errors.length) return decoded;

    return await validate_email(decoded.user);
  },
};

module.exports = VerifyMailMutation;
