const { Schema, model, Types } = require("mongoose");

const tagSchema = new Schema(
  {
    name: {
      type: Types.ObjectId,
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
