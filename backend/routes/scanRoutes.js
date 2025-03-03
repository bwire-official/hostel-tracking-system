const express = require('express');
const { handleScan } = require('../controllers/scanController'); // Import handleScan from scanController
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Handle QR code scans
router.post('/scan', authMiddleware, handleScan); // Ensure handleScan is defined in scanController

module.exports = router;