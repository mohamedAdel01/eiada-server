const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");

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
  let userErrors = [];
  let exUser = await User.findOne({ email: email });

  if (required && !exUser) {
    userErrors.push({
      key: "DB",
      message: "User isn't exist",
    });
    return {
      userErrors,
    };
  } else if (!required && exUser) {
    userErrors.push({
      key: "DB",
      message: "User is already exist",
    });
    return {
      userErrors,
    };
  } else {
    return { exUser, userErrors };
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

const checkEmailVerified = async (userID) => {
  let userErrors = [];

  let exUser = await User.findById(userID);

  if (exUser.email_verified) {
    userErrors.push({
      key: "Validation",
      message: "Email already verified",
    });
    return {
      userErrors,
    };
  }

  return { userErrors };
};

module.exports = {
  decodeToken,
  checkUserExistance,
  checkPassword,
  checkEmailVerified,
};
