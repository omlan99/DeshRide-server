const express = require("express");

const {
  createUser,
  getUserByEmail, getAllUsers, deleteUser, updateUserRole

} = require("../Controllers/usersController");

const router = express.Router();

router.post("/all_users", createUser); // Create a new user for the consumer
router.get("/getUser/:email", getUserByEmail);
router.get("/all_users", getAllUsers); // Get all users
router.delete("/deleteUser/:id", deleteUser);
router.put('/updateRole/:id', updateUserRole); // New route

module.exports = router;
