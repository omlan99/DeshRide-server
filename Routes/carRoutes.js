const express = require('express');
const router = express.Router();
const multer = require('multer');
const { addCar, getCars, getMyCars ,updateCarStatus} = require('../Controllers/carController');

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



router.post('/', upload.single('image'), addCar);
router.get('/', getCars);
router.get('/my-cars', getMyCars);
router.put('/update-status', updateCarStatus);


module.exports = router;