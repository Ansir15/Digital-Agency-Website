import Team from '../models/Team.js';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * @desc    Get all team members
 * @route   GET /api/team
 * @access  Public
 */
export const getAllMembers = async (req, res, next) => {
  try {
    const members = await Team.find().sort({ order: 1 });

    res.status(200).json({
      success: true,
      count: members.length,
      data: members
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single team member
 * @route   GET /api/team/:id
 * @access  Public
 */
export const getMember = async (req, res, next) => {
  try {
    const member = await Team.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    res.status(200).json({
      success: true,
      data: member
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new team member
 * @route   POST /api/team
 * @access  Private (Admin)
 */
export const createMember = async (req, res, next) => {
  try {
    const { name, role, bio, order, linkedin, github, twitter } = req.body;

    let photo = null;
    let publicId = null;

    // Handle photo upload
    if (req.file) {
      photo = req.file.path;
      publicId = req.file.filename;
    } else if (req.body.photo) {
      photo = req.body.photo;
    }

    const member = await Team.create({
      name,
      role,
      bio,
      photo,
      publicId,
      order: parseInt(order) || 0,
      socialLinks: {
        linkedin: linkedin || '',
        github: github || '',
        twitter: twitter || ''
      }
    });

    res.status(201).json({
      success: true,
      message: 'Team member created successfully',
      data: member
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update team member
 * @route   PUT /api/team/:id
 * @access  Private (Admin)
 */
export const updateMember = async (req, res, next) => {
  try {
    let member = await Team.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    const updates = { ...req.body };

    // Handle order as number
    if (updates.order !== undefined) {
      updates.order = parseInt(updates.order);
    }

    // Handle social links
    if (updates.linkedin !== undefined || updates.github !== undefined || updates.twitter !== undefined) {
      updates.socialLinks = {
        linkedin: updates.linkedin || member.socialLinks?.linkedin || '',
        github: updates.github || member.socialLinks?.github || '',
        twitter: updates.twitter || member.socialLinks?.twitter || ''
      };
      delete updates.linkedin;
      delete updates.github;
      delete updates.twitter;
    }

    // Handle photo upload
    if (req.file) {
      // Delete old photo from Cloudinary if exists
      if (member.publicId) {
        try {
          await cloudinary.uploader.destroy(member.publicId);
        } catch (err) {
          console.error('Failed to delete old photo:', err);
        }
      }
      updates.photo = req.file.path;
      updates.publicId = req.file.filename;
    }

    member = await Team.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Team member updated successfully',
      data: member
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete team member
 * @route   DELETE /api/team/:id
 * @access  Private (Admin)
 */
export const deleteMember = async (req, res, next) => {
  try {
    const member = await Team.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    // Delete photo from Cloudinary if exists
    if (member.publicId) {
      try {
        await cloudinary.uploader.destroy(member.publicId);
      } catch (err) {
        console.error('Failed to delete photo from Cloudinary:', err);
      }
    }

    await member.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Team member deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update member order (bulk reorder)
 * @route   PUT /api/team/reorder
 * @access  Private (Admin)
 */
export const reorderMembers = async (req, res, next) => {
  try {
    const { orders } = req.body; // Array of { id, order }

    if (!Array.isArray(orders)) {
      return res.status(400).json({
        success: false,
        message: 'Orders array is required'
      });
    }

    // Update all member orders in parallel
    await Promise.all(
      orders.map(({ id, order }) =>
        Team.findByIdAndUpdate(id, { order: parseInt(order) })
      )
    );

    const members = await Team.find().sort({ order: 1 });

    res.status(200).json({
      success: true,
      message: 'Team members reordered successfully',
      data: members
    });
  } catch (error) {
    next(error);
  }
};
