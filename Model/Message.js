const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    sender: { type: String, enum: ["admin", "consumer"], required: true },
    text: { type: String, required: true },
      // userId links this message to a user (from your user collection)
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
