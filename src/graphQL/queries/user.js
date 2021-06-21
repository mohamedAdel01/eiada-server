const graphql = require("graphql");
const { GraphQLInt } = graphql;

// GRAPHQL TYPES
const { UsersQueryType } = require("../types/types");

// MONGODB MODELS
const userModel = require("../../models/user");

const USERS = {
  Users: {
    type: UsersQueryType,

    args: {
      page: { type: GraphQLInt },
      limit: { type: GraphQLInt },
    },

    resolve(parent, args) {
      let page = args.page ? args.page : 1;
      let limit = args.limit ? args.limit : 10;
      return {
        users: userModel
          .find({})
          .limit(parseInt(limit))
          .skip(parseInt(limit * (page - 1))),
        total: userModel.find().countDocuments(),
      };
    },
  },
};

module.exports = USERS;
