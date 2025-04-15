const express = require('express');
const router = express.Router();
const { googleSignIn, getCurrentUser, updateUserRole } = require('../controllers/authController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.post('/google', googleSignIn);

// Protected routes
router.get('/me', protect, getCurrentUser);
router.put('/role', protect, authorize('admin'), updateUserRole);

module.exports = router; 