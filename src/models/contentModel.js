const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  _userId: {
    type: mongoose.Schema.Types.ObjectId, // User ID associated with the content
    required: true,
  },
  _safeboxId: {
    type: mongoose.Schema.Types.ObjectId, // Safebox ID associated with the content
    required: true,
  },
});

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;
