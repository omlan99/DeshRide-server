const User = require("../Model/providerUserModel");

// Create new Consumer User [post -> /consumerUsers]
const createUser = async (req, res) => {
  try {
    const providerData = req.body;

    const email = providerData.email;
    const userName = providerData.userName;

    // Check if email or userName already exists
    const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email or username already exists" });
    }

    // Create new user
    const newUser = new User(providerData);
    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get the single user data by email [get -> /users/getUser/:email]
const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Determine the user's role
    let userRole = null;

    if (user.role === "provider") {
      if (user.hasCar && user.carUsage === "drive") {
        userRole = "driver_with_car"; // Provider with car (driving)
      } else if (user.hasCar && user.carUsage === "rent") {
        userRole = "renter"; // Provider with car (renting)
      } else if (!user.hasCar) {
        userRole = "provider_without_car"; // Provider without a car
      }
    } else if (user.role === "consumer") {
      userRole = "consumer"; // Consumer role
    }

    // Return user data along with the computed role
    res.status(200).json({ ...user.toObject(), userRole });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createUser, getUserByEmail };
