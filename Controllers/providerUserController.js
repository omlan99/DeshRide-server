const User = require("../Model/providerUserModel");

// Create new Consumer User [/consumerUsers]
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

// Get the full user object by email [/users/getUser/:email]
const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params; // Extract email from URL parameter
    console.log("Requested email:", email);

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user); // Return user object
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createUser, getUserByEmail };
