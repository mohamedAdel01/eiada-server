const express = require("express");
const graphqlHTTP = require("express-graphql");
const cors = require("cors");
const helmet = require('helmet');
require("dotenv").config();
const schema = require("./src/graphQL/schema");

require("./config/mongo");

const app = express();

app.use(helmet());

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Application running at PORT 4000`);
});
