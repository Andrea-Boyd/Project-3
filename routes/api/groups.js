const router = require("express").Router();
const groupController = require("../../controller/groupController");

router.route("/addUser/").put(groupController.invite);

router
  .route("/subgroup/:subGroupName")
  .post(groupController.createSubGroup)
  .put(groupController.addSubGroup);

router
  .route("/:groupName")
  .post(groupController.create)
  .get(groupController.findOne)
  .put(groupController.update)
  .delete(groupController.remove);

router.route("/addUser").put(groupController.invite);

module.exports = router;
