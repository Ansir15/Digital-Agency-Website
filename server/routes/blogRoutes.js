import express from 'express';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import {
  getAllPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost
} from '../controllers/blogController.js';
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
    folder: 'devagency/blog',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 800, height: 500, crop: 'fill' }]
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
 * @route   GET /api/blog
 * @desc    Get all blog posts
 * @access  Public
 */
router.get('/', getAllPosts);

/**
 * @route   GET /api/blog/:slug
 * @desc    Get single blog post by slug
 * @access  Public
 */
router.get('/:slug', getPostBySlug);

/**
 * @route   POST /api/blog
 * @desc    Create new blog post
 * @access  Private
 */
router.post('/', protect, upload.single('thumbnail'), createPost);

/**
 * @route   PUT /api/blog/:id
 * @desc    Update blog post
 * @access  Private
 */
router.put('/:id', protect, upload.single('thumbnail'), updatePost);

/**
 * @route   DELETE /api/blog/:id
 * @desc    Delete blog post
 * @access  Private
 */
router.delete('/:id', protect, deletePost);

export default router;
