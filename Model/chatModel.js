const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  chatId: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
});

const chatModel = model("chats", userSchema);
module.exports = chatModel;
