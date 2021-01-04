const mongoose = require("mongoose");
//const message = require("./message");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const subGroupSchema = new Schema({
  name: { type: String, required: true },
  subgroups: { type: String, default: false },
  messages: {
    type: [messageSchema],
    default: undefined,
  },
});

const SubGroup = mongoose.model("subgroup", subGroupSchema);

module.exports = SubGroup;
