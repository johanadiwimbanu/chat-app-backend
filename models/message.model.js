const { Schema, model } = require('mongoose');

const messageSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    chatRoomId: {
      type: Schema.Types.ObjectId,
      ref: 'ChatRoom',
      required: true,
    },
    message: {
      type: 'string',
      required: true,
    },
  },
  { timestamps: true }
);

const Message = model('Message', messageSchema);

module.exports = Message;
