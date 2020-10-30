const bcrypt = require("bcrypt");
const ObjectId = require("mongodb").ObjectID;
const graphql = require("graphql");
const { GraphQLString } = graphql;
const Email_Verification = require("../../../models/email_verify");
const User = require("../../../models/user");
const {
  send_verification_email,
} = require("../../../controllers/auth/validate_controller");

// GRAPHQL TYPES
const { MessageType } = require("../../types/types");
const { decodeToken } = require("../../../policies");
const {
  forgetPasswordRequest,
} = require("../../../controllers/auth/forget_password_controller");

const forgetPasswordRequestMutation = {
  type: MessageType,
  args: {
    email: { type: GraphQLString },
  },

  async resolve(parent, args, root) {
    return await forgetPasswordRequest(args.email);
  },
};

const changePasswordMutation = {
  type: MessageType,
  args: {
    verification_code: { type: GraphQLString },
    new_password: { type: GraphQLString },
  },

  async resolve(_, args) {
    let all_errors = [];

    let { errors, user } = decodeToken(args.verification_code, true);
    if (errors.length) return { errors };

    let exVerification = await Email_Verification.findOne({
      user_id: user.user_id,
    });

    if (!exVerification || exVerification.code != user.code) {
      all_errors.push({
        key: "Validation",
        message: "Expired code, We will resend you another one",
      });

      let exUser = await User.findById(user.user_id);
      await send_verification_email(exUser, "password");

      return {
        errors: all_errors,
      };
    }

    const new_password = bcrypt.hashSync(args.new_password, 10);

    await User.findOneAndUpdate(
      { _id: ObjectId(user.user_id) },
      { password: new_password }
    );
    await Email_Verification.findOneAndDelete({ user_id: user.user_id });

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
