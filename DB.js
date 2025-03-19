const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {});
    console.log("mongodb Connected");
  } catch (error) {
    console.error(error.message);
  }
};
module.exports = connectDB;
