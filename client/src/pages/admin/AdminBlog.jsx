import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiPlus, FiEdit2, FiTrash2, FiX, FiLoader, FiExternalLink } from 'react-icons/fi'
import { fetchPosts, createPost, updatePost, deletePost } from '../../redux/slices/blogSlice'
import { formatDate } from '../../utils/formatDate'

const categories = ['Development', 'Design', 'Marketing', 'Business', 'Technology']

const AdminBlog = () => {
  const dispatch = useDispatch()
  const { posts, isLoading } = useSelector((state) => state.blog)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPost, setEditingPost] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    author: '',
    excerpt: '',
    content: '',
    tags: '',
    readTime: 5,
    thumbnail: null,
  })
  const [previewImage, setPreviewImage] = useState(null)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target
    if (type === 'file') {
      setFormData(prev => ({ ...prev, thumbnail: files[0] }))
      if (files[0]) {
        setPreviewImage(URL.createObjectURL(files[0]))
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const data = new FormData()
    Object.keys(formData).forEach(key => {
      if (key === 'thumbnail' && formData[key]) {
        data.append(key, formData[key])
      } else {
        data.append(key, formData[key])
      }
    })

    if (editingPost) {
      await dispatch(updatePost({ id: editingPost._id, formData: data }))
    } else {
      await dispatch(createPost(data))
    }
    
    closeModal()
    dispatch(fetchPosts())
  }

  const handleEdit = (post) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      category: post.category,
      author: post.author,
      excerpt: post.excerpt,
      content: post.content,
      tags: post.tags?.join(', ') || '',
      readTime: post.readTime || 5,
      thumbnail: null,
    })
    setPreviewImage(post.thumbnail)
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    await dispatch(deletePost(id))
    setDeleteConfirm(null)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingPost(null)
    setFormData({
      title: '',
      category: '',
      author: '',
      excerpt: '',
      content: '',
      tags: '',
      readTime: 5,
      thumbnail: null,
    })
    setPreviewImage(null)
  }

  const sidebarLinks = [
    { path: '/admin/dashboard', label: 'Dashboard' },
    { path: '/admin/messages', label: 'Messages' },
    { path: '/admin/projects', label: 'Projects' },
    { path: '/admin/blog', label: 'Blog' },
    { path: '/admin/team', label: 'Team' },
  ]

  return (
    <div className="min-h-screen bg-primary flex">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-surface-light/20 flex-shrink-0">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-display font-bold text-xl">D</span>
            </div>
            <span className="font-display font-semibold text-lg text-text">DevAgency</span>
          </Link>
        </div>
        <nav className="px-4 py-4 space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === link.path
                  ? 'bg-accent/10 text-accent'
                  : 'text-muted hover:text-text hover:bg-surface-light/50'
              }`}
            >
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-surface border-b border-surface-light/20 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard" className="text-muted hover:text-text transition-colors">
                <FiArrowLeft size={20} />
              </Link>
              <h1 className="font-display font-semibold text-xl text-text">Blog Posts</h1>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accentLight transition-colors"
            >
              <FiPlus size={18} />
              New Post
            </button>
          </div>
        </header>

        <div className="p-8">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <FiLoader className="animate-spin text-accent" size={32} />
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <motion.div
                  key={post._id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-surface rounded-xl border border-surface-light/20 p-4 flex items-center gap-4"
                >
                  <img
                    src={post.thumbnail || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200'}
                    alt={post.title}
                    className="w-24 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs px-2 py-0.5 bg-accent/10 text-accent rounded">{post.category}</span>
                      <span className="text-xs text-muted">{formatDate(post.publishedAt)}</span>
                    </div>
                    <h3 className="font-medium text-text truncate">{post.title}</h3>
                    <p className="text-sm text-muted truncate">By {post.author}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-muted hover:text-accent transition-colors"
                    >
                      <FiExternalLink size={18} />
                    </a>
                    <button
                      onClick={() => handleEdit(post)}
                      className="p-2 text-muted hover:text-accent transition-colors"
                    >
                      <FiEdit2 size={18} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(post._id)}
                      className="p-2 text-muted hover:text-red-400 transition-colors"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/80 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface rounded-xl border border-surface-light/20 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-surface border-b border-surface-light/20 p-6 flex items-center justify-between">
              <h2 className="font-display font-semibold text-xl text-text">
                {editingPost ? 'Edit Post' : 'New Post'}
              </h2>
              <button onClick={closeModal} className="text-muted hover:text-text">
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-primary border border-surface-light/20 rounded-lg text-text focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-primary border border-surface-light/20 rounded-lg text-text focus:border-accent"
                  >
                    <option value="">Select category</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">Author *</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-primary border border-surface-light/20 rounded-lg text-text focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">Excerpt *</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  required
                  rows={2}
                  maxLength={300}
                  className="w-full px-4 py-3 bg-primary border border-surface-light/20 rounded-lg text-text focus:border-accent resize-none"
                />
                <span className="text-xs text-muted">{formData.excerpt.length}/300</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">Content (HTML) *</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  rows={8}
                  className="w-full px-4 py-3 bg-primary border border-surface-light/20 rounded-lg text-text focus:border-accent resize-none font-mono text-sm"
                  placeholder="<p>Your content here...</p>"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Tags (comma separated)</label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="react, javascript, tutorial"
                    className="w-full px-4 py-3 bg-primary border border-surface-light/20 rounded-lg text-text focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Read Time (minutes)</label>
                  <input
                    type="number"
                    name="readTime"
                    value={formData.readTime}
                    onChange={handleInputChange}
                    min={1}
                    className="w-full px-4 py-3 bg-primary border border-surface-light/20 rounded-lg text-text focus:border-accent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">{editingPost ? 'Change Thumbnail' : 'Thumbnail'}</label>
                <input
                  type="file"
                  name="thumbnail"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-primary border border-surface-light/20 rounded-lg text-text file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-accent file:text-white"
                />
                {previewImage && (
                  <img src={previewImage} alt="Preview" className="mt-4 w-full h-48 object-cover rounded-lg" />
                )}
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-3 bg-surface-light rounded-lg text-muted hover:text-text transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-accent text-white rounded-lg hover:bg-accentLight transition-colors"
                >
                  {editingPost ? 'Update' : 'Publish'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/80 backdrop-blur-sm p-4">
          <div className="bg-surface p-6 rounded-xl border border-surface-light/20 max-w-md w-full">
            <h3 className="font-display font-semibold text-lg text-text mb-2">Confirm Delete</h3>
            <p className="text-muted mb-6">Are you sure you want to delete this post? This action cannot be undone.</p>
            <div className="flex gap-4">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 bg-surface-light rounded-lg text-muted hover:text-text transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminBlog
