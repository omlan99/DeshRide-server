const express = require("express");
const cors = require('cors');
require("dotenv").config();
const connect = require("./DB");

const port = process.env.PORT || 5001;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// const userRoutes = require("./Routes/userRoutes"); // Import user routes



// Connect to MongoDB
connect();

// Routes
// app.use("/api/users", userRoutes); // Use the user routes

app.get("/", (req, res) => {
  res.send("DeshRide Database is connected");
});

// Start Server
app.listen(port, () => {
  console.log("DeshRide is running on port", port);
});
