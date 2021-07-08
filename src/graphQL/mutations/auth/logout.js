const { Update_User_Auth_Data } = require("../../../controllers/user");

const { MessageType } = require("../../types/types");
const { checkEmailExistance, decodeToken } = require("../../../policies");

const LoginMutation = {
  type: MessageType,

  async resolve(_, args, root) {
    let { errors, decoded } = decodeToken(root.headers.authorization, true);
    if (errors.length) return { errors };

    let { p_emailErrors } = await checkEmailExistance(decoded.email, true);
    if (p_emailErrors.length) return { errors: p_emailErrors };

    updatedUser = await Update_User_Auth_Data(decoded._id, ["token", null]);

    return {
      message: "Logged out successfully",
      errors: [],
    };
  },
};

module.exports = LoginMutation;
