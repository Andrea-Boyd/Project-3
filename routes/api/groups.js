const router = require("express").Router();
const groupController = require("../../controller/groupController");

//router.route("/").get(groupController.findAll).post(groupController.create);
router
  .route("/subgroup/:subGroupName")
  .post(groupController.createSubGroup)
  // .get(groupController.findOneSubGroup)
  // .put(groupController.updateSubGroup)
  // .delete(groupController.removeSubGroup);

router
  .route("/:groupName")
  .post(groupController.create)
  .get(groupController.findOne)
  .put(groupController.update)
  .delete(groupController.remove);


router 
  .route("/addUser")
  .put(groupController.invite);


module.exports = router;
