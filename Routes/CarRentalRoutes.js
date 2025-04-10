const express = require("express");
const router = express.Router();
const { addRentalInfo } = require("../Controllers/carRentalController");

router.post("/add-car-rental", addRentalInfo);

module.exports = router;
