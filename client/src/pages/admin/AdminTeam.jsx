import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiPlus, FiEdit2, FiTrash2, FiX, FiLoader, FiLinkedin, FiGithub, FiTwitter, FiMove } from 'react-icons/fi'
import { fetchAllMembers, createMember, updateMember, deleteMember, reorderMembers } from '../../redux/slices/teamSlice'

const AdminTeam = () => {
  const dispatch = useDispatch()
  const { members, isLoading } = useSelector((state) => state.team)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingMember, setEditingMember] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [draggedIndex, setDraggedIndex] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    linkedin: '',
    github: '',
    twitter: '',
    order: 0,
    photo: null,
  })
  const [previewImage, setPreviewImage] = useState(null)

  useEffect(() => {
    dispatch(fetchAllMembers())
  }, [dispatch])

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target
    if (type === 'file') {
      setFormData(prev => ({ ...prev, photo: files[0] }))
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
      if (key === 'photo' && formData[key]) {
        data.append(key, formData[key])
      } else if (!['linkedin', 'github', 'twitter'].includes(key)) {
        data.append(key, formData[key])
      }
    })
    data.append('linkedin', formData.linkedin)
    data.append('github', formData.github)
    data.append('twitter', formData.twitter)

    if (editingMember) {
      await dispatch(updateMember({ id: editingMember._id, formData: data }))
    } else {
      await dispatch(createMember(data))
    }
    
    closeModal()
    dispatch(fetchAllMembers())
  }

  const handleEdit = (member) => {
    setEditingMember(member)
    setFormData({
      name: member.name,
      role: member.role,
      bio: member.bio,
      linkedin: member.socialLinks?.linkedin || '',
      github: member.socialLinks?.github || '',
      twitter: member.socialLinks?.twitter || '',
      order: member.order,
      photo: null,
    })
    setPreviewImage(member.photo)
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    await dispatch(deleteMember(id))
    setDeleteConfirm(null)
  }

  const handleDragStart = (index) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e, index) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return

    const newMembers = [...members]
    const draggedItem = newMembers[draggedIndex]
    newMembers.splice(draggedIndex, 1)
    newMembers.splice(index, 0, draggedItem)
    
    // Update order in the array
    const updatedOrders = newMembers.map((member, i) => ({ id: member._id, order: i }))
    dispatch(reorderMembers(updatedOrders))
    setDraggedIndex(index)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingMember(null)
    setFormData({
      name: '',
      role: '',
      bio: '',
      linkedin: '',
      github: '',
      twitter: '',
      order: 0,
      photo: null,
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
              <h1 className="font-display font-semibold text-xl text-text">Team Members</h1>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accentLight transition-colors"
            >
              <FiPlus size={18} />
              Add Member
            </button>
          </div>
        </header>

        <div className="p-8">
          <p className="text-muted text-sm mb-6">Drag members to reorder</p>
          {isLoading ? (
            <div className="flex justify-center py-12">
              <FiLoader className="animate-spin text-accent" size={32} />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map((member, index) => (
                <motion.div
                  key={member._id}
                  layout
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`bg-surface rounded-xl border border-surface-light/20 overflow-hidden cursor-move ${
                    draggedIndex === index ? 'opacity-50' : ''
                  }`}
                >
                  <div className="relative">
                    <div className="aspect-square">
                      <img
                        src={member.photo || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400'}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute top-2 right-2">
                      <span className="w-8 h-8 bg-surface rounded-lg flex items-center justify-center text-muted">
                        <FiMove size={16} />
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-text">{member.name}</h3>
                    <p className="text-sm text-accent mb-3">{member.role}</p>
                    <div className="flex items-center gap-2 mb-3">
                      {member.socialLinks?.linkedin && (
                        <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent">
                          <FiLinkedin size={16} />
                        </a>
                      )}
                      {member.socialLinks?.github && (
                        <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent">
                          <FiGithub size={16} />
                        </a>
                      )}
                      {member.socialLinks?.twitter && (
                        <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent">
                          <FiTwitter size={16} />
                        </a>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(member)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-surface-light rounded text-sm text-muted hover:text-text transition-colors"
                      >
                        <FiEdit2 size={14} />
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(member._id)}
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
            className="bg-surface rounded-xl border border-surface-light/20 w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-surface border-b border-surface-light/20 p-6 flex items-center justify-between">
              <h2 className="font-display font-semibold text-xl text-text">
                {editingMember ? 'Edit Member' : 'Add Team Member'}
              </h2>
              <button onClick={closeModal} className="text-muted hover:text-text">
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-primary border border-surface-light/20 rounded-lg text-text focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">Role *</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-primary border border-surface-light/20 rounded-lg text-text focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">Bio *</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  maxLength={500}
                  className="w-full px-4 py-3 bg-primary border border-surface-light/20 rounded-lg text-text focus:border-accent resize-none"
                />
                <span className="text-xs text-muted">{formData.bio.length}/500</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">Order</label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleInputChange}
                  min={0}
                  className="w-full px-4 py-3 bg-primary border border-surface-light/20 rounded-lg text-text focus:border-accent"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">LinkedIn</label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-primary border border-surface-light/20 rounded-lg text-text focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">GitHub</label>
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-primary border border-surface-light/20 rounded-lg text-text focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Twitter</label>
                  <input
                    type="url"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-primary border border-surface-light/20 rounded-lg text-text focus:border-accent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">{editingMember ? 'Change Photo' : 'Photo'}</label>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-primary border border-surface-light/20 rounded-lg text-text file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-accent file:text-white"
                />
                {previewImage && (
                  <img src={previewImage} alt="Preview" className="mt-4 w-32 h-32 object-cover rounded-lg" />
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
                  {editingMember ? 'Update' : 'Add'}
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
            <p className="text-muted mb-6">Are you sure you want to remove this team member? This action cannot be undone.</p>
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

export default AdminTeam
