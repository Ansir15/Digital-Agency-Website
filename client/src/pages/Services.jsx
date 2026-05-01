import { useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FiCheck, FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const serviceDetails = [
  {
    id: 'development',
    title: 'Web Development',
    category: 'Development',
    description: 'Custom websites and web applications built with modern technologies for optimal performance, security, and scalability.',
    features: [
      'Responsive & mobile-first design',
      'Progressive Web Apps (PWA)',
      'API development & integration',
      'Database design & optimization',
      'Performance optimization'
    ],
    startingPrice: '$2,500',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  },
  {
    id: 'design',
    title: 'UI/UX Design',
    category: 'Design',
    description: 'User-centered design solutions that create intuitive, engaging experiences and drive conversions for your digital products.',
    features: [
      'User research & persona development',
      'Wireframing & prototyping',
      'Visual design & branding',
      'Usability testing',
      'Design systems'
    ],
    startingPrice: '$1,800',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    )
  },
  {
    id: 'seo',
    title: 'SEO Optimization',
    category: 'Marketing',
    description: 'Data-driven SEO strategies to improve your search rankings, drive organic traffic, and increase your online visibility.',
    features: [
      'Technical SEO audit',
      'Keyword research & strategy',
      'On-page optimization',
      'Content strategy',
      'Analytics & reporting'
    ],
    startingPrice: '$1,200',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    )
  },
  {
    id: 'branding',
    title: 'Brand Identity',
    category: 'Design',
    description: 'Comprehensive branding solutions that establish your unique presence in the market and resonate with your target audience.',
    features: [
      'Logo design & visual identity',
      'Brand strategy & positioning',
      'Brand guidelines',
      'Marketing collateral',
      'Brand messaging'
    ],
    startingPrice: '$2,000',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    )
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce',
    category: 'Development',
    description: 'Full-featured online stores with seamless checkout experiences, inventory management, and payment integration.',
    features: [
      'Custom store development',
      'Payment gateway integration',
      'Inventory management',
      'Shopping cart optimization',
      'Mobile commerce'
    ],
    startingPrice: '$3,500',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    )
  },
  {
    id: 'mobile',
    title: 'Mobile Apps',
    category: 'Development',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences on iOS and Android.',
    features: [
      'iOS & Android development',
      'React Native & Flutter',
      'API integration',
      'Push notifications',
      'App store deployment'
    ],
    startingPrice: '$5,000',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    )
  }
]

const categories = ['All', 'Development', 'Design', 'Marketing']

const processSteps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We start by understanding your business, goals, and target audience through in-depth research and consultation.'
  },
  {
    number: '02',
    title: 'Design',
    description: 'Our designers create wireframes and visual concepts that align with your brand and user expectations.'
  },
  {
    number: '03',
    title: 'Development',
    description: 'Our engineers bring designs to life using modern technologies and best practices for quality code.'
  },
  {
    number: '04',
    title: 'Launch',
    description: 'We deploy your project, provide training, and offer ongoing support to ensure continued success.'
  }
]

const faqs = [
  {
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on scope and complexity. A simple website might take 2-4 weeks, while a complex web application could take 3-6 months. We provide detailed timelines during our discovery phase.'
  },
  {
    question: 'What is your pricing structure?',
    answer: 'We offer both fixed-price projects and hourly rates depending on the project type. All our services have starting prices listed above, and we provide detailed quotes after understanding your specific requirements.'
  },
  {
    question: 'Do you offer ongoing support and maintenance?',
    answer: 'Yes! We offer various maintenance packages to keep your digital products secure, up-to-date, and performing optimally. This includes regular updates, security patches, and technical support.'
  },
  {
    question: 'Can you work with our existing team?',
    answer: 'Absolutely. We regularly collaborate with in-house teams, whether it\'s providing specialized expertise, augmenting your development capacity, or working alongside your designers and product managers.'
  },
  {
    question: 'What technologies do you specialize in?',
    answer: 'Our team is proficient in modern web technologies including React, Next.js, Node.js, Python, and various databases. We choose the best tech stack based on your project requirements.'
  },
  {
    question: 'Do you offer payment plans?',
    answer: 'Yes, we understand that large projects can be significant investments. We offer milestone-based payment schedules to make budgeting easier for our clients.'
  }
]

const Services = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [openFaq, setOpenFaq] = useState(null)

  const filteredServices = activeCategory === 'All'
    ? serviceDetails
    : serviceDetails.filter(s => s.category === activeCategory)

  return (
    <>
      <Helmet>
        <title>Services | DevAgency</title>
        <meta name="description" content="Professional web development, UI/UX design, SEO optimization, and digital solutions tailored to your business needs." />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 pb-20 mesh-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <nav className="flex gap-2 text-sm text-muted mb-6">
              <Link to="/" className="hover:text-accent transition-colors">Home</Link>
              <span>/</span>
              <span className="text-text">Services</span>
            </nav>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-text mb-6">
              Our Services
            </h1>
            <p className="text-muted text-lg md:text-xl">
              Comprehensive digital solutions to help your business thrive in the modern landscape
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-12">
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

          {/* Services Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-8 bg-surface rounded-2xl border border-surface-light/20 hover:border-accent/30 transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
                  {service.icon}
                </div>

                {/* Content */}
                <h3 className="font-display font-semibold text-xl text-text mb-3">
                  {service.title}
                </h3>
                <p className="text-muted mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted">
                      <FiCheck className="text-accent flex-shrink-0" size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-6 border-t border-surface-light/20">
                  <div>
                    <span className="text-sm text-muted">Starting at</span>
                    <p className="font-display font-semibold text-lg text-text">
                      {service.startingPrice}
                    </p>
                  </div>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accentLight text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-24 bg-surface border-y border-surface-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-text mb-4">
              How We Work
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Our proven process ensures successful project delivery every time
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <span className="font-display font-bold text-6xl text-accent/10 absolute -top-4 -left-2">
                  {step.number}
                </span>
                <div className="relative pt-8">
                  <h3 className="font-display font-semibold text-xl text-text mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted text-sm">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-primary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-text mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted">
              Everything you need to know about our services
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-surface rounded-xl border border-surface-light/20 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-medium text-text pr-8">{faq.question}</span>
                  <span className={`transform transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === index ? 'auto' : 0, opacity: openFaq === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-muted">
                    {faq.answer}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-surface border-t border-surface-light/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-text mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-muted text-lg mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help bring your vision to life. Get in touch for a free consultation.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accentLight text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-accent/25"
          >
            Contact Us
            <FiArrowRight size={20} />
          </Link>
        </div>
      </section>
    </>
  )
}

export default Services
