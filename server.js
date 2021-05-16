const express = require("express");
const connectDB = require("./config/db");

const app = express();
const dotenv = require("dotenv");

app.use(express.json());

dotenv.config();

connectDB();

app.listen(5000, () => {
  console.log("Server running on PORT 5000");
});
