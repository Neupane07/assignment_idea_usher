const POST = require("../../models/post");
const fs = require("fs");
const util = require("util");
const { s3 } = require("../../config/s3");

const unlinkFile = util.promisify(fs.unlink);

exports.addPost = async (postData = {}, req = {}) => {
  let { title, description, _tag } = postData;
  _tag = JSON.parse(_tag);


  console.log('********************', req.file)

  const key = Date.now().toString();
  const blob = fs.readFileSync(req.file.path);

  await s3
    .upload({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: blob,
      ACL: "private",
    })
    .promise();

  await unlinkFile(req.file.path);

  const imageUrl =
    req.protocol + "://" + req.get("host") + "/images/" + key;

  return POST.create({
    title,
    description,
    _tag,
    image: imageUrl,
  });
};

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
