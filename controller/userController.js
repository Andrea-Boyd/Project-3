const db = require("../models");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

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
    db.User.findOneAndUpdate(
      { username: req.params.username },
      { $push: { groups: req.body } }
    )
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  addSubGroup: function (req, res) {
    let userID = mongoose.Types.ObjectId(req.params.id);
    let groupID = mongoose.Types.ObjectId(req.body._id);
    let name = req.body.name;
    db.User.findOneAndUpdate(
      { _id: userID },
      { $push: { subgroups: { name: name, _id: groupID } } }
    )
      .then((dbModel) => res.json(dbModel))
      .catch((err) => console.log(err));
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
      // Creates the hashedpasswords
      const hashedPassword = await bcrypt.hashSync(req.body.password, 10);
      db.User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      }).then((userData) => {
        res.send(userData);
      });
    } catch (err) {
      res.send(err);
    }
  },

  session: function (req, res, next) {
    console.log("===== user!! =====");
    if (req.session) {
      res.json({ user: req.session });
    } else {
      res.redirect("/login");
    }
  },
};
