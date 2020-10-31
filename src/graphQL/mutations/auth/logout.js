const graphql = require("graphql");
const { GraphQLString } = graphql;

const { Update_Auth_Token } = require("../../../controllers/user");

const { MessageType } = require("../../types/types");
const { checkEmailExistance, decodeToken } = require("../../../policies");

const LoginMutation = {
  type: MessageType,

  async resolve(parent, args, root) {
    let { errors, decoded } = decodeToken(root.headers.authorization, true);
    if (errors.length) return { errors };

    let { exUser, p_emailErrors } = await checkEmailExistance(decoded.email,true);
    if (p_emailErrors.length) return { errors: p_emailErrors };

    updatedUser = await Update_Auth_Token(decoded._id, null);

    return {
      message: "Logged out successfully",
      errors: [],
    };
  },
};

module.exports = LoginMutation;
