const postController = require("../../controllers/post");
const tagController = require("../../controllers/tag");
// const uploadController = require("../../controllers/upload");

const router = require("express").Router();

router.use("/post", postController);
router.use("/tag", tagController);
// router.use("/upload", uploadController);

module.exports = router;