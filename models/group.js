const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: { type: String, required: true },
    subgroups: {default: false},


})




const Group = mongoose.model("group", groupSchema);


module.exports = Group;

