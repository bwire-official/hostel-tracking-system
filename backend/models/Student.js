const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  roomNumber: { type: String },
  qrCode: { type: String }, // Add this field
});

module.exports = mongoose.model('Student', studentSchema);