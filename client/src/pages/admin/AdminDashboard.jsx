import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiGrid, FiMessageSquare, FiFolder, FiFileText, FiUsers, FiLogOut } from 'react-icons/fi'
import { logout } from '../../redux/slices/authSlice'
import { fetchMessageStats } from '../../redux/slices/contactSlice'
import { fetchProjects } from '../../redux/slices/projectSlice'
import { fetchPosts } from '../../redux/slices/blogSlice'
import { fetchAllMembers } from '../../redux/slices/teamSlice'

const sidebarLinks = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: FiGrid },
  { path: '/admin/messages', label: 'Messages', icon: FiMessageSquare },
  { path: '/admin/projects', label: 'Projects', icon: FiFolder },
  { path: '/admin/blog', label: 'Blog', icon: FiFileText },
  { path: '/admin/team', label: 'Team', icon: FiUsers },
]

const StatCard = ({ icon: Icon, label, value, color = 'accent' }) => (
  <div className="bg-surface p-6 rounded-xl border border-surface-light/20">
    <div className={`w-12 h-12 bg-${color}/10 rounded-lg flex items-center justify-center mb-4`}>
      <Icon className={`text-${color}`} size={24} />
    </div>
    <p className="text-muted text-sm mb-1">{label}</p>
    <p className="font-display font-bold text-2xl text-text">{value}</p>
  </div>
)

const AdminDashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { admin } = useSelector((state) => state.auth)
  const { stats } = useSelector((state) => state.contact)
  const { projects } = useSelector((state) => state.projects)
  const { posts } = useSelector((state) => state.blog)
  const { members } = useSelector((state) => state.team || { members: [] })

  useEffect(() => {
    dispatch(fetchMessageStats())
    dispatch(fetchProjects())
    dispatch(fetchPosts())
    dispatch(fetchAllMembers())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-primary flex">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-surface-light/20 flex-shrink-0">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-display font-bold text-xl">D</span>
            </div>
            <span className="font-display font-semibold text-lg text-text">
              DevAgency
            </span>
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
              <link.icon size={20} />
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-muted hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
          >
            <FiLogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-surface border-b border-surface-light/20 px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="font-display font-semibold text-xl text-text">
              Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-muted">Welcome, {admin?.email}</span>
              <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                <span className="text-accent font-medium">
                  {admin?.email?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={FiMessageSquare}
              label="Total Messages"
              value={stats.total}
            />
            <StatCard
              icon={FiMessageSquare}
              label="Unread Messages"
              value={stats.unread}
              color="yellow"
            />
            <StatCard
              icon={FiFolder}
              label="Total Projects"
              value={projects.length}
            />
            <StatCard
              icon={FiFileText}
              label="Blog Posts"
              value={posts.length}
            />
          </div>

          {/* Recent Activity */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <div className="bg-surface rounded-xl border border-surface-light/20 p-6">
              <h2 className="font-display font-semibold text-lg text-text mb-6">
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <Link
                  to="/admin/projects"
                  className="p-4 bg-primary rounded-lg border border-surface-light/20 hover:border-accent/30 transition-colors text-center"
                >
                  <FiFolder className="mx-auto mb-2 text-accent" size={24} />
                  <span className="text-sm text-muted">Add Project</span>
                </Link>
                <Link
                  to="/admin/blog"
                  className="p-4 bg-primary rounded-lg border border-surface-light/20 hover:border-accent/30 transition-colors text-center"
                >
                  <FiFileText className="mx-auto mb-2 text-accent" size={24} />
                  <span className="text-sm text-muted">New Post</span>
                </Link>
                <Link
                  to="/admin/team"
                  className="p-4 bg-primary rounded-lg border border-surface-light/20 hover:border-accent/30 transition-colors text-center"
                >
                  <FiUsers className="mx-auto mb-2 text-accent" size={24} />
                  <span className="text-sm text-muted">Add Team Member</span>
                </Link>
                <Link
                  to="/admin/messages"
                  className="p-4 bg-primary rounded-lg border border-surface-light/20 hover:border-accent/30 transition-colors text-center"
                >
                  <FiMessageSquare className="mx-auto mb-2 text-accent" size={24} />
                  <span className="text-sm text-muted">View Messages</span>
                </Link>
              </div>
            </div>

            {/* Recent Stats */}
            <div className="bg-surface rounded-xl border border-surface-light/20 p-6">
              <h2 className="font-display font-semibold text-lg text-text mb-6">
                Overview
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-primary rounded-lg">
                  <span className="text-muted">Team Members</span>
                  <span className="font-semibold text-text">{members.length}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-primary rounded-lg">
                  <span className="text-muted">Messages Today</span>
                  <span className="font-semibold text-text">{stats.today || 0}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-primary rounded-lg">
                  <span className="text-muted">Featured Projects</span>
                  <span className="font-semibold text-text">
                    {projects.filter(p => p.featured).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard
