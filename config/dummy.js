// const Eiada = require('../src/models/eiada')
// const Patient = require('../src/models/patient')
// const Service = require('../src/models/service')
// const ServiceDetails = require('../src/models/serviceDetails')
// const Session = require('../src/models/session')
// const Specialization = require('../src/models/specialization')
// const Subscription = require('../src/models/subscription')
// const User = require('../src/models/user')
const Role = require("../src/models/role");
const Specialization = require("../src/models/specialization");

// dummy data -------------------------
let roles = [
  {
    name: "admin",
    custom: true,
    create: [],
    read: [],
    update: [],
    delete: [],
  },
  {
    name: "doctor",
    custom: false,
    create: [],
    read: [],
    update: [],
    delete: [],
  },
  {
    name: "secretary",
    custom: false,
    create: [],
    read: [],
    update: [],
    delete: [],
  },
];

// let specializations = ["Dentistry", "Pediatrics"];

roles.forEach((role) => {
  let roleObj = new Role(role);
  roleObj.save();
});

// specializations.forEach((spec) => {
//   let specObj = new Specialization({ name: spec });
//   specObj.save();
// });
