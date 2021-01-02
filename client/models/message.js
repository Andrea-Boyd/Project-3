const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const message = new Schema({
    name: { type: String, requiured: true },
    text: { type: String, required: true},
    date: { type: Date, default: Date.now }
});

const Message = mongoose.model("message", message);

module.exports = Message;