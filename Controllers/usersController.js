const User = require("../Model/usersModel");

//! Create new Consumer User [post -> /consumerUsers]

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

//! Get the single user data by email [get -> /users/getUser/:email]
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
        userRole = "car_investor_with_driver"; // Provider with car (driving)
      } else if (user.hasCar && user.carUsage === "rent") {
        userRole = "car_investor_without_driver"; // Provider with car (renting)
      } else if (!user.hasCar) {
        userRole = "driver_without_car"; // Provider without a car
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

//! Get all users [get -> /users/all_users]

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//! Delete a user [delete -> /users/deleteUser/:id]
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//! Update user role [put -> /users/updateRole/:id]
const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({ error: "Role is required" });
    }

    const validRoles = [
      "provider",
      "consumer",
      "driver",
      "ownerDriver",
      "providerOnly",
      "admin",
    ];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User role updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateStatus = async(req, res) => {
  const email = req.params.email
  const data = req.body 
  
  
  const user= await User.updateOne({email, data})

}

// Add this to your exports
module.exports = { createUser, getUserByEmail, getAllUsers, deleteUser,updateUserRole, updateStatus };
// Add this to your exports
module.exports = { createUser, getUserByEmail, getAllUsers, deleteUser,updateUserRole  };
