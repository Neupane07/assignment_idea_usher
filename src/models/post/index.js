const { Schema, model, Types } = require('mongoose');

const tagSchema = new Schema({
  type: Types.ObjectId
})

const postSchema = new Schema({
  title: String, 
  desc: String, 
  image: String,
  tags: {
    type: [tagSchema],
    default: []
  }
})

const Post = model('Post', postSchema);
module.exports = Post;