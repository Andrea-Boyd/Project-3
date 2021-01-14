const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const groupObjectSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, ref: "group" },
  name: { type: String, required: true },
});

const userSchema = new Schema({
  first_name: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, "is invalid"],
    index: true,
  },
  last_name: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, "is invalid"],
    index: true,
  },
  username: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, "is invalid"],
    unique: true,
    index: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, "is invalid"],
    unique: true,
    index: true,
  },
  password: { type: String, required: true },
  groups: {
    type: [groupObjectSchema],
  },
  subgroups: {
    type: [groupObjectSchema],
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
