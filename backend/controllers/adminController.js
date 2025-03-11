const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Log = require("../models/Log");
const Student = require("../models/Student");

// Store blacklisted tokens in memory (resets when server restarts)
const blacklistedTokens = new Set();

// Admin Registration
exports.registerAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ username, password: hashedPassword, role: "admin" });

    await admin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering admin", error: error.message });
  }
};

// Admin Login
exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// Admin Logout
exports.adminLogout = (req, res) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(400).json({ message: "No token provided" });

  try {
    jwt.verify(token, process.env.JWT_SECRET); // Ensure it's a valid token before blacklisting
    blacklistedTokens.add(token);
    console.log("Token blacklisted:", token);
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

// Get All Student Logs (Admin only)
exports.getAllLogs = async (req, res) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  try {
    const logs = await Log.find().sort({ timestamp: -1 });

    if (!logs.length) return res.status(404).json({ message: "No logs found." });

    // Get unique student IDs from logs
    const studentIds = [...new Set(logs.map((log) => log.studentId))];

    // Fetch student details for these IDs
    const students = await Student.find({ studentId: { $in: studentIds } }).select("name studentId");

    // Create a lookup map for student names
    const studentMap = students.reduce((acc, student) => {
      acc[student.studentId] = student.name;
      return acc;
    }, {});

    // Attach student names to logs
    const logsWithStudentInfo = logs.map((log) => ({
      _id: log._id,
      studentId: log.studentId,
      studentName: studentMap[log.studentId] || "Unknown",
      type: log.type,
      reason: log.type === "check-out" ? log.reason || "NIL" : "NIL",
      timestamp: log.timestamp,
    }));

    res.status(200).json(logsWithStudentInfo);
  } catch (error) {
    res.status(500).json({ message: "Error fetching logs", error: error.message });
  }
};

// Export the blacklist for middleware use
exports.isTokenBlacklisted = (token) => blacklistedTokens.has(token);
