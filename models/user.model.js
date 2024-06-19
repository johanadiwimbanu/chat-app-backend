const { Schema, model } = require('mongoose');
const ConflictError = require('../errors/ConflictError');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female'],
    },
    profilePhoto: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

userSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new ConflictError(error.errorResponse.errmsg));
  } else {
    next(error);
  }
});

const User = model('User', userSchema);

module.exports = User;
