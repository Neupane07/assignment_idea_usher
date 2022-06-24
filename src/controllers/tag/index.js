const { getTags, addTag, editTag, deleteTag } = require("../../services/tag");

const router = require("express").Router();

router
  .route("/")
   /**
   * @desc Get all the tags from db
   * @params
   * @route GET /api/tag
   **/
  .get((req, res) => {
    getTags({ isDeleted: { $ne: true } })
      .then(async (data) => {
        res
          .status(200)
          .send({ status: true, message: "Fetch Successfuly", data });
      })
      .catch(async (error) => {
        res.status(400).send({ status: false, message: error.message });
      });
  })
   /**
   * @desc Save a tag to db
   * @params 
   * @route POST /api/tag
   **/
  .post((req, res) => {
    addTag(req.body)
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
   * @desc Update a post
   * @params tag id
   * @route PUT /api/tag
   **/
  .put((req, res) => {
    editTag(req.body._id, req.body)
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
   * @desc Delete a tag from db
   * @params tag id
   * @route DELETE /api/tag
   **/
  .delete((req, res) => {
    deleteTag(req.body._id)
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
