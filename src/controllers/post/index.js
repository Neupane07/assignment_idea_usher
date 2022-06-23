const Post = require("../../models/post")

const getPosts = async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
}

module.exports = {
  getPosts
}