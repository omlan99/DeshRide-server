const express = require("express");
const {
  createUser,
  getUserByEmail,
} = require("../Controllers/providerUserController");

const router = express.Router();

router.post("/providerUsers", createUser); // Create a new user for the consumer
router.get("/getUser/:email", getUserByEmail);

module.exports = router;
