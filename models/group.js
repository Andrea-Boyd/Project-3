const mongoose = require("mongoose");
const message = require("./message");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: { type: String, required: true },
    subgroups: {type: String, default: false},
    messages: {
        type: [message],
        default: undefined
        
    }


})




const Group = mongoose.model("group", groupSchema);


module.exports = Group;

