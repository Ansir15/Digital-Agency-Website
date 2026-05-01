import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  phone: {
    type: String,
    trim: true,
    default: ''
  },
  company: {
    type: String,
    trim: true,
    default: ''
  },
  service: {
    type: String,
    required: [true, 'Service selection is required'],
    enum: ['Web Development', 'UI/UX Design', 'SEO Optimization', 'Brand Identity', 'E-Commerce', 'Mobile Apps', 'Other']
  },
  budget: {
    type: String,
    required: [true, 'Budget range is required'],
    enum: ['Under $500', '$500-2K', '$2K-5K', '$5K+']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    minlength: [20, 'Message must be at least 20 characters']
  },
  attachment: {
    type: String,
    default: null
  },
  isRead: {
    type: Boolean,
    default: false
  },
  referenceId: {
    type: String,
    unique: true,
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Auto-generate reference ID before saving
contactSchema.pre('save', function(next) {
  if (!this.referenceId) {
    this.referenceId = `DEV-${uuidv4().slice(0, 8).toUpperCase()}`;
  }
  next();
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
