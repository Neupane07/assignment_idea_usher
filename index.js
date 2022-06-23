const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./src/config/db");
const { errorHandler } = require("./src/middleware/error");
const route = require("./src/routes/post");
connectDB();
const multer = require("multer");
const multerS3 = require("multer-s3");
const uuid = require("uuid").v4;
const path = require("path");
const s3 = require("./src/config/s3");

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET_NAME,
    key: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${uuid()}${ext}`)
    } 
  }),
});
const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", route);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is active on port ${PORT}`);
});
