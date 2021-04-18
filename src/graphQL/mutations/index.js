const { REGISTER } = require("./auth/register");
const {
  VERIFY_EMAIL,
  RESEND_VERIFICATION_EMAIL,
} = require("./auth/verify_email");
const LOGIN = require("./auth/login");
const Logout = require("./auth/logout");
const {
  FORGET_PASSWORD_REQUREST,
  CHANGE_PASSWORD,
  Update_Password,
} = require("./auth/forget_password");
const { CREATE_CLINIC } = require("./create/create_clinic");
const { CREATE_BRANCHES } = require("./create/create_branch");
const { CREATE_USER } = require("./create/create_user");
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
  CHANGE_PASSWORD,
  Update_Password,
  CREATE_CLINIC,
  CREATE_BRANCHES,
  CREATE_USER,
  Create_Patient,
  Create_Booking,
  Create_Session,
  Update_During_Session,
  Update_After_Session,
};
