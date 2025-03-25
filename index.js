const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connect = require("./DB");

const app = express();
const connectDB = require("./DB")
connectDB()
const users = require("./Routes/usersRoutes");
// const cors = require("cors");




app.use("/api", users)
// const userRoutes = require("./Routes/userRoutes"); // Import user routes
const usersRoutes = require("./Routes/usersRoutes"); // Import users routes
// const usersRoutes = require("./Routes/usersRoutes"); // Import users routes

const port = process.env.PORT || 5001;

// Connect to MongoDB
connect();

// Middleware
app.use(express.json());
app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: "",

    credentials: true,
  })
);

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
