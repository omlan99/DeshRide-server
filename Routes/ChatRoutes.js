const express = require("express");

const {
  pushChat,
  //   getChatByChatId,
} = require("../Controllers/chatController");

const router = express.Router();

router.post("/all_chats", pushChat);
// router.get("/getUser/:email", getChatByChatId);

module.exports = router;
