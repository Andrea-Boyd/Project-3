const mongoose = require("mongoose");
const message = require("./message");


const subGroupSchema = new Schema({
    name: { type: String, required: true },
    subgroups: {type: String, default: false},
    messages: {
        type: [message],
        default: undefined
        
    }
})

const SubGroup = mongoose.model("subgroup", subGroupSchema);

module.exports = SubGroup;

