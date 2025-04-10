const express = require("express");
const router = express.Router();
const {
  addRentalInfo,
  getRentalsByUser,
  getRentalsByUserId,
} = require("../Controllers/carRentalController");

router.post("/add-car-rental", addRentalInfo);
router.get("/get-car-rentals/:ownerEmail", getRentalsByUser);
router.get("/get-car-rental/:id", getRentalsByUserId);

module.exports = router;
