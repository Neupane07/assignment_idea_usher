const POST = require("../../models/post");

exports.addPost = async (payload = {}) => POST.create(payload);

exports.getPosts = async (search = {}, skip, limit) =>
  POST.find(search)
    .sort({ _id: -1 })
    .populate("_tag")
    .skip(skip)
    .limit(limit)
    .lean()
    .exec();

exports.editPost = async (id, update = {}) =>
  POST.findByIdAndUpdate(id, update, { new: true }).lean().exec();

exports.deletePost = async (id) =>
  POST.findOneAndUpdate({ _id: id }, { $set: { isDelete: true } })
    .lean()
    .exec();

exports.countPosts = (search = {}) =>
  new Promise((resolve, reject) => {
    POST.countDocuments(search).then(resolve).catch(reject);
  });
