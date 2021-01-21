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
    // console.log(req.params.username);
    // console.log("Find one function");
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
    //console.log(req.body);
    db.User.update(
      { username: req.params.username },
      { $push: { groups: req.body } }
    )
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  addSubGroup: function (req, res) {
    // console.log("Add Subgroup to User");
    // console.log(req.params);
    let userID = mongoose.Types.ObjectId(req.params.id);
    // console.log(req.body);
    let groupID = mongoose.Types.ObjectId(req.body._id);
    // console.log(groupID);
    // console.log(typeof userID);
    // console.log(userID);
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

      //console.log(hashedPassword);
      db.User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      }).then((userData) => {
        //console.log("Then");
        res.send(userData);
      });
    } catch (err) {
      res.send(err);
    }
  },

  session: function (req, res, next) {
    console.log("===== user!! =====");
    //console.log(req.session);
    if (req.session) {
      res.json({ user: req.session });
    } else {
      res.redirect("/login");
    }
  },
};
