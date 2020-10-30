const Register = require("./auth/register");
const { Verify_Email, resend_verification_email } = require("./auth/verify_email");
const Login = require("./auth/login");
// const Create_Clinic = require("./create/Create_Clinic");
// const resend_verification_email = require("./auth/resend_verification_email");
// const {
//   forget_password_request,
//   change_password,
// } = require("./auth/forget_password");

module.exports = {
  Register,
  Verify_Email,
  resend_verification_email,
  Login,
  // Create_Clinic,
  // resend_verification_email,
  // forget_password_request,
  // change_password,
};
