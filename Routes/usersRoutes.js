const express = require("express");

const {
  createUser,
  getUserByEmail,
} = require("../Controllers/usersController");

const router = express.Router();

router.post("/all_users", createUser); // Create a new user for the consumer
router.get("/getUser/:email", getUserByEmail);

module.exports = router;
