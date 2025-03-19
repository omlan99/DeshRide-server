const { default: mongoose } = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true, // fullName is required
  },
  email: {
    type: String,
    required: true, // email is required
    unique: true, // ensuring email is unique
  },
  phoneNumber: {
    type: String,
    required: true, // phoneNumber is required
  },
  userName: {
    type: String,
    required: true, // userName is required
    unique: true, // userName must be unique
  },
  role: {
    type: String,
    required: true, // role is required
    // enum: ["consumer", "provider"],
  },
});

const consumerUserModel = model("consumer_user", userSchema); // Naming the model as "User"
module.exports = consumerUserModel;
