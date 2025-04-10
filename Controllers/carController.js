const Car = require("../Model/carModel");
const axios = require("axios");
const FormData = require("form-data");

// controllers/carController.js
const addCar = async (req, res) => {
  try {
    // Updated required fields
    const requiredFields = [
      "name", "model", "price", "type", "transmission", "fuelType", 
      "seats", "features", "addedBy", "ownerEmail", "carLocation",
      "mileage", "yearOfManufacture", "color"  // New required fields
    ];

    for (let field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          message: `Missing required field: ${field}`,
        });
      }
    }

    // Check if all required files exist
    if (!req.files || !req.files.image || !req.files.insuranceDocs || 
        !req.files.registrationCopy || !req.files.roadPermit || !req.files.taxToken) {
      return res.status(400).json({
        message: "All image files (car image, insurance, registration, permit, tax token) are required",
      });
    }

    const imageHostingKey = process.env.IMAGE_HOSTING_KEY;
    const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

    // Function to upload image to ImgBB
    const uploadImage = async (file) => {
      const formData = new FormData();
      formData.append("image", file.buffer.toString("base64"));
      const response = await axios.post(imageHostingUrl, formData, {
        headers: { ...formData.getHeaders() }
      });
      return response.data.data.display_url;
    };

    // Upload all images
    const [imageUrl, insuranceDocsUrl, registrationCopyUrl, roadPermitUrl, taxTokenUrl] = await Promise.all([
      uploadImage(req.files.image[0]),
      uploadImage(req.files.insuranceDocs[0]),
      uploadImage(req.files.registrationCopy[0]),
      uploadImage(req.files.roadPermit[0]),
      uploadImage(req.files.taxToken[0])
    ]);

    const featuresArray = req.body.features.split(",").map(feature => feature.trim());

    const newCar = new Car({
      name: req.body.name,
      model: req.body.model,
      price: parseFloat(req.body.price),
      type: req.body.type,
      transmission: req.body.transmission,
      fuelType: req.body.fuelType,
      seats: parseInt(req.body.seats),
      features: featuresArray,
      carLocation: req.body.carLocation,
      mileage: parseFloat(req.body.mileage),  // New field
      yearOfManufacture: parseInt(req.body.yearOfManufacture),  // New field
      bookingStatus: 'Available',  // New field with default value
      color: req.body.color,  // New field
      imageUrl,
      insuranceDocsUrl,  // New field
      registrationCopyUrl,  // New field
      roadPermitUrl,  // New field
      taxTokenUrl,  // New field
      addedBy: req.body.addedBy,
      ownerEmail: req.body.ownerEmail,
      carStatus: "Pending",
      VehicleRegistrationNo: req.body.VehicleRegistrationNo || undefined,
    });

    await newCar.save();

    res.status(201).json({
      message: "Car added successfully",
      car: newCar,
    });
  } catch (error) {
    console.error("Error in addCar:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Implement getCars function
const getCars = async (req, res) => {
  try {
    // Fetch all cars from the database
    const cars = await Car.find();

    // Respond with the list of cars
    res.status(200).json({
      message: "Cars retrieved successfully",
      cars: cars,
    });
  } catch (error) {
    console.error("Error retrieving cars:", error);
    res.status(500).json({
      message: "Failed to retrieve cars",
      error: error.message,
    });
  }
};

// get cars by email
const getMyCars = async (req, res) => {
  try {
    const ownerEmail = req.query.ownerEmail;
    if (!ownerEmail) {
      return res.status(400).json({
        message: "Owner email is required",
      });
    }

    const cars = await Car.find({ ownerEmail });
    res.status(200).json({
      message: "Cars retrieved successfully",
      cars: cars,
    });
  } catch (error) {
    console.error("Error retrieving cars:", error);
    res.status(500).json({
      message: "Failed to retrieve cars",
      error: error.message,
    });
  }
};

// Update cars ActiveStatus
const updateCarStatus = async (req, res) => {
  try {
    const { carId, status } = req.body;

    // Validate inputs
    if (!carId || !status) {
      return res.status(400).json({
        message: "Car ID and status are required",
      });
    }

    // Validate status value
    const validStatuses = ["Pending", "Approved", "Rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
      });
    }

    // Find and update the car
    const updatedCar = await Car.findByIdAndUpdate(
      carId,
      { carStatus: status },
      { new: true }
    );

    if (!updatedCar) {
      return res.status(404).json({
        message: "Car not found",
      });
    }

    res.status(200).json({
      message: "Car status updated successfully",
      car: updatedCar,
    });
  } catch (error) {
    console.error("Error updating car status:", error);
    res.status(500).json({
      message: "Failed to update car status",
      error: error.message,
    });
  }
};

// ... delete cars

const deleteCar = async (req, res) => {
  try {
    const { carId } = req.params;

    if (!carId) {
      return res.status(400).json({
        message: "Car ID is required",
      });
    }

    const deletedCar = await Car.findByIdAndDelete(carId);

    if (!deletedCar) {
      return res.status(404).json({
        message: "Car not found",
      });
    }

    res.status(200).json({
      message: "Car deleted successfully",
      carId: carId,
    });
  } catch (error) {
    console.error("Error deleting car:", error);
    res.status(500).json({
      message: "Failed to delete car",
      error: error.message,
    });
  }
};

// ... existing code ...

module.exports = { addCar, getCars, getMyCars, updateCarStatus, deleteCar };
