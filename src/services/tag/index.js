const TAG = require("../../models/tag");

exports.addTag = async (payload = {}) => TAG.create(payload);

exports.getTags = async (search = {}) =>
  TAG.find(search).sort({ _id: -1 }).lean().exec();

exports.editTag = async (id, update = {}) =>
  TAG.findByIdAndUpdate(id, update, { new: true }).lean().exec();

exports.deleteTag = async (id) =>
  TAG.findOneAndUpdate({ _id: id }, { $set: { isDeleted: true } })
    .lean()
    .exec();
