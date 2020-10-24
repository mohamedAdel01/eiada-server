// MONGODB MODELS
const User = require("../models/user");
const Email_Verification = require("../models/email_verify");
const { mail } = require("../../config/nodemail");
const jwt = require("jsonwebtoken");
const ObjectId = require('mongodb').ObjectID

const validate_email = async (verification) => {
  let errors = [];

  let exUser = await User.findById(verification.user_id);

  if (exUser.email_verified) {
    return {
      message: "Email already verified",
      errors: [],
    };
  }

  let exVerification = await Email_Verification.findOne({
    user_id: verification.user_id,
  });

  if (exVerification.code != verification.code) {
    errors.push({
      key: "DB",
      message: "Wrong code",
    });
    return {
      errors,
    };
  }

  await User.findOneAndUpdate({_id: ObjectId(verification.user_id)}, { email_verified: true });
  await Email_Verification.findOneAndDelete({user_id: verification.user_id});

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
      expiresIn: 60 * 1000,
    }
  );

  mail(
    user.email,
    "Email verification",
    `Press here to Verify your email and this code is available for 10min: ${verification_code}`
  );
};

module.exports = {
  validate_email,
  send_mail,
};
