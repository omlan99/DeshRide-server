
// const express = require("express");
// const router = express.Router();
// const Message = require("../Model/Message");



// router.get("/users", async (req, res) => {
//   try {
//     const users = await Message.aggregate([
//       { $group: { _id: "$userId" } },
//       { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "userDetails" } },
//       { $unwind: "$userDetails" },
//       { $project: { _id: "$userDetails._id", email: "$userDetails.email" } } // Fetch user email
//     ]);
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });



// router.get("/:userId", async (req, res) => {
//   try {
//     const userId = new mongoose.Types.ObjectId(req.params.userId);
//     const messages = await Message.find({ userId }).sort({ createdAt: 1 });
//     res.json(messages);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Post a new message (admin reply)
// router.post("/", async (req, res) => {
//   try {
//     const { sender, text, userId } = req.body;
//     const newMessage = new Message({ sender, text, userId });
//     await newMessage.save();
//     res.status(201).json(newMessage);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;
// const express = require("express");
// const router = express.Router();
// const mongoose = require("mongoose");
// const Message = require("../Model/Message");
// const User = require("../Model/usersModel");

// // Fetch all messages
// router.get("/", async (req, res) => {
//   try {
//     const messages = await Message.find().sort({ createdAt: 1 });
//     res.json(messages);
//   } catch (err) {
//     console.error("Error fetching all messages:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // Fetch distinct users who have messages (for the reply dropdown)
// router.get("/users", async (req, res) => {
//   try {
//     const userIds = await Message.distinct("userId");
//     const users = await User.find(
//       { _id: { $in: userIds } },
//       { _id: 1, email: 1 }
//     );
//     res.json(users);
//   } catch (err) {
//     console.error("Error in /messages/users:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // Fetch messages for a specific user (optional, if needed later)
// router.get("/:userId", async (req, res) => {
//   try {
//     const userId = new mongoose.Types.ObjectId(req.params.userId);
//     const messages = await Message.find({ userId }).sort({ createdAt: 1 });
//     res.json(messages);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Post a new message (admin reply)
// router.post("/", async (req, res) => {
//   try {
//     const { sender, text, userId } = req.body;
//     const newMessage = new Message({ sender, text, userId });
//     await newMessage.save();
//     res.status(201).json(newMessage);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Message = require("../Model/Message");
const User = require("../Model/usersModel");

// Fetch all messages with user emails
router.get("/", async (req, res) => {
  try {
    const messages = await Message.aggregate([
      // Step 1: Lookup to join with the users collection
      {
        $lookup: {
          from: "users", // The name of the users collection
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      // Step 2: Unwind the userDetails array (since $lookup returns an array)
      { $unwind: "$userDetails" },
      // Step 3: Project the fields we want, including the email
      {
        $project: {
          _id: 1,
          sender: 1,
          text: 1,
          userId: 1,
          createdAt: 1,
          updatedAt: 1,
          email: "$userDetails.email", // Include the email from userDetails
        },
      },
      // Step 4: Sort by createdAt
      { $sort: { createdAt: 1 } },
    ]);
    res.json(messages);
  } catch (err) {
    console.error("Error fetching all messages:", err);
    res.status(500).json({ error: err.message });
  }
});

// Fetch distinct users who have messages (for the reply dropdown)
router.get("/users", async (req, res) => {
  try {
    const userIds = await Message.distinct("userId");
    const users = await User.find(
      { _id: { $in: userIds } },
      { _id: 1, email: 1 }
    );
    res.json(users);
  } catch (err) {
    console.error("Error in /messages/users:", err);
    res.status(500).json({ error: err.message });
  }
});

// Fetch messages for a specific user (optional, if needed later)
router.get("/:userId", async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.params.userId);
    const messages = await Message.find({ userId }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Post a new message (admin reply)
router.post("/", async (req, res) => {
  try {
    const { sender, text, userId } = req.body;
    const newMessage = new Message({ sender, text, userId });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;