// GRAPHQL QUERIES
const { Clinics } = require("./clinic");
const { Users } = require("./user");

module.exports = {
  clinics: Clinics,
  users: Users,
};
