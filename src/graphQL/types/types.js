const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLBoolean,
  GraphQLFloat,
} = graphql;
// const ObjectId = require('mongodb').ObjectID

// MONGODB MODELS
const User = require("../../models/user");
const Patient = require("../../models/patient");

const MessageType = new GraphQLObjectType({
  name: "Validation",
  fields: () => ({
    message: { type: GraphQLString },
    errors: { type: new GraphQLNonNull(new GraphQLList(ErrorType)) },
  }),
});

const RegisterType = new GraphQLObjectType({
  name: "Register",
  fields: () => ({
    user: { type: UserType },
    clinic: { type: new GraphQLList(ClinicType) },
    branchs: { type: new GraphQLList(BranchType) },
    message: { type: GraphQLString },
    errors: { type: new GraphQLNonNull(new GraphQLList(ErrorType)) },
  }),
});

const ClinicType_CRUD = new GraphQLObjectType({
  name: "clinic_crud",
  fields: () => ({
    clinic: { type: ClinicType },
    message: { type: GraphQLString },
    errors: { type: new GraphQLNonNull(new GraphQLList(ErrorType)) },
  }),
});

const BranchType_CRUD = new GraphQLObjectType({
  name: "branch_crud",
  fields: () => ({
    branch: { type: BranchType },
    message: { type: GraphQLString },
    errors: { type: new GraphQLNonNull(new GraphQLList(ErrorType)) },
  }),
});

const PatientType_CRUD = new GraphQLObjectType({
  name: "patient_crud",
  fields: () => ({
    patient: { type: PatientType },
    message: { type: GraphQLString },
    errors: { type: new GraphQLNonNull(new GraphQLList(ErrorType)) },
  }),
});

const BookingType_CRUD = new GraphQLObjectType({
  name: "Booking_CRUD",
  fields: () => ({
    booking: { type: BookingType },
    message: { type: GraphQLString },
    errors: { type: new GraphQLNonNull(new GraphQLList(ErrorType)) },
  }),
});

const ClinicType = new GraphQLObjectType({
  name: "Clinic",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    owner_id: { type: GraphQLID },
    logo: { type: GraphQLString },
    theme_settings: { type: GraphQLString },
    owner: {
      type: UserType,
      resolve() {
        return User.findOne({ role: "admin" });
      },
    },
  }),
});

const BranchType = new GraphQLObjectType({
  name: "Branch",
  fields: () => ({
    id: { type: GraphQLID },
    address: { type: GraphQLString },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    fullname: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    email_verified: { type: GraphQLBoolean },
    image: { type: GraphQLString },
    birthdate: { type: GraphQLString },
    password: { type: GraphQLString },
    role: { type: GraphQLString },
    token: { type: GraphQLString },
    field: { type: GraphQLString },
    division: { type: GraphQLString },
  }),
});

const PatientType = new GraphQLObjectType({
  name: "Patient",
  fields: () => ({
    id: { type: GraphQLID },
    patient_name: { type: GraphQLString },
    patient_email: { type: GraphQLString },
    patient_phone: { type: GraphQLString },
    imageURL: { type: GraphQLString },
    birthdate: { type: GraphQLString },
    past_history: { type: new GraphQLList(GraphQLString) },
    sessions_history: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: "Sessions_History",
          fields: () => ({
            doctor_id: { type: GraphQLID },
            note: { type: GraphQLString },
          }),
        })
      ),
    },
  }),
});

const BookingType = new GraphQLObjectType({
  name: "Booking",
  fields: () => ({
    id: { type: GraphQLID },
    booking_date: { type: GraphQLString },
    day_bookings: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: "Day_Bookings",
          fields: () => ({
            doctor_id: { type: GraphQLID },
            doctor_bookings: {
              type: new GraphQLList(
                new GraphQLObjectType({
                  name: "Doctor_Bookings",
                  fields: () => ({
                    patient_phone: { type: GraphQLString },
                    start_time: { type: GraphQLString },
                    end_time: { type: GraphQLString },
                    patient: {
                      type: UserType,
                      resolve(parent) {
                        return Patient.findOne({
                          patient_phone: parent.patient_phone,
                        });
                      },
                    },
                  }),
                })
              ),
            },
          }),
        })
      ),
    },
  }),
});

const RoleType = new GraphQLObjectType({
  name: "Role",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    create: { type: new GraphQLList(GraphQLString) },
    read: { type: new GraphQLList(GraphQLString) },
    update: { type: new GraphQLList(GraphQLString) },
    delete: { type: new GraphQLList(GraphQLString) },
  }),
});

const RoleInputType = new GraphQLInputObjectType({
  name: "RoleInput",
  fields: {
    name: { type: GraphQLString },
    custom: { type: GraphQLBoolean },
    create: { type: new GraphQLList(GraphQLString) },
    read: { type: new GraphQLList(GraphQLString) },
    update: { type: new GraphQLList(GraphQLString) },
    delete: { type: new GraphQLList(GraphQLString) },
  },
});

const ServiceInputType = new GraphQLInputObjectType({
  name: "ServiceInput",
  fields: {
    description: { type: GraphQLString },
    continued: { type: GraphQLBoolean },
    cost: { type: GraphQLFloat },
  },
});

const PartialInputType = new GraphQLInputObjectType({
  name: "PartialInput",
  fields: {
    description: { type: GraphQLString },
    cost: { type: GraphQLFloat },
  },
});

const SpecializationType = new GraphQLObjectType({
  name: "Specialization",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  }),
});

const ErrorType = new GraphQLObjectType({
  name: "Error",
  fields: () => ({
    key: { type: GraphQLString },
    message: { type: GraphQLString },
  }),
});

module.exports = {
  RegisterType,
  ClinicType_CRUD,
  MessageType,
  ClinicType,
  UserType,
  RoleType,
  BranchType,
  BranchType_CRUD,
  RoleInputType,
  PatientType,
  PatientType_CRUD,
  BookingType,
  BookingType_CRUD,
  ServiceInputType,
  PartialInputType,
};
