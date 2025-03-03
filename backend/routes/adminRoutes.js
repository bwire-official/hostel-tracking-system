const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

// Admin registration (Optional - Can be removed)
router.post('/register', adminController.registerAdmin);

// Admin login
router.post('/login', adminController.adminLogin);

// Get all student logs (Admins only)
router.get('/logs', authMiddleware, adminController.getAllLogs);

module.exports = router;
