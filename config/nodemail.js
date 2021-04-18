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

let mail = (to, subject, text, code) => {
  transporter.sendMail({
    from: "mohamed7adel96@gmail.com",
    to: to,
    subject: subject,
    text: text,
    html: `
    <a href=http://localhost:3000/verify-email?${code}">Verify Email</a>
    <p>this code incase of you face any problem: ${code}</p>`,
  });
};

module.exports = {
  mail,
};
