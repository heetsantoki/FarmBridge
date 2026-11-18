const mongoose = require('mongoose');

const passwordResetRequestSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  confirmToken: {
    type: String,
    required: false,
    default: null,
  },
  resetToken: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ['pending_confirmation', 'confirmed', 'completed'],
    default: 'pending_confirmation',
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 1800, // Expires after 30 minutes
  },
});

module.exports = mongoose.model('PasswordResetRequest', passwordResetRequestSchema);
