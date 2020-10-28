const Login = require("./auth/login");
const Register = require("./auth/register");
const Create_Clinic = require("./create/Create_Clinic");
const Verify_Email = require("./auth/verify_email");
const resend_verification_email = require("./auth/resend_verification_email");

module.exports = {
  Login,
  Register,
  Create_Clinic,
  Verify_Email,
  resend_verification_email,
};
