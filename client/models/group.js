const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: { type: String, required: true },
    subgroups: {default: false},


})


const subGroupSchema = new Schema({
    name: { type: String, required: true },

})

const Group = mongoose.model("group", message);
const SubGroup = mongoose.model("subgroup", message);


module.exports = Group;
module.exports = SubGroup;

