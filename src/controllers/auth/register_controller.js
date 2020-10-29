// MONGODB MODELS
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const { send_verification_email } = require("./validate_controller");
const { checkUserExistance } = require("../../policies");

const register_controller = async (args) => {
  let { errors } = await checkUserExistance(args.email, false);
  if (errors.length) return { errors };

  const hash = bcrypt.hashSync(args.password, 10);

  let userObj = new User({
    fullname: args.fullname,
    email: args.email,
    phone: args.phone,
    password: hash,
    role: "admin",
  });

  let NewUser = await userObj.save();

  const Token = jwt.sign(
    {
      data: NewUser,
    },
    "secret",
    {
      expiresIn: 60 * 1000,
    }
  );

  send_verification_email(NewUser, "email");

  return {
    token: Token,
    message: "Please check your mail to verify mail",
    user: NewUser,
    errors: [],
  };
};

module.exports = {
  register_controller,
};
