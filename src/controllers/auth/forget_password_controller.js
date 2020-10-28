const User = require("../../../models/user");

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

  return {
    message: "Please check your email to continue",
    errors: [],
  };
};

module.exports = {
  changePasswordRequest,
};
