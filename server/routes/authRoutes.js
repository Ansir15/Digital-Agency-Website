import express from 'express';
import { login, getProfile, logout } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @route   POST /api/auth/login
 * @desc    Admin login
 * @access  Public
 */
router.post('/login', login);

/**
 * @route   GET /api/auth/profile
 * @desc    Get admin profile
 * @access  Private
 */
router.get('/profile', protect, getProfile);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout admin
 * @access  Private
 */
router.post('/logout', protect, logout);

export default router;
