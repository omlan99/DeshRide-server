const express = require("express");
const router = express.Router();
const {
  addRentalInfo,
  getRentalsByUser,
} = require("../Controllers/carRentalController");

router.post("/add-car-rental", addRentalInfo);
router.get("/get-car-rentals/:ownerEmail", getRentalsByUser);

module.exports = router;
