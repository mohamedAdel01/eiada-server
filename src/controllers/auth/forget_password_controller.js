const { send_verification_email } = require("./validate_controller");
const { checkUserExistance } = require("../../policies");

const changePasswordRequest = async (email) => {
  let { exUser, userErrors } = await checkUserExistance(email, true);
  if (userErrors.length) return { errors: userErrors };

  return await send_verification_email(exUser, "password");
};

module.exports = {
  changePasswordRequest,
};
