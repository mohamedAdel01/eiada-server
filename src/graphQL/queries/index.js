// GRAPHQL QUERIES
const { Clinics } = require("./clinic");
const { Users } = require("./user");
const { Patient } = require("./patient");

module.exports = {
  clinics: Clinics,
  users: Users,
  Patient: Patient
};
