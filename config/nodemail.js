"use strict";
const nodemailer = require("nodemailer");

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "mohamed7adel96@gmail.com",
      pass: "GMAmohade18"
    },
    tls: {
        rejectUnauthorized: false
    }
  });

  module.exports = {
    transporter
  }

//   transporter.sendMail({
//     from: 'mohamed7adel96@gmail.com', // sender address
//     to: "mohamed7adel96@gmail.com", // list of receivers
//     subject: "رسالة من ابلكيشن عيادة", // Subject line
//     text: "احنا هنا ف الابلكيشن بنقولك ان احنا بنحبك اوي اوي و انتي اهم حاجه ف حياتنا.. ربنا يخليكي لينا يا قلبي ♥♥♥", // plain text body
//   });

