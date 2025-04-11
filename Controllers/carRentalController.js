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
    dateRange,
    rentStatus,

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
    dateRange,
    rentStatus,
  });

  await newCarRental.save();

  res
    .status(201)
    .json({ message: "Car rental added successfully", newCarRental });
};

// path -> [/car-rental/get-car-rentals]
const getRentalsByUser = async (req, res) => {
  const { ownerEmail } = req.params;
  // console.log(ownerEmail);

  // Fetch rentals from the database
  const rentals = await CarRentals.find({ ownerEmail });

  res.status(200).json(rentals);
};
//?
const getCarForRequester = async (req, res) => {
  const { requesterEmail } = req.params;

  // Fetch rentals from the database
  const rentals = await CarRentals.find({ requesterEmail });

  res.status(200).json(rentals);
};

// /get-car-rentals/:id
const getRentalsByUserId = async (req, res) => {
  const { id } = req.params;
  // console.log(id);

  const data = await CarRentals.findById(id); // For a single rental
  res.status(200).json(data);
};

const updateRentalStatus = async (req, res) => {
  const { id } = req.params;
  const { rentStatus } = req.body;

  try {
    // Make sure rentStatus is provided
    if (!rentStatus) {
      return res.status(400).json({ message: "rentStatus is required" });
    }

    // Find the rental by ID and update its rentStatus
    const updatedRental = await CarRentals.findByIdAndUpdate(
      id,
      { rentStatus },
      { new: true }
    );

    if (!updatedRental) {
      return res.status(404).json({ message: "Rental not found" });
    }

    res.status(200).json({
      message: "Rental status updated successfully",
      updatedRental,
    });
  } catch (error) {
    console.error("Error updating rental status:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addRentalInfo,
  getRentalsByUser,
  getRentalsByUserId,
  updateRentalStatus,
  getCarForRequester,
};
