const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Clinic = require("../models/clinic");
const Role = require("../models/role");
const Branch = require("../models/branch");
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
          key: codeType ? "Verification" : "Unautherized",
          message: codeType ? "Code not exist" : "Please login First",
        },
      ],
    };
  return jwt.verify(token, "secret", (err, decoded) => {
    if (err)
      return {
        errors: [
          {
            key: codeType ? "Verification" : "Unautherized",
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

const checkEmailExistance = async (email, required) => {
  let p_emailErrors = [];
  let exUser = await User.findOne({ email: email });

  if (required && !exUser) {
    p_emailErrors.push({
      key: "DB",
      message: "Email isn't exist",
    });
    return { p_emailErrors };
  } else if (!required && exUser) {
    p_emailErrors.push({
      key: "DB",
      message: "Email is already exist",
    });
    return { p_emailErrors };
  } else {
    return { exUser, p_emailErrors };
  }
};

const checkUserExistance = async (id, token, skipEmail) => {
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
    return { p_userErrors };
  }

  if (token && !skipEmail && !exUser.email_verified ) {
    p_userErrors.push({
      key: "Verification",
      message: "Please verify your email first",
    });
    return {
      p_userErrors,
    };
  }

  return { exUser, p_userErrors };
};

const checkPassword = async (entered, exist) => {
  let p_passwordErrors = [];
  const check = await bcrypt.compare(entered, exist);

  if (!check) {
    p_passwordErrors.push({
      key: "DB",
      message: "wrong password",
    });
    return {
      p_passwordErrors,
    };
  }

  return { p_passwordErrors };
};

const checkEmailVerification = async (userID, required) => {
  let p_emailErrors = [];

  let exUser = await User.findById(userID);

  if (!exUser) {
    p_emailErrors.push({
      key: "Verification",
      message: "can't find User",
    });
    return {
      p_emailErrors,
    };
  }

  if (!required && exUser.email_verified) {
    p_emailErrors.push({
      key: "Verification",
      message: "Email already verified",
    });
    return {
      p_emailErrors,
    };
  }

  if (required && !exUser.email_verified) {
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
      key: "Validation",
      message: "Expired code, We will resend you another one",
    });

    return { p_codeErrors };
  }

  return { p_codeErrors };
};

const checkClinicExist = async (required) => {
  let p_clinicErrors = [];
  let clinic = await Clinic.find();
  if (!required && clinic.length) {
    p_clinicErrors.push({
      key: "DB",
      message: "A clinic has been established before",
    });
  }

  if (required && !clinic.length) {
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
  checkBranchExist
};
