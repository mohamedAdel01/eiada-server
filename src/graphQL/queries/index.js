// GRAPHQL QUERIES
const { Clinics } = require("./clinic");
const { Users } = require("./user");
const { Branches } = require("./branch");
const { Patient } = require("./patient");
const { Roles } = require("./role");

module.exports = {
  BRANCHES: Branches,
  ROLES: Roles,
  clinics: Clinics,
  users: Users,
  Patient: Patient,
};
