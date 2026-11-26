const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  userType: {
    type: String,
    enum: ['farmer', 'buyer'],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    default: '',
  },
  contactNo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: '',
  },
  issueDescription: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  photo: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    enum: ['pending', 'resolved'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Issue', issueSchema);
