const {
  getPosts,
  addPost,
  editPost,
  deletePost,
  countPosts,
} = require("../../services/post");
const {
  getValidatePost,
  addValidatePost,
  deleteValidatePost,
  putValidatePost,
} = require("../../middleware/validation/post");
const multer = require("multer");
const { getImage } = require("../../config/s3");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.cwd());
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

let upload = multer({ storage: storage, limits: { fieldSize: 10 * 1024 * 1024 } });

const router = require("express").Router();
router
  .route("/")
  /**
   * @desc Get all the posts from db
   * @params query parameters are page and limit to paginate the results
   * @route GET /api/post
   **/
  .get(getValidatePost, (req, res) => {
    let page = 1,
      limit = 10,
      skip = 0;
    let regx = new RegExp(req.query.search ? req.query.search : "" + "$", "i");
    if (req.query.page) page = req.query.page;
    if (req.query.limit) limit = req.query.limit;
    skip = (page - 1) * limit;
    getPosts(
      { isDeleted: { $ne: true }, $or: [{ title: regx }] },
      parseInt(skip),
      parseInt(limit)
    )
      .then(async (result) => {
        let count = await countPosts({ isDeleted: false });
        res.status(200).send({
          status: true,
          message: result.length,
          data: result.length ? result : [],
          currentPage: page,
          totalPage: Math.ceil(count / limit),
          totalRecords: count,
        });
      })
      .catch(async (error) => {
        res.status(400).send({ status: false, message: error.message });
      });
  })
    /**
   * @desc Save a post to db after validating formData
   * @params Send form data title, description, image file and _tags, make sure _tags is 
   * an array of ids 
   * @route POST /api/post
   **/
  .post(upload.single("file"), addValidatePost, (req, res) => {
    addPost(req.body, req)
      .then(async (data) => {
        res
          .status(200)
          .send({ status: true, message: "Added Successfuly", data: null });
      })
      .catch(async (error) => {
        res.status(400).send({ status: false, message: error.message });
      });
  })
   /**
   * @desc Update a post by id
   * @params Pass id of post to update with formdata
   * @route PUT /api/post
   **/
  .put(putValidatePost, (req, res) => {
    editPost(req.body.postId, req.body)
      .then(async (data) => {
        res
          .status(200)
          .send({ status: true, message: "Updated Successfuly", data: null });
      })
      .catch(async (error) => {
        res.status(400).send({ status: false, message: error.message });
      });
  })
   /**
   * @desc Delete a post by id
   * @params Pass id of post to delete
   * @route DELETE /api/post
   **/
  .delete(deleteValidatePost, (req, res) => {
    deletePost(req.body.postId)
      .then(async (data) => {
        res
          .status(200)
          .send({ status: true, message: "Deleted Successfuly", data: null });
      })
      .catch(async (error) => {
        res.status(400).send({ status: false, message: error.message });
      });
  });

module.exports = router;
