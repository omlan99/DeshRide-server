const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connect = require("./DB");

const consumerUserRoutes = require("./Routes/consumerUserRoutes"); // Import consumer user routes
const providerUserRoutes = require("./Routes/providerUserRoutes"); // Import provider user routes

const port = process.env.PORT || 5001;
const app = express();

// Connect to MongoDB
connect();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/users", consumerUserRoutes); // Use the user routes
app.use("/users", providerUserRoutes);

app.get("/", (req, res) => {
  res.send("DeshRide Database is connected");
});

// Start Server
app.listen(port, () => {
  console.log("App is running on port", port);
});
