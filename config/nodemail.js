"use strict";
require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  // service: "gmail",
  // auth: {
  //   user: "mohamed7adel96@gmail.com",
  //   pass: "Gmail_password",
  // },
  // tls: {
  //   rejectUnauthorized: false,
  // },
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "f2d2aa803e210c",
    pass: "c1b679cc60b0ce",
  },
});

let mail = (to, subject, text) => {
  transporter.sendMail({
    from: "mohamed7adel96@gmail.com",
    to: to,
    subject: subject,
    text: text,
  });
};

module.exports = {
  mail,
};
