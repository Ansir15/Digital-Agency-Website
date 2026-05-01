import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiClock, FiArrowRight } from 'react-icons/fi'
import { formatDate } from '../utils/formatDate'

const BlogCard = ({ post, delay = 0, featured = false }) => {
  const { title, slug, excerpt, thumbnail, category, author, publishedAt, readTime } = post

  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className="group grid md:grid-cols-2 gap-8 bg-surface rounded-2xl overflow-hidden border border-surface-light/20"
      >
        {/* Image */}
        <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
          <img
            src={thumbnail || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800'}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-accent text-white text-sm font-medium rounded-full">
              {category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex flex-col justify-center">
          <div className="flex items-center gap-4 text-muted text-sm mb-4">
            <span>{formatDate(publishedAt)}</span>
            <span className="w-1 h-1 bg-muted rounded-full" />
            <span className="flex items-center gap-1">
              <FiClock size={14} />
              {readTime} min read
            </span>
          </div>

          <h2 className="font-display font-semibold text-2xl md:text-3xl text-text mb-4 group-hover:text-accent transition-colors">
            {title}
          </h2>

          <p className="text-muted mb-6 line-clamp-3">
            {excerpt}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted">By {author}</span>
            <Link
              to={`/blog/${slug}`}
              className="inline-flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all"
            >
              Read More
              <FiArrowRight size={18} />
            </Link>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group bg-surface rounded-2xl overflow-hidden border border-surface-light/20 hover:border-accent/30 transition-all duration-300"
    >
      {/* Image */}
      <Link to={`/blog/${slug}`} className="relative aspect-[16/10] block overflow-hidden">
        <img
          src={thumbnail || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800'}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-accent/90 text-white text-xs font-medium rounded-full">
            {category}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-3 text-muted text-xs mb-3">
          <span>{formatDate(publishedAt, { month: 'short', day: 'numeric' })}</span>
          <span className="w-1 h-1 bg-muted rounded-full" />
          <span className="flex items-center gap-1">
            <FiClock size={12} />
            {readTime} min
          </span>
        </div>

        <Link to={`/blog/${slug}`}>
          <h3 className="font-display font-semibold text-lg text-text mb-2 group-hover:text-accent transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>

        <p className="text-muted text-sm mb-4 line-clamp-2">
          {excerpt}
        </p>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-dark">By {author}</span>
          <Link
            to={`/blog/${slug}`}
            className="text-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Read →
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

export default BlogCard
