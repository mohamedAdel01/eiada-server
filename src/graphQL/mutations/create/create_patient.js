const graphql = require("graphql");
const { GraphQLString, GraphQLNonNull } = graphql;

const { Create_Patient } = require("../../../controllers/patient");

const { MessageType } = require("../../types/types");
const { validate } = require("../../../validations");
const { checkPatientExistance } = require("../../../policies");

const createPatientMutation = {
  type: MessageType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    patient_phone: { type: new GraphQLNonNull(GraphQLString) },
    patient_email: { type: GraphQLString },
    imageURL: { type: GraphQLString },
  },

  async resolve(parent, args, root) {
    let v_errors = validate(args);
    if (v_errors.length) return { errors: v_errors };

    let { p_patientErrors } = await checkPatientExistance(
      args.patient_phone,
      false
    );
    if (p_patientErrors.length) return { errors: p_patientErrors };

    await Create_Patient(args);

    return {
      message: "New Patient has been added successfully",
      errors: [],
    };
  },
};

module.exports = {
  Create_Patient: createPatientMutation,
};
