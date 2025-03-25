const { default: mongoose } = require("mongoose");

const {Schema, model} = require(mongoose)
//comegtg
const carSchema = new Schema ({
    carBrand : {
        type: String,
        required: true,
    },
    carModel: {
        type: String,
        required: true
    }
})

const carModel = model("car", carSchema)

module.exports = carModel