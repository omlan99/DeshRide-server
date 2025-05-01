const Chat = require("../Model/chatModel");

const pushChat = async (req, res) => {
  try {
    const newMessage = req.body;

    if (!newMessage) {
      return res.status(400).json({ error: "Request body is missing" });
    }

    const { chatId, sender, message, timestamp } = newMessage;

    // Validate required fields
    if (!chatId || !sender || !message || !timestamp) {
      return res.status(400).json({
        error: "All fields (chatId, sender, message, timestamp) are required",
      });
    }

    // Validate sender value
    if (!["ownerDriver", "consumer"].includes(sender)) {
      return res.status(400).json({ error: "Invalid sender value" });
    }

    // Validate timestamp format
    const parsedTimestamp = new Date(timestamp);
    if (isNaN(parsedTimestamp.getTime())) {
      return res.status(400).json({ error: "Invalid timestamp format" });
    }

    // Create a new chat entry
    const newChat = new Chat({
      chatId,
      sender,
      message,
      timestamp: parsedTimestamp,
    });

    // Save to database
    const savedChat = await newChat.save();

    return res.status(201).json({
      message: "Chat entry created successfully",
      data: savedChat,
    });
  } catch (error) {
    console.error("Error creating chat entry:", error.message, error.stack);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};

module.exports = { pushChat };
