const express = require('express');
const router = express.Router();
const multer = require('multer');
const { addCar, getCars } = require('../Controllers/carController');

// Configure multer for file upload
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB file size limit
    },
    fileFilter: (req, file, cb) => {
        // Accept image files only
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'), false);
        }
    }
});

// Route for adding a car with image upload
router.post('/', upload.single('image'), addCar);

// Route for getting all cars
router.get('/', getCars);


module.exports = router;