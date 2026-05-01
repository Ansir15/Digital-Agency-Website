import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowLeft, FiMail, FiCheck, FiTrash2, FiEye, FiEyeOff, FiLoader } from 'react-icons/fi'
import { formatDate, formatRelativeTime } from '../../utils/formatDate'
import { fetchMessages, toggleMessageRead, deleteMessage } from '../../redux/slices/contactSlice'

const AdminMessages = () => {
  const dispatch = useDispatch()
  const { messages, isLoading, stats } = useSelector((state) => state.contact)
  const [expandedId, setExpandedId] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  useEffect(() => {
    dispatch(fetchMessages())
  }, [dispatch])

  const handleToggleRead = (id) => {
    dispatch(toggleMessageRead(id))
  }

  const handleDelete = (id) => {
    dispatch(deleteMessage(id))
    setDeleteConfirm(null)
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
          <div className="flex items-center gap-4">
            <Link to="/admin/dashboard" className="text-muted hover:text-text transition-colors">
              <FiArrowLeft size={20} />
            </Link>
            <h1 className="font-display font-semibold text-xl text-text">Messages</h1>
            <span className="ml-4 px-3 py-1 bg-accent/10 text-accent text-sm rounded-full">
              {stats.unread} unread
            </span>
          </div>
        </header>

        <div className="p-8">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <FiLoader className="animate-spin text-accent" size={32} />
            </div>
          ) : (
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="text-center py-12 text-muted">
                  <FiMail size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No messages yet</p>
                </div>
              ) : (
                messages.map((message) => (
                  <motion.div
                    key={message._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`bg-surface rounded-xl border transition-all ${
                      message.isRead 
                        ? 'border-surface-light/20' 
                        : 'border-accent/30 bg-accent/5'
                    }`}
                  >
                    {/* Message Header */}
                    <div
                      className="p-6 cursor-pointer"
                      onClick={() => setExpandedId(expandedId === message._id ? null : message._id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-3 h-3 rounded-full ${message.isRead ? 'bg-muted' : 'bg-accent'}`} />
                          <div>
                            <h3 className="font-medium text-text">{message.name}</h3>
                            <p className="text-sm text-muted">{message.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm text-muted">{formatRelativeTime(message.createdAt)}</span>
                          <span className="ml-4 px-2 py-1 bg-surface-light rounded text-xs text-muted">
                            {message.service}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-4 text-sm text-muted">
                        <span>Budget: {message.budget}</span>
                        <span>Ref: {message.referenceId}</span>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {expandedId === message._id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-2 border-t border-surface-light/20">
                            <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm">
                              {message.phone && (
                                <div>
                                  <span className="text-muted">Phone:</span>
                                  <span className="ml-2 text-text">{message.phone}</span>
                                </div>
                              )}
                              {message.company && (
                                <div>
                                  <span className="text-muted">Company:</span>
                                  <span className="ml-2 text-text">{message.company}</span>
                                </div>
                              )}
                            </div>
                            <div className="bg-primary p-4 rounded-lg mb-4">
                              <p className="text-text whitespace-pre-wrap">{message.message}</p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleToggleRead(message._id)}
                                className="flex items-center gap-2 px-4 py-2 bg-surface-light rounded-lg text-sm text-muted hover:text-text transition-colors"
                              >
                                {message.isRead ? <FiEyeOff size={16} /> : <FiCheck size={16} />}
                                Mark as {message.isRead ? 'unread' : 'read'}
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(message._id)}
                                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg text-sm hover:bg-red-500/20 transition-colors"
                              >
                                <FiTrash2 size={16} />
                                Delete
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))
              )}
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/80 backdrop-blur-sm p-4">
          <div className="bg-surface p-6 rounded-xl border border-surface-light/20 max-w-md w-full">
            <h3 className="font-display font-semibold text-lg text-text mb-2">Confirm Delete</h3>
            <p className="text-muted mb-6">Are you sure you want to delete this message? This action cannot be undone.</p>
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

export default AdminMessages
