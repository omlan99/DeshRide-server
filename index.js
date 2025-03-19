const express = require("express");
require("dotenv").config();
const connect = require("./DB");

const userRoutes = require("./Routes/userRoutes"); // Import user routes

const port = process.env.PORT || 5001;
const app = express();

// Connect to MongoDB
connect();

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes); // Use the user routes

app.get("/", (req, res) => {
  res.send("DeshRide Database is connected");
});

// Start Server
app.listen(port, () => {
  console.log("App is running on port", port);
});
