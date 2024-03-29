"use strict";
require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mohamed7adel96@gmail.com",
    pass: "GMAmohade18",
  },
  tls: {
    rejectUnauthorized: false,
  },
  // host: "smtp.mailtrap.io",
  // port: 2525,
  // auth: {
  //   user: "211ff1b5e4fe25",
  //   pass: "04f4899bd85f0e",
  // },
});

let mail = (to, subject, code, emailType) => {
  transporter.sendMail({
    from: "mohamed7adel96@gmail.com",
    to: to,
    subject: subject,
    html: `
      <div style="background: #fafafa; border-radius: 10px; padding: 20px; margin: 20px 10px">
        <div style="margin-bottom: 30px">
          <h1 style="font-size: 20px">Welcome in Eiada</h1>
          ${
            emailType === "email"
              ? '<p style="font-size: 14px">We are very happy you will join our team</p>'
              : ""
          }
         
        </div>
        <a href="http://localhost:3000/auth/${
          emailType === "email" ? "verify-email" : "change-password"
        }/?verification_code=${code}">Click here to ${
      emailType === "email" ? "Verify Email" : "Reset Password"
    }</a>
        <p>
          Or copy this link in your browser to verify Email:
          <span style="margin: 0 10px; color: #24b6de"> http://localhost:3000/auth/${
            emailType === "email" ? "verify-email" : "change-password"
          }/?verification_code=${code} </span>
        </p>
      </div>`,
  });
};

module.exports = {
  mail,
};
