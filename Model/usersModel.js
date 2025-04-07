const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    // enum: ["consumer", "provider"],
  },
  nid: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  emergencyContact: {
    type: String,
    required: false,
  },
  vehicleDetails: {
    type: String,
    required: false,
  },
  vehicleModel: {
    type: String,
    required: false,
  },
  vehicleType: {
    type: String,
    required: false,
  },
  hasCar: {
    type: Boolean,
    required: false,
  },
  carUsage: {
    type: String,
    required: false,
    // enum: ["drive", "rent"],
  },
  drivingLicense: {
    type: String,
    required: false,
  },
  status : {
    type: String,
    enum : ['locked', "unlocked"]
  }
});

const usersModel = model("users", userSchema);
module.exports = usersModel;
