const Session = require("../models/session");

const Create_Session = async (args, creator_id) => {
  let sessionObj = new Session({
    specialization_id: args.specialization_id,
    doctor_id: args.doctor_id,
    patient_phone: args.patient_phone,
    creator_id: creator_id,
    status: args.status,
  });

  let NewSession = await sessionObj.save();

  return {
    session: NewSession,
    message: "Session created successfully",
    errors: [],
  };
};

module.exports = {
  Create_Session,
};
