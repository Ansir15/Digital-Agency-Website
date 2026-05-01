import mongoose from 'mongoose';
import slugify from 'slugify';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog title is required'],
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    index: true
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    maxlength: [300, 'Excerpt must not exceed 300 characters']
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Development', 'Design', 'Marketing', 'Business', 'Technology']
  },
  thumbnail: {
    type: String,
    default: null
  },
  tags: [{
    type: String,
    trim: true
  }],
  readTime: {
    type: Number,
    default: 5
  },
  publishedAt: {
    type: Date,
    default: Date.now
  }
});

// Auto-generate slug from title before saving
blogSchema.pre('save', function(next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true, remove: /[*+~.()'"!:@]/g });
  }
  next();
});

// Index for faster queries
blogSchema.index({ category: 1, publishedAt: -1 });
blogSchema.index({ tags: 1 });

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
