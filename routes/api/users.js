const express = require('express');
const LocalStrategy = require("passport-local").Strategy

const router = require("express").Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const userController = require("../../controller/userController");
const User = require("../../models/users");
const { forwardAuthenticated } = require("../../config/auth");


// Matches with "/api/users"
router.route("/").get(userController.findAll)
router.route("/").post(userController.create);



// Matches with "/api/users/:id"
router
  .route("/:id")
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);




passport.use(new LocalStrategy(
  function(email, password, done) {
    User.findOne({ email: email}, function(err, user) {
      if (err) { return done(err); }

      if (!user) {
        return done(null, false, { message: "Incorret email"})
      }


      if (!user.validPassword(password)) {
        return done(null, false, { message: "Incorrect password."});

      }
      return done(null , user)
    })
  }
))


module.exports = router;
