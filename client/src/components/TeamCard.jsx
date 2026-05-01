import { motion } from 'framer-motion'
import { FiLinkedin, FiGithub, FiTwitter } from 'react-icons/fi'

const TeamCard = ({ member, delay = 0 }) => {
  const { name, role, bio, photo, socialLinks } = member

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl bg-surface border border-surface-light/20">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={photo || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400'}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Overlay with bio on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/90 to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <p className="text-muted text-sm line-clamp-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              {bio}
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="p-6">
          <h3 className="font-display font-semibold text-lg text-text mb-1">
            {name}
          </h3>
          <p className="text-accent text-sm mb-4">
            {role}
          </p>

          {/* Social Links */}
          <div className="flex gap-3">
            {socialLinks?.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-surface-light/50 flex items-center justify-center text-muted hover:text-accent hover:bg-accent/10 transition-all"
                aria-label={`${name}'s LinkedIn`}
              >
                <FiLinkedin size={18} />
              </a>
            )}
            {socialLinks?.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-surface-light/50 flex items-center justify-center text-muted hover:text-accent hover:bg-accent/10 transition-all"
                aria-label={`${name}'s GitHub`}
              >
                <FiGithub size={18} />
              </a>
            )}
            {socialLinks?.twitter && (
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-surface-light/50 flex items-center justify-center text-muted hover:text-accent hover:bg-accent/10 transition-all"
                aria-label={`${name}'s Twitter`}
              >
                <FiTwitter size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default TeamCard
