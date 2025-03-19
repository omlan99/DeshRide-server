const User = require("../Model/providerUserModel");

// Create new Consumer User [/consumerUsers]
const createUser = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, userName, role } = req.body;

    // Check if email or userName already exists
    const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email or username already exists" });
    }

    // Create new user
    const newUser = new User({ fullName, email, phoneNumber, userName, role });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createUser };
