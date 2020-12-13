const REGISTER = require("./auth/register");
const { VERIFY_EMAIL, RESEND_VERIFICATION_EMAIL } = require("./auth/verify_email");
const LOGIN = require("./auth/login");
const Logout = require("./auth/logout");
const { FORGET_PASSWORD_REQUREST,Change_Password, Update_Password } = require("./auth/forget_password");
const { Create_Clinic } = require("./create/craete_clinic");
const { Create_Branch } = require("./create/create_branch");
const { Create_Member } = require("./create/create_member");
const { Create_Patient } = require("./create/create_patient");
const { Create_Booking } = require("./create/create_booking");
const { Create_Session } = require("./create/create_session");
const { Update_During_Session } = require("./update/update_during_session");
const { Update_After_Session } = require("./update/update_after_session");

module.exports = {
  REGISTER,
  VERIFY_EMAIL,
  RESEND_VERIFICATION_EMAIL,
  LOGIN,
  Logout,
  FORGET_PASSWORD_REQUREST,
  Change_Password,
  Update_Password,
  Create_Clinic,
  Create_Branch,
  Create_Member,
  Create_Patient,
  Create_Booking,
  Create_Session,
  Update_During_Session,
  Update_After_Session
};
