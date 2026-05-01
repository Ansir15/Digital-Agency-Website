import Contact from '../models/Contact.js';
import { sendAgencyEmail, sendClientAutoReply } from '../utils/sendEmail.js';

/**
 * @desc    Get all contact messages
 * @route   GET /api/contact
 * @access  Private (Admin)
 */
export const getAllMessages = async (req, res, next) => {
  try {
    const { isRead, page = 1, limit = 10 } = req.query;
    
    const query = {};
    if (isRead !== undefined) {
      query.isRead = isRead === 'true';
    }

    const messages = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Contact.countDocuments(query);

    res.status(200).json({
      success: true,
      count: messages.length,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: messages
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single message
 * @route   GET /api/contact/:id
 * @access  Private (Admin)
 */
export const getMessage = async (req, res, next) => {
  try {
    const message = await Contact.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.status(200).json({
      success: true,
      data: message
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Submit contact form
 * @route   POST /api/contact
 * @access  Public
 */
export const submitContact = async (req, res, next) => {
  try {
    const { name, email, phone, company, service, budget, message, attachment } = req.body;

    // Create contact entry
    const contact = await Contact.create({
      name,
      email,
      phone: phone || '',
      company: company || '',
      service,
      budget,
      message,
      attachment: attachment || null
    });

    // Send email to agency
    try {
      await sendAgencyEmail(contact);
    } catch (emailError) {
      console.error('Failed to send agency email:', emailError);
    }

    // Send auto-reply to client
    try {
      await sendClientAutoReply(email, name, contact.referenceId);
    } catch (emailError) {
      console.error('Failed to send client auto-reply:', emailError);
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      referenceId: contact.referenceId,
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        referenceId: contact.referenceId,
        createdAt: contact.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Toggle message read status
 * @route   PATCH /api/contact/:id/read
 * @access  Private (Admin)
 */
export const toggleReadStatus = async (req, res, next) => {
  try {
    const message = await Contact.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    message.isRead = !message.isRead;
    await message.save();

    res.status(200).json({
      success: true,
      message: `Message marked as ${message.isRead ? 'read' : 'unread'}`,
      data: message
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete message
 * @route   DELETE /api/contact/:id
 * @access  Private (Admin)
 */
export const deleteMessage = async (req, res, next) => {
  try {
    const message = await Contact.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    await message.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get message stats
 * @route   GET /api/contact/stats
 * @access  Private (Admin)
 */
export const getStats = async (req, res, next) => {
  try {
    const total = await Contact.countDocuments();
    const unread = await Contact.countDocuments({ isRead: false });
    const today = await Contact.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    });

    res.status(200).json({
      success: true,
      data: {
        total,
        unread,
        today
      }
    });
  } catch (error) {
    next(error);
  }
};
