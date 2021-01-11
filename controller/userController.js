const db = require("../models");
const bcrypt = require("bcrypt");

// Defining methods for the userController
module.exports = {
  findAll: function (req, res) {
    db.User.find(req.query)
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.User.findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findOne: function (req, res) {
    console.log(req.params);
    console.log("Find one function");
    db.User.findOne({ username: req.params.username })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    db.User.create(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  updateGroup: function (req, res) {
    console.log("Update Group Function");
    console.log(req.body);
    db.User.update(
      { username: req.params.username },
      { $push: { groups: req.body } }
    )
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.User.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  register: async function (req, res) {
    console.log(req.body);
    try {
      // creates the hashedpasswords
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      console.log(hashedPassword);
      db.User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      }).then((userData) => {
        console.log("Then");
        res.send(userData);
      });
    } catch (err) {
      res.send(err);
    }
  },

  login: (req, res) => {
    console.log("test");
    db.User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then(async function (userData) {
        if (!userData) {
          res.send({ user: false, message: "No user with that email" });
          return;
        }

        if (await bcrypt.compare(req.body.password, userData.password)) {
          passport.authenticate("local", {
            successRedirect: "/group",
            failureRedirect: "/",
          });
          res.send({ user: userData.id, message: "Welcome Back" });
        } else {
          res.send({ user: false, message: "Password Incorrect" });
        }
      })
      .catch((err) => {
        res.send(err);
        console.log("We caught an error");
      });
  },
};
