const express = require("express");
const LocalStrategy = require("passport-local").Strategy;

const router = require("express").Router();
const passport = require("../../config/passport");
const userController = require("../../controller/userController");
const User = require("../../models/users");
const { forwardAuthenticated } = require("../../config/auth");


// Matches with "/api/users"
//router.route("/").get(userController.findAll);
//router.route("/").post(userController.create);

router
  .route("/")
  //.get(userController.login)
  .post(userController.register);

router.route("/login").post(passport.authenticate("local"), (req, res) => {
  res.json(req.user);
}
);



// Matches with "/api/users/:id"
router
  .route("/:username")
  .get(userController.findOne)
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;
