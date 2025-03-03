const express = require('express');
const {
  adminSignUp,
  adminLogin,
  studentSignUp,
  studentLogin,
} = require('../controllers/authController');

const router = express.Router();

// Admin Routes
router.post('/admin/signup', adminSignUp); // Admin sign-up route
router.post('/admin/login', adminLogin);   // Admin login route

// Student Routes
router.post('/student/signup', studentSignUp); // Student sign-up route
router.post('/student/login', studentLogin);   // Student login route

module.exports = router;