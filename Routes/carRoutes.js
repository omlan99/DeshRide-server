const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  addCar,
  getCars,
  getMyCars,
  updateCarStatus,
  deleteCar,
} = require("../Controllers/carController");

// Configure multer for multiple file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit per file
    files: 5, // Maximum number of files allowed
  },
  fileFilter: (req, file, cb) => {
    // Accept image files only
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

// Define fields for multiple file uploads
const uploadFields = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "insuranceDocs", maxCount: 1 },
  { name: "registrationCopy", maxCount: 1 },
  { name: "roadPermit", maxCount: 1 },
  { name: "taxToken", maxCount: 1 },
]);

// Routes
router.post("/", uploadFields, addCar);
router.get("/", getCars);
router.get("/my-cars", getMyCars);
router.put("/update-status", updateCarStatus);
router.delete("/:carId", deleteCar);

module.exports = router;
