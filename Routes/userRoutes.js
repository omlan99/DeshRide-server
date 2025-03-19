const express = require("express");
const { createUser } = require("../Controllers/consumerUserController");

const router = express.Router();

router.post("/consumerUsers", createUser); // Create a new user for the consumer

module.exports = router;
