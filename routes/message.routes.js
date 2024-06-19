const { Router } = require('express');
const authenticated = require('../middleware/authenticated');
const {
  handleGetMessage,
  handleSendMessage,
} = require('../controllers/message.controller');

const messageRoutes = Router();

messageRoutes.get('/get-messages', authenticated, handleGetMessage);
messageRoutes.post('/send-to/:chatRoomId', authenticated, handleSendMessage);

module.exports = messageRoutes;
