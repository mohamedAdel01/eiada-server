const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
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

const checkUserExistance = async (email, required) => {
  let p_userErrors = [];
  let exUser = await User.findOne({ email: email });

  if (required && !exUser) {
    p_userErrors.push({
      key: "DB",
      message: "User isn't exist",
    });
    return { p_userErrors };
  } else if (!required && exUser) {
    p_userErrors.push({
      key: "DB",
      message: "User is already exist",
    });
    return { p_userErrors };
  } else {
    return { exUser, p_userErrors };
  }
};

const checkUserExistanceByID = async (id) => {
  let p_userErrors = [];
  let exUser = await User.findById(id);

  if (!exUser) {
    p_userErrors.push({
      key: "DB",
      message: "User isn't exist",
    });
    return { p_userErrors };
  } else {
    return { exUser, p_userErrors };
  }
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

const checkEmailVerification = async (userID) => {
  let p_emailErrors = [];

  let exUser = await User.findById(userID);

  if(!exUser) {
    p_emailErrors.push({
      key: "Verification",
      message: "Expired or Wrong code",
    });
    return {
      p_emailErrors,
    };
  }

  if (exUser.email_verified) {
    p_emailErrors.push({
      key: "Verification",
      message: "Email already verified",
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

module.exports = {
  generateToken,
  decodeToken,
  checkUserExistance,
  checkPassword,
  checkEmailVerification,
  checkVerificationCode,
  checkUserExistanceByID
};
