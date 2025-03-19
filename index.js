const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connect = require("./DB");

<<<<<<< HEAD
const connectDB = require("./DB")
connectDB()
const router = express.Router();
const users = require("./routes/users");

const app = express()
app.use(express.json())

app.use("/api", users)
=======
const userRoutes = require("./Routes/userRoutes"); // Import user routes
>>>>>>> 36bee0850fb46c2f56d36e689f216d0dd6d58021

const port = process.env.PORT || 5001;
const app = express();

<<<<<<< HEAD
=======
// Connect to MongoDB
connect();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Allow the specific frontend origin
    credentials: true, // Allow cookies/credentials to be included in the request
  })
);
>>>>>>> 36bee0850fb46c2f56d36e689f216d0dd6d58021

// Routes
app.use("/api/users", userRoutes); // Use the user routes

app.get("/", (req, res) => {
  res.send("DeshRide Database is connected");
});

// Start Server
app.listen(port, () => {
  console.log("App is running on port", port);
});
