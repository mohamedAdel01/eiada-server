// MONGODB MODELS
const User = require("../models/user");
const Email_Verification = require("../models/email_verify");
const { mail } = require("../../config/nodemail");
const jwt = require("jsonwebtoken");
const ObjectId = require("mongodb").ObjectID;
const {
  checkEmailVerification,
  checkVerificationCode,
  generateToken,
} = require("../policies");

const verificationEmails = {
  email: {
    title: "Email verification",
    message:
      "Press here to Verify your email and this code is available for 10min",
    resMSG: "Please check your Email to verify email",
  },
  password: {
    title: "Reset password",
    message:
      "Press here to reset your password and this code is available for 10min",
    resMSG: "Please check your Email to continue",
  },
};

const send_verification_email = async (user, emailType, newUser) => {
  if (!newUser) {
    if (emailType == "email") {
      let { p_emailErrors } = await checkEmailVerification(
        verification.user_id
      );
      if (p_emailErrors.length) return { errors: p_emailErrors };
    }

    await Email_Verification.findOneAndDelete({ user_id: user._id });
  }

  let verificationObj = new Email_Verification({
    user_id: user._id,
    code: Math.floor(Math.random() * Math.pow(10, 6)),
  });

  let verification = await verificationObj.save();

  const verification_code = generateToken(verification);

  mail(
    user.email,
    verificationEmails[emailType].title,
    `${verificationEmails[emailType].message}: ${verification_code}`
  );

  return {
    message: verificationEmails[emailType].resMSG,
    errors: [],
  };
};

const validate_email = async (verification) => {
  let { p_emailErrors } = await checkEmailVerification(verification.user_id);
  if (p_emailErrors.length) return { errors: p_emailErrors };

  let { p_codeErrors } = await checkVerificationCode(verification);
  if (p_codeErrors.length) return { errors: p_codeErrors };

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

module.exports = {
  send_verification_email,
  validate_email,
};