const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const endOfDay = require("date-fns/endOfDay");
const startOfDay = require("date-fns/startOfDay");
const parseISO = require("date-fns/parseISO");
const User = require("../models/user");
const Clinic = require("../models/clinic");
const Role = require("../models/role");
const Branch = require("../models/branch");
const Patient = require("../models/patient");
const Booking = require("../models/booking");
const Session = require("../models/session");
const Email_Verification = require("../models/email_verify");

const generateToken = (payload) => {
  return jwt.sign(
    {
      data: payload,
    },
    "secret",
    {
      expiresIn: 60 * 10000, // will update later
    }
  );
};

const decodeToken = (token, codeType) => {
  if (!token)
    return {
      errors: [
        {
          key: codeType ? "code" : "Unautherized",
          message: codeType ? "Code not exist" : "Please login First",
        },
      ],
    };
  return jwt.verify(token, "secret", (err, decoded) => {
    if (err)
      return {
        errors: [
          {
            key: codeType ? "code" : "Unautherized",
            message: codeType
              ? "Your Code is expired"
              : "Your session is expired",
          },
        ],
      };

    return {
      decoded: decoded.data,
      errors: [],
    };
  });
};

const checkEmailExistance = async (email, must_be_exist) => {
  let p_emailErrors = [];
  let exUser = await User.findOne({ email: email });

  if (must_be_exist && !exUser) {
    p_emailErrors.push({
      key: "autherization",
      message: "Email isn't exist",
    });
    return { p_emailErrors };
  } else if (!must_be_exist && exUser) {
    p_emailErrors.push({
      key: "autherization",
      message: "Email is already exist",
    });
    return { p_emailErrors };
  } else {
    return { exUser, p_emailErrors };
  }
};

const checkUserExistance = async (id, token, skipEmailVerification) => {
  let p_userErrors = [];
  let exUser = await User.findById(id);

  if (!exUser) {
    p_userErrors.push({
      key: "DB",
      message: "User isn't exist",
    });
    return { p_userErrors };
  }

  if (token && exUser.token != token) {
    p_userErrors.push({
      key: "Verfication",
      message: "Your session is expired, please login again",
    });
    return { p_userErrors, exUser };
  }

  if (token && !skipEmailVerification && !exUser.email_verified) {
    p_userErrors.push({
      key: "Verification",
      message: "Please verify your email first",
    });
    return {
      p_userErrors,
      exUser
    };
  }

  return { exUser, p_userErrors };
};

const checkPassword = async (entered, exist) => {
  let p_passwordErrors = [];
  const check = await bcrypt.compare(entered, exist);

  if (!check) {
    p_passwordErrors.push({
      key: "autherization",
      message: "Password isn't correct",
    });
    return {
      p_passwordErrors,
    };
  }

  return { p_passwordErrors };
};

const checkEmailVerification = async (userID, must_be_verified) => {
  let p_emailErrors = [];

  let exUser = await User.findById(userID);

  if (!exUser) {
    p_emailErrors.push({
      key: "Verification",
      message: "User isn't exist",
    });
    return {
      p_emailErrors,
    };
  }

  if (!must_be_verified && exUser.email_verified) {
    p_emailErrors.push({
      key: "Verification",
      message: "Email already verified",
    });
    return {
      p_emailErrors,
    };
  }

  if (must_be_verified && !exUser.email_verified) {
    p_emailErrors.push({
      key: "Verification",
      message: "Please verify your email first",
    });
    return {
      p_emailErrors,
    };
  }

  return { p_emailErrors };
};

const checkVerificationCode = async (decoded) => {
  let p_codeErrors = [];

  let exVerification = await Email_Verification.findOne({
    user_id: decoded.user_id,
  });

  if (!exVerification || exVerification.code != decoded.code) {
    p_codeErrors.push({
      key: "code",
      message:
        "Expired code, Please use last Email or resend new one and use it",
    });

    return { p_codeErrors };
  }

  return { p_codeErrors };
};

const checkClinicExist = async (must_be_exist) => {
  let p_clinicErrors = [];
  let clinic = await Clinic.find();
  if (!must_be_exist && clinic.length) {
    p_clinicErrors.push({
      key: "DB",
      message: "A clinic has been established before",
    });
  }

  if (must_be_exist && !clinic.length) {
    p_clinicErrors.push({
      key: "DB",
      message: "Please add Clinic first",
    });
  }

  return { p_clinicErrors };
};

const checkRoleExist = async (name) => {
  let p_roleErrors = [];

  let role = await Role.find({ name: name });
  if (role.length) {
    p_roleErrors.push({
      key: "DB",
      message: "A role name has been taken before",
    });
  }

  return { p_roleErrors };
};

const checkBranchExist = async (branch_id) => {
  let p_branchErrors = [];

  let branch = await Branch.findById(branch_id);
  if (!branch) {
    p_branchErrors.push({
      key: "DB",
      message: "Branch not exist",
    });
  }

  return { p_branchErrors };
};

const checkPatientPhoneExistance = async (patient_phone) => {
  let p_patientPhoneErrors = [];

  let patient = await Patient.findOne({ patient_phone: patient_phone });
  if (patient) {
    p_patientPhoneErrors.push({
      key: "DB",
      message: "Patient is already exist",
    });
  }

  return { p_patientPhoneErrors };
};

const checkBookingDate = async (args) => {
  let exDate = await Booking.findOne({
    booking_date: {
      $gte: startOfDay(parseISO(args.booking_date)),
      $lte: endOfDay(parseISO(args.booking_date)),
    },
  });

  if (!exDate) return { status: 1, exDate: null }; // date not exist

  let exDoctorBookings = exDate.day_bookings.filter(
    (booking) => booking.doctor_id == args.doctor_id
  );

  if (!exDoctorBookings.length) return { status: 2, exDate: exDate }; // date exist but doctor not exist

  let checkTimeTaken = exDoctorBookings[0].doctor_bookings.filter(
    (booking) =>
      (args.start_time >= booking.start_time &&
        args.start_time <= booking.end_time) ||
      (args.end_time >= booking.start_time && args.end_time <= booking.end_time)
  );

  if (!checkTimeTaken.length) return { status: 3, exDate: exDate }; // doctor exist but time is available

  return { status: 4, exDate: null }; // time is taken before
};

const checkSessionExist = async (session_id, checkArchived) => {
  let p_sessionErrors = [];

  let exSession = await Session.findById(session_id);
  if (!exSession) {
    p_sessionErrors.push({
      key: "DB",
      message: "session isn't exist",
    });
  }

  if (exSession && exSession.archived && checkArchived) {
    p_sessionErrors.push({
      key: "DB",
      message: "session is archived, you can't update it now",
    });
  }

  return { p_sessionErrors, exSession };
};

module.exports = {
  generateToken,
  decodeToken,
  checkEmailExistance,
  checkPassword,
  checkEmailVerification,
  checkVerificationCode,
  checkUserExistance,
  checkClinicExist,
  checkRoleExist,
  checkBranchExist,
  checkPatientPhoneExistance,
  checkBookingDate,
  checkSessionExist,
};
