// const router = require("express").Router();
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

// router
//   .route("/")
//   .post(upload.single("file"), (req, res) => {
//     console.log(req.body)
//     console.log(req.file)
//     res.send("uploaded succesfully");
//   });

// module.exports = router;