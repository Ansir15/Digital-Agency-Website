import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { FiArrowLeft, FiClock, FiCalendar, FiTag, FiArrowRight } from 'react-icons/fi'
import { fetchPostBySlug, clearCurrentPost } from '../redux/slices/blogSlice'
import { formatDate } from '../utils/formatDate'

const BlogDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentPost, relatedPosts, isLoading, error } = useSelector((state) => state.blog)

  useEffect(() => {
    dispatch(fetchPostBySlug(slug))
    
    return () => {
      dispatch(clearCurrentPost())
    }
  }, [dispatch, slug])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    )
  }

  if (error || !currentPost) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display font-bold text-2xl text-text mb-4">Article Not Found</h2>
          <p className="text-muted mb-6">The article you're looking for doesn't exist.</p>
          <Link to="/blog" className="text-accent hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  const { title, content, excerpt, author, category, thumbnail, tags, readTime, publishedAt } = currentPost

  return (
    <>
      <Helmet>
        <title>{title} | DevAgency Blog</title>
        <meta name="description" content={excerpt} />
      </Helmet>

      {/* Header Image */}
      <div className="relative h-[50vh] min-h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/50 to-primary z-10" />
        <img
          src={thumbnail || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200'}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <article className="relative z-20 -mt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors mb-8"
            >
              <FiArrowLeft size={18} />
              Back to Blog
            </Link>
          </motion.div>

          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <span className="inline-block px-4 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full mb-4">
              {category}
            </span>
            <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-text mb-6">
              {title}
            </h1>
            
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-muted">
              <div className="flex items-center gap-2">
                <FiCalendar size={16} />
                <span>{formatDate(publishedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiClock size={16} />
                <span>{readTime} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <span>By</span>
                <span className="text-text font-medium">{author}</span>
              </div>
            </div>
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="prose prose-invert prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* Tags */}
          {tags && tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-2 mb-12 pt-8 border-t border-surface-light/20"
            >
              <FiTag className="text-muted" size={16} />
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-surface text-muted text-sm rounded-lg"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          )}

          {/* Author Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-6 bg-surface rounded-2xl border border-surface-light/20 mb-16"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center">
                <span className="font-display font-semibold text-xl text-accent">
                  {author.charAt(0)}
                </span>
              </div>
              <div>
                <h4 className="font-medium text-text">{author}</h4>
                <p className="text-muted text-sm">Content Writer at DevAgency</p>
              </div>
            </div>
          </motion.div>

          {/* Related Posts */}
          {relatedPosts && relatedPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h3 className="font-display font-semibold text-2xl text-text mb-6">
                Related Articles
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((post) => (
                  <Link
                    key={post._id}
                    to={`/blog/${post.slug}`}
                    className="group"
                  >
                    <div className="aspect-video rounded-xl overflow-hidden mb-4">
                      <img
                        src={post.thumbnail || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400'}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <h4 className="font-medium text-text group-hover:text-accent transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-muted text-sm mt-2 line-clamp-2">
                      {post.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </article>
    </>
  )
}

export default BlogDetail
