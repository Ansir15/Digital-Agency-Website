import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Web App', 'E-Commerce', 'UI-UX', 'Mobile', 'Brand Identity']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [50, 'Description must be at least 50 characters']
  },
  techStack: [{
    type: String,
    trim: true
  }],
  imageUrl: {
    type: String,
    required: [true, 'Project image is required']
  },
  publicId: {
    type: String,
    default: null
  },
  liveUrl: {
    type: String,
    trim: true,
    default: ''
  },
  githubUrl: {
    type: String,
    trim: true,
    default: ''
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
projectSchema.index({ category: 1, featured: 1 });
projectSchema.index({ createdAt: -1 });

const Project = mongoose.model('Project', projectSchema);

export default Project;
