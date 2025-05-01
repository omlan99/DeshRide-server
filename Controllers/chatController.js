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

const getChatByChatId = async (req, res) => {
  try {
    // const { chatId } = req.params;
    const chatId = req.params.chatId;
    // console.log(chatId);

    if (!chatId) {
      return res.status(400).json({ error: "Chat ID is required" });
    }

    const chat = await Chat.find({ chatId });
    if (!chat || chat.length === 0) {
      return res.status(404).json({ error: "Chat not found" });
    }
    return res.status(200).json({
      message: "Chat retrieved successfully",
      data: chat,
    });
  } catch (error) {
    console.error("Error retrieving chat:", error.message, error.stack);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};

module.exports = { pushChat, getChatByChatId };
