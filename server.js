const express = require("express");
const graphqlHttp = require("express-graphql").graphqlHTTP;
const dotenv = require("dotenv");
const graphQlSchema = require("./graphql/schema/index");
const graphQlResolver = require("./graphql/resolvers/index");
const isAuth = require("./middleware/is-auth");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

app.use(cors());

app.use(express.json());

dotenv.config();

connectDB();

app.use(isAuth);

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolver,
    graphiql: true,
  })
);

app.listen(5000, () => {
  console.log("Server running on PORT 5000");
});
