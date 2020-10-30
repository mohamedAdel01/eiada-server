const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

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
      user: decoded.data,
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

const checkPassword = async (entered, exist) => {
  let passwordErrors = [];
  const check = await bcrypt.compare(entered, exist);

  if (!check) {
    passwordErrors.push({
      key: "DB",
      message: "wrong password",
    });
    return {
      passwordErrors,
    };
  }

  return { passwordErrors };
};

const checkEmailVerification = async (userID) => {
  let p_emailErrors = [];

  let exUser = await User.findById(userID);

  if (exUser.email_verified) {
    p_emailErrors.push({
      key: "Verification",
      message: "Email already verified",
    });
    return {
      p_emailErrors,
    };
  }

  return { userErrors };
};

module.exports = {
  generateToken,
  decodeToken,
  checkUserExistance,
  checkPassword,
  checkEmailVerification,
};
