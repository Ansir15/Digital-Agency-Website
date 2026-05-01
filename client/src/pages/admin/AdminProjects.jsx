import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiPlus, FiEdit2, FiTrash2, FiX, FiLoader, FiImage, FiExternalLink, FiGithub } from 'react-icons/fi'
import { fetchProjects, createProject, updateProject, deleteProject } from '../../redux/slices/projectSlice'

const categories = ['Web App', 'E-Commerce', 'UI-UX', 'Mobile', 'Brand Identity']

const AdminProjects = () => {
  const dispatch = useDispatch()
  const { projects, isLoading } = useSelector((state) => state.projects)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    techStack: '',
    liveUrl: '',
    githubUrl: '',
    featured: false,
    image: null,
  })
  const [previewImage, setPreviewImage] = useState(null)

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target
    if (type === 'file') {
      setFormData(prev => ({ ...prev, image: files[0] }))
      if (files[0]) {
        setPreviewImage(URL.createObjectURL(files[0]))
      }
    } else if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const data = new FormData()
    Object.keys(formData).forEach(key => {
      if (key === 'image' && formData[key]) {
        data.append(key, formData[key])
      } else {
        data.append(key, formData[key])
      }
    })

    if (editingProject) {
      await dispatch(updateProject({ id: editingProject._id, formData: data }))
    } else {
      await dispatch(createProject(data))
    }
    
    closeModal()
    dispatch(fetchProjects())
  }

  const handleEdit = (project) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      techStack: project.techStack?.join(', ') || '',
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      featured: project.featured,
      image: null,
    })
    setPreviewImage(project.imageUrl)
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    await dispatch(deleteProject(id))
    setDeleteConfirm(null)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingProject(null)
    setFormData({
      title: '',
      category: '',
      description: '',
      techStack: '',
      liveUrl: '',
      githubUrl: '',
      featured: false,
      image: null,
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
              <h1 className="font-display font-semibold text-xl text-text">Projects</h1>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accentLight transition-colors"
            >
              <FiPlus size={18} />
              Add Project
            </button>
          </div>
        </header>

        <div className="p-8">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <FiLoader className="animate-spin text-accent" size={32} />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <motion.div
                  key={project._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-surface rounded-xl border border-surface-light/20 overflow-hidden"
                >
                  <div className="relative aspect-video">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    {project.featured && (
                      <span className="absolute top-2 left-2 px-2 py-1 bg-accent text-white text-xs rounded">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-muted">{project.category}</span>
                    <h3 className="font-medium text-text mt-1 mb-2">{project.title}</h3>
                    <p className="text-sm text-muted line-clamp-2 mb-3">{project.description}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-surface-light rounded text-sm text-muted hover:text-text transition-colors"
                      >
                        <FiEdit2 size={14} />
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(project._id)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-red-500/10 text-red-400 rounded text-sm hover:bg-red-500/20 transition-colors"
                      >
                        <FiTrash2 size={14} />
                        Delete
                      </button>
                    </div>
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
            className="bg-surface rounded-xl border border-surface-light/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-surface border-b border-surface-light/20 p-6 flex items-center justify-between">
              <h2 className="font-display font-semibold text-xl text-text">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h2>
              <button onClick={closeModal} className="text-muted hover:text-text">
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
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
              <div>
                <label className="block text-sm font-medium text-text mb-2">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 bg-primary border border-surface-light/20 rounded-lg text-text focus:border-accent resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  name="techStack"
                  value={formData.techStack}
                  onChange={handleInputChange}
                  placeholder="React, Node.js, MongoDB"
                  className="w-full px-4 py-3 bg-primary border border-surface-light/20 rounded-lg text-text focus:border-accent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Live URL</label>
                  <input
                    type="url"
                    name="liveUrl"
                    value={formData.liveUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-primary border border-surface-light/20 rounded-lg text-text focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">GitHub URL</label>
                  <input
                    type="url"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-primary border border-surface-light/20 rounded-lg text-text focus:border-accent"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded border-surface-light/20"
                />
                <label className="text-sm text-text">Featured Project</label>
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">{editingProject ? 'Change Image' : 'Image *'}</label>
                <input
                  type="file"
                  name="image"
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
                  {editingProject ? 'Update' : 'Create'}
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
            <p className="text-muted mb-6">Are you sure you want to delete this project? This action cannot be undone.</p>
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

export default AdminProjects
