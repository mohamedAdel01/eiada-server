const Register = require("./auth/register");
const { Verify_Email, resend_verification_email } = require("./auth/verify_email");
const Login = require("./auth/login");
const Logout = require("./auth/logout");
const { forget_password_request,change_password } = require("./auth/forget_password");
// const Create_Clinic = require("./create/Create_Clinic");

module.exports = {
  Register,
  Verify_Email,
  resend_verification_email,
  Login,
  Logout,
  forget_password_request,
  change_password,
  // Create_Clinic,
};
