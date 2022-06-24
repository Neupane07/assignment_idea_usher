const { Schema, model, Types } = require("mongoose");

const postSchema = new Schema(
  {
    title: String,
    description: String,
    image: String,
    _tag: [
      {
        type: String,
        ref: "Tag",
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const POST = model("Post", postSchema);
module.exports = POST;
