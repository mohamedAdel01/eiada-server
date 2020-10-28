// MONGODB MODELS
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const login_controller = async (args) => {
  let errors = [];
  let exUser = await User.findOne({ email: args.email });

  if (!exUser) {
    errors.push({
      key: "DB",
      message: "User isn't exist",
    });
    return {
      errors: errors,
    };
  }

  const check_password = await bcrypt.compare(args.password, exUser.password);

  if (!check_password) {
    errors.push({
      key: "DB",
      message: "wrong password",
    });
    return {
      errors: errors,
    };
  }

  const Token = jwt.sign(
    {
      data: exUser,
    },
    "secret",
    { expiresIn: "12h" }
  );

  return {
    token: Token,
    user: exUser,
    errors: [],
  };
};

module.exports = {
  login_controller,
};
