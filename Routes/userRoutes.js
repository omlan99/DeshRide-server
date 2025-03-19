const express = require("express");
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../Controllers/userController");

const router = express.Router();

router.post("/", createUser); // Create a new user
router.get("/", getUsers); // Get all users
router.get("/:id", getUserById); // Get a single user by ID
router.put("/:id", updateUser); // Update a user by ID
router.delete("/:id", deleteUser); // Delete a user by ID

module.exports = router;
