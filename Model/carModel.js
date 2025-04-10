// carModel.js
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
        enum: ['Sedan', 'SUV', 'Truck', 'Sports', 'Luxury','CNG','Ambulance','Bus','MiniBus','HIACE']
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
        max: 57
    },
    features: {
        type: [String],
        required: true
    },
    carLocation: {
        type: String,
        required: true,
        trim: true
    },
    mileage: {  // New field
        type: Number,
        required: true,
        min: 0
    },
    yearOfManufacture: {  // New field
        type: Number,
        required: true,
        min: 1900,
        max: new Date().getFullYear()
    },
    bookingStatus: {  // New field
        type: String,
        required: true,
        enum: ['Available', 'Booked', 'Under Maintenance'],
        default: 'Available'
    },
    color: {  // New field
        type: String,
        required: true,
        trim: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    insuranceDocsUrl: {  // New field for insurance documents
        type: String,
        required: true
    },
    registrationCopyUrl: {  // New field for registration copy
        type: String,
        required: true
    },
    roadPermitUrl: {  // New field for road permit
        type: String,
        required: true
    },
    taxTokenUrl: {  // New field for tax token
        type: String,
        required: true
    },
    addedBy: {
        type: String,
        required: true
    },
    ownerEmail: {
        type: String,
        required: true
    },
    carStatus: {
        type: String,
        required: true,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// Pre-save hook remains the same
carSchema.pre('save', function(next) {
    if (!this.VehicleRegistrationNo) {
        this.VehicleRegistrationNo = `VR-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    }
    next();
});

const Car = mongoose.model('Car', carSchema);
module.exports = Car;