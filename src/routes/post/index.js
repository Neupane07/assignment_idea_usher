const { getPosts } = require("../../controllers/post");

const router = require("express").Router();


router.get("/", getPosts);

module.exports = router;
