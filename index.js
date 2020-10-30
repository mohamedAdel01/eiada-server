const express = require("express");
const graphqlHTTP = require("express-graphql");
const cors = require("cors");
require("dotenv").config();
const schema = require("./src/graphQL/schema");

require("./config/mongo");

const app = express();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

// require('./config/dummy')
// require('./config/nodemail')

app.listen(process.env.PORT || 4000, () => {
  console.log("welcome again nodejs");
});
