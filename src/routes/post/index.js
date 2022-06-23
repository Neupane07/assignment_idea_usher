const postController = require("../../controllers/post");
const tagController = require("../../controllers/tag");

const router = require("express").Router();

router.use("/post", postController);
router.use("/tag", tagController);

module.exports = router;
