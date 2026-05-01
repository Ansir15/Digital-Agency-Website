import express from 'express';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import {
  getAllMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember,
  reorderMembers
} from '../controllers/teamController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Configure Cloudinary storage
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'devagency/team',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 400, height: 400, crop: 'fill', gravity: 'face' }]
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

/**
 * @route   GET /api/team
 * @desc    Get all team members
 * @access  Public
 */
router.get('/', getAllMembers);

/**
 * @route   GET /api/team/:id
 * @desc    Get single team member
 * @access  Public
 */
router.get('/:id', getMember);

/**
 * @route   POST /api/team
 * @desc    Create new team member
 * @access  Private
 */
router.post('/', protect, upload.single('photo'), createMember);

/**
 * @route   PUT /api/team/reorder
 * @desc    Reorder team members
 * @access  Private
 */
router.put('/reorder', protect, reorderMembers);

/**
 * @route   PUT /api/team/:id
 * @desc    Update team member
 * @access  Private
 */
router.put('/:id', protect, upload.single('photo'), updateMember);

/**
 * @route   DELETE /api/team/:id
 * @desc    Delete team member
 * @access  Private
 */
router.delete('/:id', protect, deleteMember);

export default router;
