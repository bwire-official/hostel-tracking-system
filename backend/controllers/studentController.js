const bcrypt = require('bcryptjs');
const QRCode = require('qrcode');
const Student = require('../models/Student');
const Log = require('../models/Log'); // Import the Log model

// Student Sign-Up
exports.registerStudent = async (req, res) => {
  const { studentId, name, password, roomNumber } = req.body;

  try {
    // Check if student already exists
    const existingStudent = await Student.findOne({ studentId });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate QR code
    const qrCode = await QRCode.toDataURL(studentId);

    // Create student
    const student = new Student({
      studentId,
      name,
      password: hashedPassword,
      roomNumber,
      qrCode, // Save QR code
    });

    await student.save();
    res.status(201).json({ message: 'Student registered successfully', qrCode });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Student's QR Code
exports.getQRCode = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    if (!student.qrCode) {
      return res.status(404).json({ message: 'QR code not found for this student' });
    }

    res.json({ qrCode: student.qrCode });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Student's Logs (Check-in/Check-out History)
exports.getStudentLogs = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const logs = await Log.find({ studentId: student.studentId }).sort({ timestamp: -1 }); // Match logs using studentId
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching logs', error });
  }
};

// ✅ New: Get Student Details
exports.getStudentDetails = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({
      name: student.name,
      studentId: student.studentId,
      roomNumber: student.roomNumber,
      qrCode: student.qrCode,
    });
  } catch (error) {
    console.error('Failed to fetch student details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};