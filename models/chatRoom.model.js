const { Schema, model, default: mongoose } = require('mongoose');

const chatRoomSchema = new Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

const ChatRoom = model('ChatRoom', chatRoomSchema);

module.exports = ChatRoom;
