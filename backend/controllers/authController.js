const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const QRCode = require('qrcode'); // For QR code generation
const Admin = require('../models/Admin');
const Student = require('../models/Student');

// Admin Sign-Up
exports.adminSignUp = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const admin = new Admin({
      username,
      password: hashedPassword,
    });

    await admin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin Login
exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find admin by username
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: 'Admin not found' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token (Now using process.env.JWT_SECRET)
    const token = jwt.sign({ id: admin._id, role: "admin"}, //This includes role
      process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Student Sign-Up
exports.studentSignUp = async (req, res) => {
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
    const qrCode = await QRCode.toDataURL(studentId); // Generate QR code as a data URL

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

// Student Login
exports.studentLogin = async (req, res) => {
  const { studentId, password } = req.body;

  try {
    // Find student by studentId
    const student = await Student.findOne({ studentId });
    if (!student) {
      return res.status(400).json({ message: 'Student not found' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token (Now using process.env.JWT_SECRET)
    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
