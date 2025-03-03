const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  type: { type: String, enum: ['check-in', 'check-out'], required: true },
  reason: { type: String }, // Only for check-out
});

module.exports = mongoose.model('Log', logSchema);