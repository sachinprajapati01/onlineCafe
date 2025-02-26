const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  adminId: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    enum: ['user', 'admin'],
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);