const jwt = require("jsonwebtoken");

const decodeToken = (token) => {
  if (!token)
    return {
      errors: [
        {
          key: "Unautherized",
          message: "Please login First",
        },
      ],
    };
  return jwt.verify(token, "secret", (err, decoded) => {
    if (err)
      return {
        errors: [
          {
            key: "Unautherized",
            message: "Your session is expired, Please login again",
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
