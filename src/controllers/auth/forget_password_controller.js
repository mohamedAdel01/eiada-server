const User = require("../../../models/user");
const { send_verification_email } = require("./validate_controller");

const changePasswordRequest = async (email) => {
  let errors = [];
  let exUser = await User.findOne({ email: email });

  if (!exUser) {
    errors.push({
      key: "DB",
      message: "User isn't exist",
    });
    return {
      errors: errors,
    };
  }

  return await send_verification_email(exUser, 'password')
};

module.exports = {
  changePasswordRequest,
};
