// const express = require("express");
// require("dotenv").config();
// const cors = require("cors");
// const connect = require("./DB");

// const app = express();
// const connectDB = require("./DB")
// connectDB()

// const users = require("./Routes/usersRoutes");
// const carRoutes = require("./Routes/carRoutes");

// // const cors = require("cors");

// // Add this before your routes

// // Middleware
// app.use(express.json());
// app.use(
//   cors({
//     origin: "http://localhost:5173", // Explicit origin
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ['Content-Type', 'Authorization'] // Add required headers
//   })
// );


// app.use("/api", users)
// app.use("/cars", carRoutes);

// // const userRoutes = require("./Routes/userRoutes"); // Import user routes
// const usersRoutes = require("./Routes/usersRoutes"); // Import users routes
// // const usersRoutes = require("./Routes/usersRoutes"); // Import users routes

// const port = process.env.PORT || 5001;

// // Connect to MongoDB
// connect();



// // Routes
// app.use("/users", usersRoutes); // Use the user routes
// // app.use("/users", providerUserRoutes);

// app.get("/", (req, res) => {
//   res.send("DeshRide Database is connected");
// });

// // Start Server
// app.listen(port, () => {
//   console.log("App is running on port", port);
// });


// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");
// require("dotenv").config();
// const cors = require("cors");
// const connectDB = require("./DB");
// const Message = require("./Model/Message");
// // Initialize Express
// const app = express();
// const server = http.createServer(app); // Create HTTP server for Socket.io
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173", // Allow frontend connection
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// // Connect to MongoDB
// connectDB();

// // Import Routes
// const usersRoutes = require("./Routes/usersRoutes");
// const carRoutes = require("./Routes/carRoutes");


// // In your index.js file, after requiring the Message model:


// // Socket.io connection handling
// io.on("connection", (socket) => {
//   console.log(`New client connected: ${socket.id}`);

//   // When a client sends a message, save it to MongoDB and broadcast it
//   socket.on("sendMessage", async (message) => {
//     console.log("Message received:", message);
    
//     // Validate that the required fields are present
//     if (!message.sender || !message.userId || !message.text) {
//       console.error("Missing required fields in the message payload.");
//       return;
//     }

//     try {
//       // Create a new message document using the Message model
//       const newMessage = new Message({
//         sender: message.sender, // should be "admin" or "consumer"
//         text: message.text,
//         userId: message.userId, // the user _id from your user document
//       });

//       // Save the message in MongoDB
//       await newMessage.save();
//       console.log("Message saved to database:", newMessage);

//       // Broadcast the saved message to all connected clients
//       io.emit("receiveMessage", newMessage);
//     } catch (error) {
//       console.error("Error saving message:", error);
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log(`Client disconnected: ${socket.id}`);
//   });
// });







// // Middleware
// app.use(express.json());
// app.use(
//   cors({
//     origin: "http://localhost:5173", // Allow requests from frontend
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// // Use Routes
// app.use("/api", usersRoutes);
// app.use("/cars", carRoutes);
// app.use("/users", usersRoutes);

// // Root Route
// app.get("/", (req, res) => {
//   res.send("DeshRide Database is connected");
// });



// // Use your routes (adjust the endpoint as needed)
// app.use("/messages", require("./Routes/messageRoutes"));

// app.get("/", (req, res) => {
//   res.send("Server is connected");
// });




// // Start Server
// const port = process.env.PORT || 5001;
// server.listen(port, () => {
//   console.log(`App is running on port ${port}`);
// });
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./DB");
const Message = require("./Model/Message");

// Initialize Express
const app = express();
const server = http.createServer(app);

// Create Socket.io Server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Connect to MongoDB
connectDB();

// Import Routes
const usersRoutes = require("./Routes/usersRoutes");
const carRoutes = require("./Routes/carRoutes");
const messageRoutes = require("./Routes/messageRoutes");

// Socket.io connection handling
io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);

  socket.on("sendMessage", async (message) => {
    console.log("Message received:", message);

    if (!message.sender || !message.userId || !message.text) {
      console.error("Missing required fields in the message payload.");
      return;
    }

    try {
      const newMessage = new Message({
        sender: message.sender,
        text: message.text,
        userId: message.userId,
      });

      await newMessage.save();
      console.log("Message saved to database:", newMessage);

      io.emit("receiveMessage", newMessage);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Use Routes
app.use("/users", usersRoutes);
app.use("/cars", carRoutes);
app.use("/messages", messageRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("DeshRide Database & Server are connected");
});

// Start Server
const port = process.env.PORT || 5001;
server.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
