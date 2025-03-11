const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

// Admin registration (Optional - Can be removed)
router.post('/register', adminController.registerAdmin);

// Admin login
router.post('/login', adminController.adminLogin);

//admin logout 
router.post('/logout', authMiddleware, adminController.adminLogout);

// Get all student logs (Admins only)
router.get('/logs', authMiddleware, adminController.getAllLogs);
//router.delete('/logs/clear', authMiddleware, adminController.clearLogs);

module.exports = router;
