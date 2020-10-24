const jwt = require("jsonwebtoken");

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
            message: codeType ? "Your Code is expired" : "Your session is expired",
          },
        ],
      };

    return {
      user: decoded.data,
      errors: [],
    };
  });
};

module.exports = {
  decodeToken,
};
