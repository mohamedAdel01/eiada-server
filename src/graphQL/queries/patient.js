const graphql = require("graphql");
const { GraphQLList, GraphQLString } = graphql;

// GRAPHQL TYPES
const { PatientType } = require("../types/types");

// MONGODB MODELS
const Patient = require("../../models/patient");

const PatientsQueries = {
  Patients: {
    type: new GraphQLList(PatientType),
    resolve() {
      return Patient.find({});
    },
  },

  Patient: {
    type: PatientType,
    args: {
        patient_phone: {type: GraphQLString}
    },
    resolve() {
      return Patient.find({});
    },
  },
};

module.exports = PatientsQueries;
