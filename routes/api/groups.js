const router = require("express").Router();
const groupController = require("../../controller/groupController");

//router.route("/").get(groupController.findAll).post(groupController.create);
router.route("/addUser/").put(groupController.invite);

router
  .route("/:groupName")
  .post(groupController.create)
  .get(groupController.findOne)
  .put(groupController.update)
  .delete(groupController.remove);

module.exports = router;
