const mongoose = require("mongoose");
//const Message = require("./message");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, required: true },
});

const groupMembersSchema = new Schema({
  name: { type: String, required: true },
});

const groupSchema = new Schema({
  name: { type: String, required: true },
  subgroups: { type: String, default: false },
  isSubgroup: { type: Boolean, default: false },
  messages: {
    type: [messageSchema],
  },
  groupMembers: {
    type: [groupMembersSchema],
  },
});

const Group = mongoose.model("group", groupSchema);

module.exports = Group;
