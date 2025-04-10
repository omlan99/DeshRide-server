const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    VehicleRegistrationNo: {
      type: String,
      required: true,
      unique: false,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    type: {
      type: String,
      required: true,
      enum: ["Sedan", "SUV", "Truck", "Sports", "Luxury"],
    },
    transmission: {
      type: String,
      required: true,
      enum: ["Automatic", "Manual"],
    },
    fuelType: {
      type: String,
      required: true,
      enum: ["Gasoline", "Diesel", "Electric", "Hybrid"],
    },
    seats: {
      type: Number,
      required: true,
      min: 2,
      max: 8,
    },
    features: {
      type: [String],
      required: true,
    },
    // Add this to your carSchema
    // carLocation: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
    imageUrl: {
      type: String,
      required: true,
    },
    addedBy: {
      // New field for owner name
      type: String,
      required: true,
    },
    ownerEmail: {
      // New field for owner email
      type: String,
      required: true,
    },
    carStatus: {
      type: String,
      required: true,
      enum: ["Pending", "Approved", "Rejected"], // Add any other statuses you need
      default: "Pending",
    },
    rentMessage: {
      type: String,
      require: false,
    },
    requestingTime: {
      type: Date,
      default: Date.now,
    },
    requesterEmail: {
      type: String,
      required: true,
    },
    requesterName: {
      type: String,
      required: true,
    },
    requesterPhone: {
      type: String,
      required: true,
    },
    requesterUserName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const CarRents = mongoose.model("Car_Rents", carSchema);
module.exports = CarRents;
