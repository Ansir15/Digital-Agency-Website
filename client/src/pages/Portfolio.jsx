import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { FiX, FiExternalLink, FiGithub } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { fetchProjects } from '../redux/slices/projectSlice'
import ProjectCard from '../components/ProjectCard'

const categories = ['All', 'Web App', 'E-Commerce', 'UI-UX', 'Mobile']

const Portfolio = () => {
  const dispatch = useDispatch()
  const { projects, isLoading } = useSelector((state) => state.projects)
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    dispatch(fetchProjects({ 
      category: activeCategory === 'All' ? '' : activeCategory 
    }))
  }, [dispatch, activeCategory])

  const filteredProjects = projects

  return (
    <>
      <Helmet>
        <title>Portfolio | DevAgency</title>
        <meta name="description" content="Explore our portfolio of web development, UI/UX design, and digital projects. See how we've helped businesses transform their online presence." />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 pb-20 mesh-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <nav className="flex gap-2 text-sm text-muted mb-6">
              <Link to="/" className="hover:text-accent transition-colors">Home</Link>
              <span>/</span>
              <span className="text-text">Portfolio</span>
            </nav>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-text mb-6">
              Our Work
            </h1>
            <p className="text-muted text-lg md:text-xl">
              Explore our latest projects and see how we've helped businesses transform their digital presence
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-accent text-white'
                    : 'bg-surface text-muted hover:text-text border border-surface-light/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
            </div>
          ) : (
            <motion.div 
              layout
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <ProjectCard
                      project={project}
                      onClick={() => setSelectedProject(project)}
                      delay={0}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {!isLoading && filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted">No projects found in this category</p>
            </div>
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/95 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-surface rounded-2xl border border-surface-light/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-primary/80 flex items-center justify-center text-muted hover:text-text transition-colors"
              >
                <FiX size={20} />
              </button>

              {/* Image */}
              <div className="relative aspect-video">
                <img
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="inline-block px-3 py-1 bg-accent text-white text-sm font-medium rounded-full">
                    {selectedProject.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h2 className="font-display font-bold text-2xl md:text-3xl text-text mb-4">
                  {selectedProject.title}
                </h2>
                
                <p className="text-muted mb-6 leading-relaxed">
                  {selectedProject.description}
                </p>

                {/* Tech Stack */}
                <div className="mb-6">
                  <h4 className="font-medium text-text mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack?.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-surface-light/50 text-muted text-sm rounded-lg border border-surface-light/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-4 pt-6 border-t border-surface-light/20">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accentLight text-white font-medium rounded-lg transition-colors"
                    >
                      <FiExternalLink size={18} />
                      View Live Demo
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 border border-surface-light text-text font-medium rounded-lg hover:bg-surface-light/50 transition-colors"
                    >
                      <FiGithub size={18} />
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Portfolio
