const Car = require('../Model/carModel');
const axios = require('axios');
const FormData = require('form-data');

const addCar = async (req, res) => {
    try {
        // Validate required fields including owner info
        const requiredFields = [
            'name', 'model', 'price', 'type', 
            'transmission', 'fuelType', 'seats', 'features',
            'addedBy', 'ownerEmail','carLocation'
        ];

        for (let field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ 
                    message: `Missing required field: ${field}` 
                });
            }
        }

        // Check if file exists
        if (!req.file) {
            return res.status(400).json({ 
                message: 'Image file is required' 
            });
        }

        // Image hosting API (ImgBB)
        const imageHostingKey = process.env.IMAGE_HOSTING_KEY;
        if (!imageHostingKey) {
            return res.status(500).json({ 
                message: 'Image hosting key is not configured' 
            });
        }

        const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

        // Create form data for image upload
        const formData = new FormData();
        formData.append('image', req.file.buffer.toString('base64'));

        try {
            // Upload image to ImgBB
            const imageUploadResponse = await axios.post(imageHostingUrl, formData, {
                headers: {
                    ...formData.getHeaders()
                }
            });

            // Get the image URL from ImgBB response
            const imageUrl = imageUploadResponse.data.data.display_url;

            // Split features into an array
            const featuresArray = req.body.features.split(',').map(feature => feature.trim());

            // Create new car document with owner info
            const newCar = new Car({
                name: req.body.name,
                model: req.body.model,
                price: parseFloat(req.body.price),
                type: req.body.type,
                transmission: req.body.transmission,
                fuelType: req.body.fuelType,
                seats: parseInt(req.body.seats),
                features: featuresArray,
                carLocation: req.body.carLocation,
                imageUrl,
                addedBy: req.body.addedBy,
                ownerEmail: req.body.ownerEmail,
                carStatus: 'Pending', // Set default status
                VehicleRegistrationNo: req.body.VehicleRegistrationNo || undefined
            });

            // Save car to database
            await newCar.save();

            // Respond with success message and car details
            res.status(201).json({
                message: 'Car added successfully',
                car: newCar
            });

        } catch (imageUploadError) {
            console.error('Image upload error:', imageUploadError.response ? imageUploadError.response.data : imageUploadError.message);
            return res.status(500).json({ 
                message: 'Failed to upload image', 
                error: imageUploadError.message 
            });
        }

    } catch (error) {
        console.error('Error in addCar:', error);
        res.status(500).json({ 
            message: 'Internal server error', 
            error: error.message 
        });
    }
};

// Implement getCars function
const getCars = async (req, res) => {
    try {
        // Fetch all cars from the database
        const cars = await Car.find();

        // Respond with the list of cars
        res.status(200).json({
            message: 'Cars retrieved successfully',
            cars: cars
        });
    } catch (error) {
        console.error('Error retrieving cars:', error);
        res.status(500).json({ 
            message: 'Failed to retrieve cars', 
            error: error.message 
        });
    }
};

// Add this new function to your carController.js
const getMyCars = async (req, res) => {
    try {
        const ownerEmail = req.query.ownerEmail;
        if (!ownerEmail) {
            return res.status(400).json({ 
                message: 'Owner email is required' 
            });
        }

        const cars = await Car.find({ ownerEmail });
        res.status(200).json({
            message: 'Cars retrieved successfully',
            cars: cars
        });
    } catch (error) {
        console.error('Error retrieving cars:', error);
        res.status(500).json({ 
            message: 'Failed to retrieve cars', 
            error: error.message 
        });
    }
};


module.exports = { addCar, getCars, getMyCars };

