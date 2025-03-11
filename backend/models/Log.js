const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  studentId: { type: String, required: true }, // Changed from ObjectId to String
  type: { type: String, enum: ['check-in', 'check-out'], required: true },
  reason: { type: String }, 
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Log', logSchema);


