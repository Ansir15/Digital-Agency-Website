import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { FiLinkedin, FiGithub, FiTwitter, FiAward, FiUsers, FiTarget, FiHeart } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { fetchAllMembers } from '../redux/slices/teamSlice'
import TeamCard from '../components/TeamCard'

const values = [
  {
    icon: FiTarget,
    title: 'Excellence',
    description: 'We strive for excellence in every project, delivering solutions that exceed expectations and set new standards.'
  },
  {
    icon: FiUsers,
    title: 'Collaboration',
    description: 'We believe in the power of teamwork, working closely with our clients to ensure their vision becomes reality.'
  },
  {
    icon: FiHeart,
    title: 'Passion',
    description: 'Our passion for technology drives us to stay ahead of trends and deliver innovative solutions.'
  },
  {
    icon: FiAward,
    title: 'Integrity',
    description: 'We operate with transparency and honesty, building lasting relationships based on trust.'
  }
]

const techStack = [
  'React', 'Next.js', 'Vue.js', 'Node.js', 'Python',
  'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Figma'
]

const clientLogos = [
  'TechStart', 'StyleHub', 'GrowthLabs', 'InnovateCo', 'DataFlow', 'CloudNine'
]

const awards = [
  {
    name: 'Best Web Agency 2023',
    year: '2023',
    description: 'Recognized for outstanding web development and design excellence'
  },
  {
    name: 'Top UX Design Firm',
    year: '2023',
    description: 'Featured among top user experience design companies'
  },
  {
    name: 'Innovation Award',
    year: '2022',
    description: 'Awarded for innovative use of emerging technologies'
  }
]

const About = () => {
  const dispatch = useDispatch()
  const { members, isLoading } = useSelector((state) => state.team || { members: [], isLoading: false })

  useEffect(() => {
    dispatch(fetchAllMembers())
  }, [dispatch])

  return (
    <>
      <Helmet>
        <title>About Us | DevAgency</title>
        <meta name="description" content="Learn about DevAgency - our story, mission, values, and the talented team behind our digital excellence." />
      </Helmet>

      {/* Hero Section with Parallax */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/80 to-primary z-10" />
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600"
            alt="Team"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <nav className="flex gap-2 text-sm text-muted mb-6">
              <Link to="/" className="hover:text-accent transition-colors">Home</Link>
              <span>/</span>
              <span className="text-text">About</span>
            </nav>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-text mb-6">
              Building Digital Excellence Since 2021
            </h1>
            <p className="text-muted text-lg md:text-xl">
              We're a team of passionate designers, developers, and strategists dedicated to creating impactful digital experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display font-bold text-3xl md:text-4xl text-text mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted leading-relaxed">
                <p>
                  DevAgency was founded in 2021 with a simple mission: to help businesses thrive in the digital age. What started as a small team of three passionate developers has grown into a full-service digital agency with a global client base.
                </p>
                <p>
                  Our journey has been defined by a commitment to excellence, innovation, and client success. We've had the privilege of working with startups, established enterprises, and everything in between, helping them transform their digital presence and achieve their business goals.
                </p>
                <p>
                  Today, we continue to push boundaries and embrace new technologies, always keeping our clients' success at the heart of everything we do. Our team has grown, but our core values remain the same.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800"
                  alt="Our team at work"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-accent p-6 rounded-2xl">
                <p className="font-display font-bold text-3xl text-white">50+</p>
                <p className="text-white/80 text-sm">Projects Delivered</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-surface border-y border-surface-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 bg-primary rounded-2xl"
            >
              <h3 className="font-display font-semibold text-2xl text-text mb-4">Our Mission</h3>
              <p className="text-muted leading-relaxed">
                To empower businesses with innovative digital solutions that drive growth, enhance user experiences, and create lasting value. We believe in the transformative power of technology when combined with thoughtful design and strategic thinking.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-8 bg-primary rounded-2xl"
            >
              <h3 className="font-display font-semibold text-2xl text-text mb-4">Our Vision</h3>
              <p className="text-muted leading-relaxed">
                To be the leading digital partner for businesses worldwide, known for our innovation, quality, and commitment to client success. We aim to shape the future of digital experiences through cutting-edge technology and creative excellence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-text mb-4">
              Our Core Values
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-surface rounded-2xl border border-surface-light/20 text-center"
              >
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center text-accent mx-auto mb-4">
                  <value.icon size={28} />
                </div>
                <h3 className="font-display font-semibold text-lg text-text mb-2">
                  {value.title}
                </h3>
                <p className="text-muted text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-surface border-y border-surface-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-text mb-4">
              Meet Our Team
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Talented individuals committed to delivering excellence
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {members.map((member, index) => (
                <TeamCard
                  key={member._id || index}
                  member={member}
                  delay={index * 0.1}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl text-text mb-4">
              Technologies We Use
            </h2>
            <p className="text-muted">
              Modern tools for modern solutions
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech) => (
              <div
                key={tech}
                className="px-6 py-3 bg-surface rounded-lg border border-surface-light/20 text-text font-medium"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-16 bg-surface border-y border-surface-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-muted mb-8">Trusted by leading companies</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50">
            {clientLogos.map((logo) => (
              <div key={logo} className="text-xl font-display font-semibold text-muted">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-text mb-4">
              Awards & Recognition
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Recognition for our commitment to excellence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {awards.map((award, index) => (
              <motion.div
                key={award.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-surface rounded-2xl border border-surface-light/20"
              >
                <div className="flex items-center gap-2 mb-4">
                  <FiAward className="text-accent" size={24} />
                  <span className="text-accent font-semibold">{award.year}</span>
                </div>
                <h3 className="font-display font-semibold text-lg text-text mb-2">
                  {award.name}
                </h3>
                <p className="text-muted text-sm">
                  {award.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default About
