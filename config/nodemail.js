"use strict";
const nodemailer = require("nodemailer");

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "mohamed7adel96@gmail.com",
      pass: "GMAmohade18"
    },
    tls: {
        rejectUnauthorized: false
    }
  });

  let mail = (to, subject, text) => {
      transporter.sendMail({
        from: 'mohamed7adel96@gmail.com',
        to: to,
        subject: subject,
        text: text
      });
  }


  module.exports = {
    mail
  }
