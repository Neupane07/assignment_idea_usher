const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./src/config/db");
const { errorHandler } = require("./src/middleware/error");

connectDB();

const PORT = process.env.PORT || 8000;

const app = express();

app.use("/api/posts", require("./src/routes/post"))

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is active on port ${PORT}`);
});
