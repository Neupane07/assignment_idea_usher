const { Schema, model, Types } = require("mongoose");

const tagSchema = new Schema(
  {
    name: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const TAG = model("Tag", tagSchema);
module.exports = TAG;
