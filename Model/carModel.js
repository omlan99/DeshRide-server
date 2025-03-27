const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    VehicleRegistrationNo: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    model: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    type: {
        type: String,
        required: true,
        enum: ['Sedan', 'SUV', 'Truck', 'Sports', 'Luxury']
    },
    transmission: {
        type: String,
        required: true,
        enum: ['Automatic', 'Manual']
    },
    fuelType: {
        type: String,
        required: true,
        enum: ['Gasoline', 'Diesel', 'Electric', 'Hybrid']
    },
    seats: {
        type: Number,
        required: true,
        min: 2,
        max: 8
    },
    features: {
        type: [String],
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// Pre-save hook to generate a unique registration number if not provided
carSchema.pre('save', function(next) {
    if (!this.VehicleRegistrationNo) {
        // Generate a unique registration number
        this.VehicleRegistrationNo = `VR-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    }
    next();
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;