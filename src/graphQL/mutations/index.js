const Register = require("./auth/register");
const { Verify_Email, Resend_Verification_Email } = require("./auth/verify_email");
const Login = require("./auth/login");
const Logout = require("./auth/logout");
const { Forget_Password_Request,Change_Password, Update_Password } = require("./auth/forget_password");
const { Create_Clinic } = require("./create/craete_clinic");
const { Create_Branch } = require("./create/create_branch");
const { Create_Member } = require("./create/create_member");
const { Create_Patient } = require("./create/create_patient");
const { Create_Booking } = require("./create/create_booking");

module.exports = {
  Register,
  Verify_Email,
  Resend_Verification_Email,
  Login,
  Logout,
  Forget_Password_Request,
  Change_Password,
  Update_Password,
  Create_Clinic,
  Create_Branch,
  Create_Member,
  Create_Patient,
  Create_Booking
};
