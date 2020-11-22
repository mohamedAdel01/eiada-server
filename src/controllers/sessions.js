const Session = require("../models/session");
const ObjectId = require("mongodb").ObjectID;

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

const Update_During_Session = async (args) => {
  let updatedSession = await Session.findOneAndUpdate(
    { _id: ObjectId(args.session_id) },
    {
      chief_complaint: args.chief_complaint,
      session_summary: args.session_summary,
      services: args.services,
      partials: args.partials,
    },
    { new: true }
  );

  return {
    session: updatedSession,
    message: "Session updated successfully",
    errors: [],
  };
};

module.exports = {
  Create_Session,
  Update_During_Session,
};
