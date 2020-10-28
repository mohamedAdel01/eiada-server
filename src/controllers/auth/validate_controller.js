// MONGODB MODELS
const User = require("../../models/user");
const Email_Verification = require("../../models/email_verify");
const { mail } = require("../../../config/nodemail");
const jwt = require("jsonwebtoken");
const ObjectId = require("mongodb").ObjectID;

const validate_email = async (verification) => {
  let errors = [];

  let exUser = await User.findById(verification.user_id);

  if (exUser.email_verified) {
    errors.push({
      key: "Validation",
      message: "Email already verified",
    });
    return {
      errors,
    };
  }

  let exVerification = await Email_Verification.findOne({
    user_id: verification.user_id,
  });

  if (!exVerification || exVerification.code != verification.code) {
    errors.push({
      key: "Validation",
      message: "Expired code, We will resend you another one",
    });

    await send_verification_email(exUser);

    return {
      errors,
    };
  }

  await User.findOneAndUpdate(
    { _id: ObjectId(verification.user_id) },
    { email_verified: true }
  );
  await Email_Verification.findOneAndDelete({ user_id: verification.user_id });

  return {
    message: "Email verified successfully",
    errors: [],
  };
};

const send_verification_email = async (user) => {
  let exUser = await User.findById(user._id);

  if (exUser.email_verified) {
    return {
      message: "Email already verified",
      errors: [],
    };
  }

  await Email_Verification.findOneAndDelete({ user_id: user._id });

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

  return {
    message: "Please check your mail to verify mail",
    errors: [],
  };
};

module.exports = {
  validate_email,
  send_verification_email,
};
