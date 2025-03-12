const express = require('express');
const { getQRCode, getStudentLogs, getStudentDetails } = require('../controllers/studentController'); // Import getStudentDetails
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get student's QR code
router.get('/qrcode', authMiddleware, getQRCode);

// Get student's logs (check-in/check-out history)
router.get('/logs', authMiddleware, getStudentLogs);

// ✅ New route for student details
router.get('/details', authMiddleware, getStudentDetails);

module.exports = router;
