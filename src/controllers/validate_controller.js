// MONGODB MODELS
const User = require("../models/user");
const Email_Verification = require("../models/email_verify");
const { mail } = require("../../config/nodemail");
const jwt = require("jsonwebtoken");

const validate_email = async (user) => {
  let errors = [];
  let checkCode = await Email_Verification.findById(user.user_id).$where(
    this.code == user.code
  );

  console.log(checkCode);

  if (!checkCode) {
    errors.push({
      key: "DB",
      message: "Wrong code",
    });
    return {
      errors,
    };
  }

  await User.findOneAndUpdate(user._id, { email_verified: true });

  return {
    message: "Email verified successfully",
    errors: [],
  };
};

const send_mail = async (user) => {
  let verificationObj = new Email_Verification({
    user_id: user._id,
    code: Math.floor(Math.random() * 60),
  });

  let verfication = await verificationObj.save();

  const verification_code = jwt.sign(
    {
      data: verfication,
    },
    "secret",
    {
      expiresIn: 60 * 10,
    }
  );

  mail(
    NewUser.email,
    "Email verification",
    `Press here to Verify your email and this code is available for 10min: ${verification_code}`
  );
};

module.exports = {
  validate_email,
  send_mail,
};
