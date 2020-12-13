const graphql = require("graphql");
const { GraphQLString, GraphQLNonNull } = graphql;

const { send_verification_email, Delete_Verification } = require("../../../controllers/emails");
const { Update_Password } = require("../../../controllers/user");

const { MessageType } = require("../../types/types");
const { validate } = require("../../../validations");
const { checkEmailExistance,checkUserExistance, checkVerificationCode, decodeToken, checkPassword } = require("../../../policies");

const ForgetPasswordRequestMutation = {
  type: MessageType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
  },

  async resolve(parent, args) {
    let v_errors = validate(args);
    if (v_errors.length) return { errors: v_errors };

    let { exUser, p_emailErrors } = await checkEmailExistance(args.email, true);
    if (p_emailErrors.length) return { errors: p_emailErrors };

    return await send_verification_email(exUser, "password");
  },
};

const ChangePasswordMutation = {
  type: MessageType,
  args: {
    verification_code: { type: new GraphQLNonNull(GraphQLString) },
    new_password: { type: new GraphQLNonNull(GraphQLString) },
  },

  async resolve(parent, args) {

    let { errors, decoded } = decodeToken(args.verification_code, true);
    if (errors.length) return { errors };

    let { exUser,p_userErrors } = await checkUserExistance(decoded.user_id);
    if (p_userErrors.length) return { errors: p_userErrors };

    let { p_codeErrors } = await checkVerificationCode(decoded, exUser);
    if (p_codeErrors.length) return { errors: p_codeErrors };

    await Update_Password(args.new_password, decoded.user_id)

    await Delete_Verification(decoded.user_id)

    return {
      message: "Password changed successfully",
      errors: [],
    };
  },
};

const UpdatePasswordMutation = {
  type: MessageType,
  args: {
    old_password: { type: new GraphQLNonNull(GraphQLString) },
    new_password: { type: new GraphQLNonNull(GraphQLString) },
  },

  async resolve(parent, args, root) {

    let { decoded, errors } = decodeToken(root.headers.authorization, false);
    if (errors.length) return { errors };

    let { exUser,p_userErrors } = await checkUserExistance(decoded._id);
    if (p_userErrors.length) return { errors: p_userErrors };
    
    let { p_passwordErrors } = await checkPassword(args.old_password, exUser.password);
    if (p_passwordErrors.length) return { errors: p_passwordErrors };

    await Update_Password(args.new_password, exUser._id)

    return {
      message: "Password changed successfully",
      errors: [],
    };
  },
};

module.exports = {
  FORGET_PASSWORD_REQUREST: ForgetPasswordRequestMutation,
  CHANGE_PASSWORD: ChangePasswordMutation,
  Update_Password: UpdatePasswordMutation,
};
