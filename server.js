const express = require("express");
const graphqlHttp = require("express-graphql").graphqlHTTP;
const graphQlSchema = require("./graphql/schema/index");
const connectDB = require("./config/db");

const app = express();
const dotenv = require("dotenv");

app.use(express.json());

dotenv.config();

connectDB();

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: "",
    graphiql: true,
  })
);

app.listen(5000, () => {
  console.log("Server running on PORT 5000");
});
