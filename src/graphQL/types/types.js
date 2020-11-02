const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLID,
} = graphql;
// const ObjectId = require('mongodb').ObjectID

// MONGODB MODELS
const user = require("../../models/user");
const specialization = require("../../models/specialization");

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
      resolve(parent, args) {
        return user.findById(parent.owner_id);
      },
    },
  }),
});

const BranchType = new GraphQLObjectType({
  name: "Branch",
  fields: () => ({
    id: { type: GraphQLID },
    address: { type: GraphQLString },
  })
})

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    fullname: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    image: { type: GraphQLString },
    birthdate: { type: GraphQLString },
    password: { type: GraphQLString },
    role: { type: GraphQLString },
    token: { type: GraphQLString },
    specialization: {
      type: SpecializationType,
      resolve(parent, args) {
        return specialization.findById(parent.specialization_id);
      },
    },
  }),
});

const RoleType = new GraphQLObjectType({
  name: "Role",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  }),
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
  BranchType_CRUD
};
