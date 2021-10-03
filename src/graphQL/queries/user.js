const graphql = require("graphql");
const { GraphQLInt, GraphQLString } = graphql;

const { UsersQueryType } = require("../types/types");

const { decodeToken } = require("../../policies");
const { Read_User } = require("../../controllers/user");
const role = require("../../models/role");

const USERS = {
  Users: {
    type: UsersQueryType,

    args: {
      role: { type: GraphQLString },
      page: { type: GraphQLInt },
      limit: { type: GraphQLInt },
    },

    resolve(_, args, root) {
      let { decoded } = decodeToken(root.headers.authorization, true);
      let filter = {
        owner_id: decoded.owner_id,
      };
      if (args.role) filter["role"] = args.role;

      return Read_User(filter, args.page, args.limit);
    },
  },
};

module.exports = USERS;
