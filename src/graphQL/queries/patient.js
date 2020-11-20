const graphql = require("graphql");
const { GraphQLList, GraphQLString } = graphql;
const { PatientType_CRUD, PatientType } = require("../types/types");
const Patient = require("../../models/patient");

const { validate } = require("../../validations");
const { decodeToken, checkUserExistance } = require("../../policies");

const PatientsQueries = {
  Patients: {
    type: new GraphQLList(PatientType),
    resolve() {
      return Patient.find({});
    },
  },

  Patient: {
    type: PatientType_CRUD,
    args: {
      patient_phone: { type: GraphQLString },
    },
    async resolve(parent, args, root) {
      let v_errors = validate(args);
      if (v_errors.length) return { errors: v_errors };

      let { decoded, errors } = decodeToken(root.headers.authorization, false);
      if (errors.length) return { errors };

      let { p_userErrors } = await checkUserExistance(
        decoded._id,
        root.headers.authorization,
        false
      );
      if (p_userErrors.length) return { errors: p_userErrors };

      let patient = await Patient.findOne({
        patient_phone: { "$regex": args.patient_phone, "$options": "i" },
      });
      return {
        patient: patient,
        errors: [],
      };
    },
  },
};

module.exports = PatientsQueries;
