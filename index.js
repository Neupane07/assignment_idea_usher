const express = require("express");
require("dotenv").config();
const connectDB = require("./src/config/db");
const { getImage } = require("./src/config/s3/index.js");
const { errorHandler } = require("./src/middleware/error");
const route = require("./src/routes/post");
connectDB();
const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());

app.get("/images/:key", function (req, res) {
  const key = req.params.key;
  const readStream = getImage(key);

  readStream.pipe(res);
});

app.use("/api", route);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is active on port ${PORT}`);
});
