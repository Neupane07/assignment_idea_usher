const { getTags, addTag, editTag, deleteTag } = require("../../services/tag");

const router = require("express").Router();

router
  .route("/")
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
