// GRAPHQL QUERIES
const { Clinics } = require("./clinic");
const { Users } = require("./user");
const { Branches } = require("./branch");
const { Patient } = require("./patient");

module.exports = {
  BRANCHES: Branches,
  clinics: Clinics,
  users: Users,
  Patient: Patient,
};
