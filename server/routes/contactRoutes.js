import express from 'express';
import { body } from 'express-validator';
import {
  getAllMessages,
  getMessage,
  submitContact,
  toggleReadStatus,
  deleteMessage,
  getStats
} from '../controllers/contactController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Validation rules
const contactValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email'),
  body('service')
    .notEmpty().withMessage('Service selection is required')
    .isIn(['Web Development', 'UI/UX Design', 'SEO Optimization', 'Brand Identity', 'E-Commerce', 'Mobile Apps', 'Other'])
    .withMessage('Invalid service selection'),
  body('budget')
    .notEmpty().withMessage('Budget range is required')
    .isIn(['Under $500', '$500-2K', '$2K-5K', '$5K+'])
    .withMessage('Invalid budget range'),
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 20 }).withMessage('Message must be at least 20 characters')
];

/**
 * @route   GET /api/contact
 * @desc    Get all messages (admin only)
 * @access  Private
 */
router.get('/', protect, getAllMessages);

/**
 * @route   GET /api/contact/stats
 * @desc    Get contact stats
 * @access  Private
 */
router.get('/stats', protect, getStats);

/**
 * @route   GET /api/contact/:id
 * @desc    Get single message
 * @access  Private
 */
router.get('/:id', protect, getMessage);

/**
 * @route   POST /api/contact
 * @desc    Submit contact form
 * @access  Public
 */
router.post('/', contactValidation, submitContact);

/**
 * @route   PATCH /api/contact/:id/read
 * @desc    Toggle read status
 * @access  Private
 */
router.patch('/:id/read', protect, toggleReadStatus);

/**
 * @route   DELETE /api/contact/:id
 * @desc    Delete message
 * @access  Private
 */
router.delete('/:id', protect, deleteMessage);

export default router;
