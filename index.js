const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connect = require("./DB");

const app = express();
const connectDB = require("./DB");
connectDB();

const users = require("./Routes/usersRoutes");
const carRoutes = require("./Routes/carRoutes");
const carRentalRoutes = require("./Routes/CarRentalRoutes");

// const cors = require("cors");

// Add this before your routes

// Middleware
const allowedOrigins = [
  "http://localhost:5173",

  "https://desh-ride.surge.sh",
  "https://desh-ride.netlify.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api", users);
app.use("/cars", carRoutes);
app.use("/car-rental", carRentalRoutes);

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
