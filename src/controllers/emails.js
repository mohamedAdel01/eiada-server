const { Update_Email_Verify } = require("../controllers/user");
const Email_Verification = require("../models/email_verify");
const { mail } = require("../../config/nodemail");
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
      let { p_emailErrors } = await checkEmailVerification(user._id, false);
      if (p_emailErrors.length) return { errors: p_emailErrors };
    }

    await Delete_Verification(user._id);
  }

  let verification = await Create_Verification(user._id);

  const verification_code = generateToken(verification);

  mail(
    user.email,
    verificationEmails[emailType].title,
    verificationEmails[emailType].message,
    verification_code
  );

  return {
    message: verificationEmails[emailType].resMSG,
    errors: [],
  };
};

const validate_email = async (verification, exUser) => {
  let { p_emailErrors } = await checkEmailVerification(
    verification.user_id,
    false
  );
  if (p_emailErrors.length) return { errors: p_emailErrors };

  let { p_codeErrors } = await checkVerificationCode(verification);

  if (p_codeErrors.length) {
    await send_verification_email(exUser, "password", false);
    return { errors: p_codeErrors };
  }

  await Update_Email_Verify(verification.user_id);

  await Delete_Verification(exUser._id);

  return {
    message: "Email verified successfully",
    errors: [],
  };
};

const Delete_Verification = async (user_id) => {
  return await Email_Verification.findOneAndDelete({
    user_id: ObjectId(user_id),
  });
};

const Create_Verification = async (user_id) => {
  let verificationObj = new Email_Verification({
    user_id: user_id,
    code: Math.floor(Math.random() * Math.pow(10, 6)),
  });

  return await verificationObj.save();
};

module.exports = {
  send_verification_email,
  validate_email,
  Delete_Verification,
};
