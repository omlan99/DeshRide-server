const express = require("express");

const { pushChat, getChatByChatId } = require("../Controllers/chatController");

const router = express.Router();

router.post("/all_chats", pushChat);
router.get("/all_chats/:chatId", getChatByChatId);

module.exports = router;
