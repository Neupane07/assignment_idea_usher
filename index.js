const express = require("express");
require("dotenv").config();
const connectDB = require("./src/config/db");
const { getImage } = require("./src/config/s3/index.js");
const { errorHandler } = require("./src/middleware/error");
const route = require("./src/routes/post");
connectDB();
const PORT = process.env.PORT || 8000;
// const multer = require("multer");

// let storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./public");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + "-" + Date.now());
//   },
// });

// let upload = multer({ storage: storage });

const app = express();
app.use(express.json());


app.get('/images/:key', function(req, res) {
  console.log(getImage)
  const key = req.params.key;
  console.log(key);

  const readStream = getImage(key);


  readStream.pipe(res);
})

app.use("/api", route);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is active on port ${PORT}`);
});
