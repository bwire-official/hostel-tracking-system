const express = require('express');
const { getQRCode, getStudentLogs } = require('../controllers/studentController'); // Import getStudentLogs
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get student's QR code
router.get('/qrcode', authMiddleware, getQRCode);

// Get student's logs (check-in/check-out history)
router.get('/logs', authMiddleware, getStudentLogs);

module.exports = router;