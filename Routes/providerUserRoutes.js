const express = require("express");
const { createUser } = require("../Controllers/providerUserController");

const router = express.Router();

router.post("/providerUsers", createUser); // Create a new user for the consumer

module.exports = router;
