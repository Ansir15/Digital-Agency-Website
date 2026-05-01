import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { FiSearch } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { fetchPosts } from '../redux/slices/blogSlice'
import BlogCard from '../components/BlogCard'

const categories = ['All', 'Development', 'Design', 'Marketing', 'Business', 'Technology']

const Blog = () => {
  const dispatch = useDispatch()
  const { posts, isLoading } = useSelector((state) => state.blog)
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    dispatch(fetchPosts({ 
      category: activeCategory === 'All' ? '' : activeCategory,
      search: searchQuery
    }))
  }, [dispatch, activeCategory, searchQuery])

  const featuredPost = posts[0]
  const regularPosts = posts.slice(1)

  return (
    <>
      <Helmet>
        <title>Blog | DevAgency</title>
        <meta name="description" content="Insights, tutorials, and perspectives on web development, design, and digital innovation from the DevAgency team." />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 pb-20 mesh-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <nav className="flex gap-2 text-sm text-muted mb-6">
              <Link to="/" className="hover:text-accent transition-colors">Home</Link>
              <span>/</span>
              <span className="text-text">Blog</span>
            </nav>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-text mb-6">
              Insights & Perspectives
            </h1>
            <p className="text-muted text-lg md:text-xl">
              Thoughts on design, development, and digital innovation
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 bg-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BlogCard post={featuredPost} featured={true} />
          </div>
        </section>
      )}

      {/* Filter & Search */}
      <section className="py-8 bg-primary border-b border-surface-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeCategory === category
                      ? 'bg-accent text-white'
                      : 'bg-surface text-muted hover:text-text border border-surface-light/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 pl-11 pr-4 py-3 bg-surface border border-surface-light/20 rounded-lg text-text placeholder-muted focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
            </div>
          ) : (
            <>
              {regularPosts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularPosts.map((post, index) => (
                    <BlogCard
                      key={post._id}
                      post={post}
                      delay={index * 0.1}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-muted text-lg">No articles found</p>
                  <button
                    onClick={() => {
                      setActiveCategory('All')
                      setSearchQuery('')
                    }}
                    className="mt-4 text-accent hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}

export default Blog
