const graphql = require("graphql");
const { GraphQLInt } = graphql;

const { UsersQueryType } = require("../types/types");

const userModel = require("../../models/user");

const { decodeToken } = require("../../policies");

const USERS = {
  Users: {
    type: UsersQueryType,

    args: {
      page: { type: GraphQLInt },
      limit: { type: GraphQLInt },
    },

    resolve(_, args, root) {
      let { decoded } = decodeToken(root.headers.authorization, true);

      let page = args.page ? args.page : 1;
      let limit = args.limit ? args.limit : 10;
      return {
        users: userModel
          .find({ owner_id: decoded.owner_id })
          .limit(parseInt(limit))
          .skip(parseInt(limit * (page - 1))),
        total: userModel.find().countDocuments(),
      };
    },
  },
};

module.exports = USERS;
