const db = require("../models");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  findAll: function (req, res) {
    db.Group.find(req.query)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Group.findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findOne: function (req, res) {
    //console.log(req.params);
    // console.log("Find one Group function");
    db.Group.findOne({ name: req.params.groupName })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    console.log("Group create funciton");
    console.log(req.body);
    let inviteCode = uuidv4();

    db.Group.create({
      name: req.params.groupName,
      messages: [
        {
          name: "admin",
          text: "Send your first message now",
          date: Date.now(),
        },
      ],
      inviteCode: inviteCode,
      groupMembers: req.body,
    })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  createSubGroup: function (req, res) {
    console.log("createSubGroup Function");
    console.log(req.params.subGroupName);
    console.log(req.body);
    db.Group.create({
      name: req.params.subGroupName,
      isSubGroup: true,
      groupMembers: req.body,
      messages: [
        {
          name: "admin",
          text: "Send your first message now",
          date: Date.now(),
        },
      ],
    })
      .then((dbModel) => {
        console.log("Then");
        console.log(dbModel);
        res.json(dbModel);
      })
      .catch((err) => res.status(422).json(err));
  },

  // findOneSubGroup: function (req, res) {
  //   //console.log(req.params);
  //   // console.log("Find one Group function");
  //   db.Group.findOne({ name: req.params.subGroupName })
  //     .then((dbModel) => res.json(dbModel))
  //     .catch((err) => res.status(422).json(err));
  // },

  // updateSubGroup: function (req, res) {
  //   // console.log("findOneAndUpdate");
  //   // console.log(req.body);
  //   db.Group.update(
  //     { name: req.params.subGroupName },
  //     { $push: { messages: req.body } }
  //   )
  //     .then((dbModel) => res.json(dbModel))
  //     .catch((err) => res.status(422).json(err));
  // },

  update: function (req, res) {
    // console.log("findOneAndUpdate");
    // console.log(req.body);
    db.Group.update(
      { name: req.params.groupName },
      { $push: { messages: req.body } }
    )
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Group.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  invite: function (req, res) {
    console.log(req.body);
    db.Group.findOneAndUpdate(
      { inviteCode: req.body.inviteCode },
      { $push: { groupMembers: { name: req.body.name, _id: req.body._id } } }
    )
      .then((dbModel) => {
        res.json(dbModel);
      })
      .catch((err) => res.status(422).json(err));
  },
};
