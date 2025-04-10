const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connect = require("./DB");

const app = express();
const connectDB = require("./DB")
connectDB()

const users = require("./Routes/usersRoutes");
const carRoutes = require("./Routes/carRoutes");

// const cors = require("cors");

// Add this before your routes

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Explicit origin
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization'] // Add required headers
  })
);


app.use("/api", users)
app.use("/cars", carRoutes);

// const userRoutes = require("./Routes/userRoutes"); // Import user routes
const usersRoutes = require("./Routes/usersRoutes"); // Import users routes
// const usersRoutes = require("./Routes/usersRoutes"); // Import users routes

const port = process.env.PORT || 5001;

// Connect to MongoDB
connect();



// Routes
app.use("/users", usersRoutes); // Use the user routes
// app.use("/users", providerUserRoutes);

app.get("/", (req, res) => {
  res.send("DeshRide Database is connected");
});

// Start Server
app.listen(port, () => {
  console.log("App is running on port", port);
});
