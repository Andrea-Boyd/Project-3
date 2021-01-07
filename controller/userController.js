const db = require("../models");
const bcrypt = require("bcryptjs")


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
  create: function (req, res) {
    db.User.create(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    db.User.findOneAndUpdate({ _id: req.params.id }, req.body)
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
    try {
        // creates the hashedpasswords
        const hashedpasswords = await bcrypt.hash(req.body.password, 10)
        db.User.create({
            first_name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        .then(userData => {
            res.send({ user: userData.id, message: "Welcome!" })
        })
    } catch (err) {
        res.send(err)
    }
},

login: (req, res) => {
  db.User.findOne({
      where: {
          email: req.body.email
      }

  }).then(async function (userData) {
      if (!userData) {
          res.send({ user: false, message: "No user with that email"  })
          return
      }

      if (await bcrypt.compare(req.body.password, userData.password)) {
          res.send({ user: userData.id, message: "Welcome Back" })

      }else {
          res.send({ user: false, message: "Password Incorrect"})
      }


  }).catch(err => {
      res.send(err)
      console.log("We caught an error")
  })
}

};
