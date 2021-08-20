const express = require("express");
const graphqlHTTP = require("express-graphql");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const schema = require("./src/graphQL/schema");
const { auth_check } = require("./middleware/auth-check");
const bodyParser = require("body-parser");

require("./config/mongo");

const app = express();

app.use(helmet());

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(auth_check);

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.get("/", function (req, res) {
  res.send("test deploy");
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Application running at PORT 4000`);
});
