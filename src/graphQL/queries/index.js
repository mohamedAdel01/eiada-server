// GRAPHQL QUERIES
const { Clinics } = require("./clinic");
const { Users } = require("./user");
const BOOKINGS = require("./booking");
const { Branches } = require("./branch");
const { Patient } = require("./patient");
const { Roles } = require("./role");

module.exports = {
  BOOKINGS,
  BRANCHES: Branches,
  ROLES: Roles,
  CLINICS: Clinics,
  USERS: Users,
  Patient: Patient,
};
