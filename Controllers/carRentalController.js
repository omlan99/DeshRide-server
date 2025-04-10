const CarRentals = require("../Model/CarRentModel");

const addRentalInfo = async (req, res) => {
  try {
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
    } = req.body;

    // Check if the vehicle already exists
    const existingCar = await CarRentals.findOne({ VehicleRegistrationNo });
    if (existingCar) {
      return res.status(400).json({ message: "Vehicle already exists" });
    }

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
    });

    await newCarRental.save();

    res
      .status(201)
      .json({ message: "Car rental added successfully", newCarRental });
  } catch (error) {
    console.error("Error adding car rental:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// ... existing code ...

module.exports = { addRentalInfo };
