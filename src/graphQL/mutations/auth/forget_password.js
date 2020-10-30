const graphql = require("graphql");
const { GraphQLString } = graphql;
const { MessageType } = require("../../types/types");
const { validate } = require("../../../validations");
const { checkUserExistance, decodeToken } = require("../../../policies");
const { send_verification_email } = require("../../../controllers/emails");

const bcrypt = require("bcrypt");
const ObjectId = require("mongodb").ObjectID;
const Email_Verification = require("../../../models/email_verify");
const User = require("../../../models/user");

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

// const changePasswordMutation = {
//   type: MessageType,
//   args: {
//     verification_code: { type: GraphQLString },
//     new_password: { type: GraphQLString },
//   },

//   async resolve(_, args) {
//     let all_errors = [];

//     let { errors, user } = decodeToken(args.verification_code, true);
//     if (errors.length) return { errors };

//     let exVerification = await Email_Verification.findOne({
//       user_id: user.user_id,
//     });

//     if (!exVerification || exVerification.code != user.code) {
//       all_errors.push({
//         key: "Validation",
//         message: "Expired code, We will resend you another one",
//       });

//       let exUser = await User.findById(user.user_id);
//       await send_verification_email(exUser, "password");

//       return {
//         errors: all_errors,
//       };
//     }

//     const new_password = bcrypt.hashSync(args.new_password, 10);

//     await User.findOneAndUpdate(
//       { _id: ObjectId(user.user_id) },
//       { password: new_password }
//     );
//     await Email_Verification.findOneAndDelete({ user_id: user.user_id });

//     return {
//       message: "Password changed successfully successfully",
//       errors: [],
//     };
//   },
// };

module.exports = {
  forget_password_request: forgetPasswordRequestMutation,
  // change_password: changePasswordMutation,
};
