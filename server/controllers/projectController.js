import Project from '../models/Project.js';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * @desc    Get all projects
 * @route   GET /api/projects
 * @access  Public
 */
export const getAllProjects = async (req, res, next) => {
  try {
    const { category, featured, page = 1, limit = 12 } = req.query;
    
    const query = {};
    if (category && category !== 'All') {
      query.category = category;
    }
    if (featured !== undefined) {
      query.featured = featured === 'true';
    }

    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Project.countDocuments(query);

    res.status(200).json({
      success: true,
      count: projects.length,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: projects
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single project
 * @route   GET /api/projects/:id
 * @access  Public
 */
export const getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new project
 * @route   POST /api/projects
 * @access  Private (Admin)
 */
export const createProject = async (req, res, next) => {
  try {
    const { title, category, description, techStack, liveUrl, githubUrl, featured } = req.body;
    
    let imageUrl = '';
    let publicId = null;

    // Handle image upload
    if (req.file) {
      imageUrl = req.file.path;
      publicId = req.file.filename;
    } else if (req.body.imageUrl) {
      imageUrl = req.body.imageUrl;
    } else {
      return res.status(400).json({
        success: false,
        message: 'Project image is required'
      });
    }

    const project = await Project.create({
      title,
      category,
      description,
      techStack: techStack ? techStack.split(',').map(t => t.trim()) : [],
      imageUrl,
      publicId,
      liveUrl: liveUrl || '',
      githubUrl: githubUrl || '',
      featured: featured === 'true' || featured === true
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update project
 * @route   PUT /api/projects/:id
 * @access  Private (Admin)
 */
export const updateProject = async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const updates = { ...req.body };

    // Handle techStack as array
    if (updates.techStack && typeof updates.techStack === 'string') {
      updates.techStack = updates.techStack.split(',').map(t => t.trim());
    }

    // Handle featured boolean
    if (updates.featured !== undefined) {
      updates.featured = updates.featured === 'true' || updates.featured === true;
    }

    // Handle image upload
    if (req.file) {
      // Delete old image from Cloudinary if exists
      if (project.publicId) {
        try {
          await cloudinary.uploader.destroy(project.publicId);
        } catch (err) {
          console.error('Failed to delete old image:', err);
        }
      }
      updates.imageUrl = req.file.path;
      updates.publicId = req.file.filename;
    }

    project = await Project.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete project
 * @route   DELETE /api/projects/:id
 * @access  Private (Admin)
 */
export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Delete image from Cloudinary if exists
    if (project.publicId) {
      try {
        await cloudinary.uploader.destroy(project.publicId);
      } catch (err) {
        console.error('Failed to delete image from Cloudinary:', err);
      }
    }

    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
