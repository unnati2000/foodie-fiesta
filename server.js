const express = require("express");
const app = express();
const dotenv = require("dotenv");

app.use(express.json());
dotenv.config();

app.listen(5000, () => {
  console.log("Server running on PORT 5000");
});
