const { Request, Response } = require('express');
const ChatRoom = require('../models/chatRoom.model');
const Message = require('../models/message.model');
/**
 * @param {Response} res
 * @param {Request} req
 */

const handleSendMessage = async (req, res) => {
  try {
    const chatRoomId = req.params.chatRoomId;
    const { message } = req.body;
    const senderId = req.user._id;

    const newMessage = new Message({
      senderId,
      chatRoomId,
      message,
    });

    newMessage.save();

    res.status(200).send(newMessage);
  } catch (error) {
    res.status(500).send('Woops something went wrong');
  }
};

const getRoomChatIdOrCreateIfDoesntExists = async (senderId, receiverId) => {
  let chatRoom = await ChatRoom.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!chatRoom) {
    chatRoom = new ChatRoom({
      participants: [senderId, receiverId],
    });
    await chatRoom.save();
  }

  chatRoomId = chatRoom._id;
  console.log({ chatRoomId });

  return chatRoomId;
};

const handleGetMessage = async (req, res) => {
  const { receiverId = null } = req.body;
  let { chatRoomId = null } = req.body;
  const senderId = req.user._id;

  if (!chatRoomId) {
    chatRoomId = await getRoomChatIdOrCreateIfDoesntExists(
      senderId,
      receiverId
    );
  }

  const messages = await Message.find({ chatRoomId });

  res.status(200).json({
    chatRoom: {
      chatRoomId,
      messages,
    },
  });
};
module.exports = { handleGetMessage, handleSendMessage };
