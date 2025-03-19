const { default: mongoose } = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
    unique: true, // ensuring email is unique
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  userName: {
    type: String,
    required: false,
    unique: true, // userName must be unique
  },
  role: {
    type: String,
    required: false,
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
});

const providerUserModel = model("provider_user", userSchema);
module.exports = providerUserModel;
