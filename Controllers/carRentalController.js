const CarRentals = require("../Model/CarRentModel");

const addRentalInfo = async (req, res) => {
  const {
    VehicleRegistrationNo,
    name,
    model,
    price,
    type,
    transmission,
    fuelType,
    seats,
    features,
    carLocation,
    imageUrl,
    addedBy,
    ownerEmail,
    carStatus,
    rentMessage,
    requestingTime,
    requesterEmail,
    requesterName,
    requesterPhone,
    requesterUserName,

    // requesterLocation,
    // createdAt,
    // updatedAt
  } = req.body;

  //todo: Check if the vehicle already exists
  //   const existingCar = await CarRentals.findOne({ VehicleRegistrationNo });
  //   if (existingCar) {
  //     return res.status(400).json({ message: "Vehicle already exists" });
  //   }

  // Create a new car rental entry
  const newCarRental = new CarRentals({
    VehicleRegistrationNo,
    name,
    model,
    price,
    type,
    transmission,
    fuelType,
    seats,
    features,
    carLocation,
    imageUrl,
    addedBy,
    ownerEmail,
    carStatus,
    rentMessage,
    requestingTime,
    requesterEmail,
    requesterName,
    requesterPhone,
    requesterUserName,
  });

  await newCarRental.save();

  res
    .status(201)
    .json({ message: "Car rental added successfully", newCarRental });
};

module.exports = { addRentalInfo };
