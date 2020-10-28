const jwt = require("jsonwebtoken");
const User = require("../models/user");

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
  let errors = [];
  let exUser = await User.findOne({ email: email });

  if (required && !exUser) {
    errors.push({
      key: "DB",
      message: "User isn't exist",
    });
    return {
      errors: errors,
    };
  } else if (!required && exUser) {
    errors.push({
      key: "DB",
      message: "User is already exist",
    });
    return {
      errors: errors,
    };
  } else {
    return { errors: [] };
  }
};

module.exports = {
  decodeToken,
  checkUserExistance,
};
