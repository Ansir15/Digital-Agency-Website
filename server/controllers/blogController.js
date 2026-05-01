import Blog from '../models/Blog.js';
import { v2 as cloudinary } from 'cloudinary';
import slugify from 'slugify';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * @desc    Get all blog posts
 * @route   GET /api/blog
 * @access  Public
 */
export const getAllPosts = async (req, res, next) => {
  try {
    const { category, tag, search, page = 1, limit = 9 } = req.query;
    
    const query = {};
    if (category && category !== 'All') {
      query.category = category;
    }
    if (tag) {
      query.tags = { $in: [tag] };
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } }
      ];
    }

    const posts = await Blog.find(query)
      .sort({ publishedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Blog.countDocuments(query);

    res.status(200).json({
      success: true,
      count: posts.length,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: posts
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single blog post by slug
 * @route   GET /api/blog/:slug
 * @access  Public
 */
export const getPostBySlug = async (req, res, next) => {
  try {
    const post = await Blog.findOne({ slug: req.params.slug });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Get related posts (same category, excluding current)
    const relatedPosts = await Blog.find({
      category: post.category,
      slug: { $ne: req.params.slug }
    })
      .limit(3)
      .select('title slug thumbnail excerpt publishedAt');

    res.status(200).json({
      success: true,
      data: {
        post,
        relatedPosts
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new blog post
 * @route   POST /api/blog
 * @access  Private (Admin)
 */
export const createPost = async (req, res, next) => {
  try {
    const { title, content, excerpt, author, category, tags, readTime } = req.body;

    let thumbnail = null;

    // Handle thumbnail upload
    if (req.file) {
      thumbnail = req.file.path;
    } else if (req.body.thumbnail) {
      thumbnail = req.body.thumbnail;
    }

    const post = await Blog.create({
      title,
      content,
      excerpt,
      author,
      category,
      thumbnail,
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
      readTime: parseInt(readTime) || 5
    });

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: post
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update blog post
 * @route   PUT /api/blog/:id
 * @access  Private (Admin)
 */
export const updatePost = async (req, res, next) => {
  try {
    let post = await Blog.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    const updates = { ...req.body };

    // Handle tags as array
    if (updates.tags && typeof updates.tags === 'string') {
      updates.tags = updates.tags.split(',').map(t => t.trim());
    }

    // Handle readTime as number
    if (updates.readTime) {
      updates.readTime = parseInt(updates.readTime);
    }

    // Handle thumbnail upload
    if (req.file) {
      // Extract public_id from existing thumbnail URL if it's from Cloudinary
      if (post.thumbnail && post.thumbnail.includes('cloudinary')) {
        try {
          const publicId = post.thumbnail.split('/').pop().split('.')[0];
          await cloudinary.uploader.destroy(`devagency/blog/${publicId}`);
        } catch (err) {
          console.error('Failed to delete old thumbnail:', err);
        }
      }
      updates.thumbnail = req.file.path;
    }

    // Regenerate slug if title changed
    if (updates.title && updates.title !== post.title) {
      updates.slug = slugify(updates.title, { lower: true, strict: true, remove: /[*+~.()'"!:@]/g });
    }

    post = await Blog.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Blog post updated successfully',
      data: post
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete blog post
 * @route   DELETE /api/blog/:id
 * @access  Private (Admin)
 */
export const deletePost = async (req, res, next) => {
  try {
    const post = await Blog.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Delete thumbnail from Cloudinary if exists
    if (post.thumbnail && post.thumbnail.includes('cloudinary')) {
      try {
        const publicId = post.thumbnail.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`devagency/blog/${publicId}`);
      } catch (err) {
        console.error('Failed to delete thumbnail from Cloudinary:', err);
      }
    }

    await post.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
