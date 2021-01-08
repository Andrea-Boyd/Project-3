const express = require("express");
const LocalStrategy = require("passport-local").Strategy;

const router = require("express").Router();
const bcrypt = require("bcryptjs");
const groupController = require("../../../controller/groupController");
const Group = require("../../../models/group");
const { forwardAuthenticated } = require("../../../config/auth");

// Matches with "/api/users"
//router.route("/").get(userController.findAll);
//router.route("/").post(userController.create);

router
  .route("/")
  //.get(userController.login)
  .post(groupController.create);

  

// Matches with "/api/users/:id"
router
  .route("/:id")
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;
