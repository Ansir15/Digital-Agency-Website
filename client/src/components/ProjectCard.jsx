import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub } from 'react-icons/fi'

const ProjectCard = ({ project, onClick, delay = 0 }) => {
  const { title, category, description, techStack, imageUrl, liveUrl, githubUrl } = project

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group relative rounded-2xl overflow-hidden bg-surface border border-surface-light/20 cursor-pointer"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <span className="inline-block px-3 py-1 bg-accent/20 text-accent text-xs font-medium rounded-full mb-3 w-fit">
              {category}
            </span>
            <h3 className="font-display font-semibold text-xl text-text mb-2">
              {title}
            </h3>
            <p className="text-muted text-sm mb-4 line-clamp-2">
              {description}
            </p>
            
            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {techStack?.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-surface-light/50 text-muted text-xs rounded"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-3">
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accentLight transition-colors"
                >
                  <FiExternalLink size={16} />
                  Live Demo
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 px-4 py-2 border border-surface-light text-text text-sm font-medium rounded-lg hover:bg-surface-light transition-colors"
                >
                  <FiGithub size={16} />
                  Code
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard
