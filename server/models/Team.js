import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    trim: true
  },
  bio: {
    type: String,
    required: [true, 'Bio is required'],
    maxlength: [500, 'Bio must not exceed 500 characters']
  },
  photo: {
    type: String,
    default: null
  },
  publicId: {
    type: String,
    default: null
  },
  socialLinks: {
    linkedin: { type: String, default: '' },
    github: { type: String, default: '' },
    twitter: { type: String, default: '' }
  },
  order: {
    type: Number,
    default: 0
  }
});

// Index for ordering
teamSchema.index({ order: 1 });

const Team = mongoose.model('Team', teamSchema);

export default Team;
