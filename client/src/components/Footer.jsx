import { Link } from 'react-router-dom'
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

const footerLinks = {
  services: [
    { label: 'Web Development', path: '/services' },
    { label: 'UI/UX Design', path: '/services' },
    { label: 'SEO Optimization', path: '/services' },
    { label: 'Brand Identity', path: '/services' },
    { label: 'E-Commerce', path: '/services' },
  ],
  company: [
    { label: 'About Us', path: '/about' },
    { label: 'Our Team', path: '/about' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ],
  support: [
    { label: 'FAQ', path: '#' },
    { label: 'Privacy Policy', path: '#' },
    { label: 'Terms of Service', path: '#' },
    { label: 'Admin Login', path: '/admin/login' },
  ],
}

const socialLinks = [
  { icon: FiTwitter, href: '#', label: 'Twitter' },
  { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
  { icon: FiGithub, href: '#', label: 'GitHub' },
]

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-surface border-t border-surface-light/20">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-display font-bold text-xl">D</span>
              </div>
              <span className="font-display font-semibold text-xl text-text">
                DevAgency
              </span>
            </Link>
            <p className="text-muted mb-6 max-w-sm">
              We build digital experiences that inspire and deliver results. 
              Transform your ideas into reality with our expert team.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a href="mailto:hello@devagency.com" className="flex items-center gap-3 text-muted hover:text-accent transition-colors">
                <FiMail size={18} />
                <span>hello@devagency.com</span>
              </a>
              <a href="tel:+923450570563" className="flex items-center gap-3 text-muted hover:text-accent transition-colors">
                <FiPhone size={18} />
                <span>+92 345 0570563</span>
              </a>
              <div className="flex items-center gap-3 text-muted">
                <FiMapPin size={18} />
                <span>Lahore, Pakistan</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-text mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-muted hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-text mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-muted hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-semibold text-text mb-6">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-muted hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-surface-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted text-sm">
              &copy; {currentYear} DevAgency. All rights reserved.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-surface-light/50 flex items-center justify-center text-muted hover:text-accent hover:bg-accent/10 transition-all"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
