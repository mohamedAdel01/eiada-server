const graphql = require("graphql");
const { GraphQLInt } = graphql;

const { UsersQueryType } = require("../types/types");

const { decodeToken } = require("../../policies");
const { Read_User } = require("../../controllers/user");

const USERS = {
  Users: {
    type: UsersQueryType,

    args: {
      page: { type: GraphQLInt },
      limit: { type: GraphQLInt },
    },

    resolve(_, args, root) {
      let { decoded } = decodeToken(root.headers.authorization, true);

      return Read_User({ owner_id: decoded.owner_id }, args.page, args.limit);
    },
  },
};

module.exports = USERS;
