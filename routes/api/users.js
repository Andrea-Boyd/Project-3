const express = require('express');

const router = require("express").Router();
//const bcrypt = require('bcryptjs');
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






router.get("/", forwardAuthenticated, (req, res) => res.render("login"));

router.get("/signup", forwardAuthenticated, (req, res) => res.render("signup"));

router.post("./signup", (req, res) => {
    const { first_name, last_name, email, password, password2 } = req.body;
    let errors = [];

    if (!first_name || !last_name || !email || !password || !password ) {
        errors.push({ msg: "Please enter all fields"})
    }
})


module.exports = router;
