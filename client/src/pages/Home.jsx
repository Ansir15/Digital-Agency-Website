import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiArrowDown, FiAward } from 'react-icons/fi'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFeaturedProjects } from '../redux/slices/projectSlice'
import { fetchPosts } from '../redux/slices/blogSlice'

import ServiceCard from '../components/ServiceCard'
import ProjectCard from '../components/ProjectCard'
import TeamCard from '../components/TeamCard'
import TestimonialSlider from '../components/TestimonialSlider'
import StatsCounter from '../components/StatsCounter'

const services = [
  {
    title: 'Web Development',
    description: 'Custom websites and web applications built with modern technologies for optimal performance and scalability.'
  },
  {
    title: 'UI/UX Design',
    description: 'User-centered design solutions that create intuitive, engaging experiences for your digital products.'
  },
  {
    title: 'SEO Optimization',
    description: 'Data-driven SEO strategies to improve your search rankings and drive organic traffic growth.'
  },
  {
    title: 'Brand Identity',
    description: 'Comprehensive branding solutions that establish your unique presence in the market.'
  },
  {
    title: 'E-Commerce',
    description: 'Full-featured online stores with seamless checkout experiences and inventory management.'
  },
  {
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.'
  }
]

const teamPreview = [
  {
    name: 'Aliza khan',
    role: 'Company CEO',
    bio: 'Company CEO leading DevAgency with strong vision and business strategy.',
    photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400',
    socialLinks: { linkedin: '#', github: '', twitter: '' }
  },
  {
    name: 'Ansir Ali',
    role: 'Lead Developer',
    bio: 'Lead Developer driving technical delivery and software architecture.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    socialLinks: { linkedin: '#', github: '#', twitter: '' }
  },
  {
    name: 'Khurram Shah',
    role: 'Senior Product Manager',
    bio: 'Senior Product Manager ensuring product strategy and client success.',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    socialLinks: { linkedin: '#', github: '', twitter: '' }
  }
]

const Home = () => {
  const dispatch = useDispatch()
  const { featuredProjects } = useSelector((state) => state.projects)
  const { posts } = useSelector((state) => state.blog)

  useEffect(() => {
    dispatch(fetchFeaturedProjects())
    dispatch(fetchPosts({ limit: 3 }))
  }, [dispatch])

  return (
    <>
      <Helmet>
        <title>DevAgency | Digital Excellence</title>
        <meta name="description" content="Professional web development, UI/UX design, and digital solutions for modern businesses. We build digital experiences that inspire." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 mesh-gradient overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-medium mb-6"
              >
                <FiAward size={16} />
                <span>50+ Projects Delivered</span>
              </motion.div>

              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-text leading-tight mb-6">
                We Build Digital{' '}
                <span className="text-gradient">Experiences</span> That Inspire
              </h1>

              <p className="text-muted text-lg md:text-xl mb-8 max-w-lg">
                Transform your ideas into reality with our expert team of designers, developers, and strategists.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accentLight text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-accent/25"
                >
                  Get a Quote
                  <FiArrowRight size={20} />
                </Link>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-surface-light text-text font-medium rounded-xl hover:bg-surface transition-colors"
                >
                  View Our Work
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block relative"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full" />
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
                  alt="Team collaboration"
                  className="relative rounded-2xl shadow-2xl animate-float"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-muted"
          >
            <FiArrowDown size={24} />
          </motion.div>
        </motion.div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-text mb-4">
              Our Services
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Comprehensive digital solutions tailored to your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-surface border-y border-surface-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatsCounter />
        </div>
      </section>

      {/* Featured Portfolio */}
      <section className="py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-text mb-4">
                Featured Projects
              </h2>
              <p className="text-muted max-w-xl">
                Explore our latest work and see how we've helped businesses transform their digital presence
              </p>
            </div>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all"
            >
              View All Projects
              <FiArrowRight size={20} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.slice(0, 3).map((project, index) => (
              <ProjectCard
                key={project._id}
                project={project}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-surface border-y border-surface-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-text mb-4">
              What Our Clients Say
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Don't just take our word for it - hear from the businesses we've helped succeed
            </p>
          </div>

          <TestimonialSlider />
        </div>
      </section>

      {/* Team Preview */}
      <section className="py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-text mb-4">
                Meet Our Team
              </h2>
              <p className="text-muted max-w-xl">
                Talented individuals committed to delivering excellence
              </p>
            </div>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all"
            >
              Meet the Full Team
              <FiArrowRight size={20} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamPreview.map((member, index) => (
              <TeamCard
                key={member.name}
                member={member}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent to-accentLight opacity-10" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-text mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-muted text-lg mb-8 max-w-2xl mx-auto">
            Let's discuss your project and turn your vision into reality. Get started with a free consultation.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accentLight text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-accent/25"
          >
            Start Your Project
            <FiArrowRight size={20} />
          </Link>
        </div>
      </section>
    </>
  )
}

export default Home
