const graphql = require("graphql");
const { GraphQLString } = graphql;
const { MessageType } = require("../../types/types");
const { validate } = require("../../../validations");
const { checkUserExistance, checkVerificationCode, decodeToken } = require("../../../policies");
const { send_verification_email, Delete_Verification } = require("../../../controllers/emails");
const { Update_Password } = require("../../../controllers/user");


const forgetPasswordRequestMutation = {
  type: MessageType,
  args: {
    email: { type: GraphQLString },
  },

  async resolve(parent, args) {
    let v_errors = validate(args);
    if (v_errors.length) return { errors: v_errors };

    let { exUser, p_userErrors } = await checkUserExistance(args.email, true);
    if (p_userErrors.length) return { errors: p_userErrors };

    return await send_verification_email(exUser, "password");
  },
};

const changePasswordMutation = {
  type: MessageType,
  args: {
    verification_code: { type: GraphQLString },
    new_password: { type: GraphQLString },
  },

  async resolve(_, args) {

    let { errors, decoded } = decodeToken(args.verification_code, true);
    if (errors.length) return { errors };

    let { exUser,p_userErrors } = await checkUserExistance(args.email, true);
    if (p_userErrors.length) return { errors: p_userErrors };
    
    let { p_codeErrors } = await checkVerificationCode(decoded, exUser);
    if (p_codeErrors.length) return { errors: p_codeErrors };

    await Update_Password(args.new_password, decoded.user_id)

    await Delete_Verification(decoded.user_id)

    return {
      message: "Password changed successfully successfully",
      errors: [],
    };
  },
};

module.exports = {
  forget_password_request: forgetPasswordRequestMutation,
  change_password: changePasswordMutation,
};
