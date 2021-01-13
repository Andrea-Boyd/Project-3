const router = require("express").Router();
const groupController = require("../../controller/groupController");

//router.route("/").get(groupController.findAll).post(groupController.create);
<<<<<<< HEAD
router.route("/addUser/").put(groupController.invite);
=======
router
  .route("/subgroup/:subGroupName")
  .post(groupController.createSubGroup)
  // .get(groupController.findOneSubGroup)
  // .put(groupController.updateSubGroup)
  // .delete(groupController.removeSubGroup);
>>>>>>> main

router
  .route("/:groupName")
  .post(groupController.create)
  .get(groupController.findOne)
  .put(groupController.update)
  .delete(groupController.remove);

<<<<<<< HEAD
=======

router 
  .route("/addUser")
  .put(groupController.invite);


>>>>>>> main
module.exports = router;
