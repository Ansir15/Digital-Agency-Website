import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheck, FiLoader, FiMessageSquare } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { submitContact, clearSubmitSuccess, clearContactError } from '../redux/slices/contactSlice'
import useContactForm from '../hooks/useContactForm'

const services = [
  'Web Development',
  'UI/UX Design',
  'SEO Optimization',
  'Brand Identity',
  'E-Commerce',
  'Mobile Apps',
  'Other'
]

const budgets = [
  'Under $500',
  '$500-2K',
  '$2K-5K',
  '$5K+'
]

const Contact = () => {
  const dispatch = useDispatch()
  const { submitLoading, submitSuccess, referenceId, error } = useSelector((state) => state.contact)
  const { formData, errors, touched, handleChange, handleBlur, validateForm, resetForm } = useContactForm()
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (submitSuccess) {
      setShowSuccess(true)
      const timer = setTimeout(() => {
        dispatch(clearSubmitSuccess())
        setShowSuccess(false)
        resetForm()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [submitSuccess, dispatch, resetForm])

  useEffect(() => {
    return () => {
      dispatch(clearContactError())
    }
  }, [dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValid = await validateForm()
    if (isValid) {
      dispatch(submitContact(formData))
    }
  }

  return (
    <>
      <Helmet>
        <title>Contact Us | DevAgency</title>
        <meta name="description" content="Get in touch with DevAgency for web development, design, and digital solutions. Start your project with a free consultation." />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 pb-20 mesh-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <nav className="flex gap-2 text-sm text-muted mb-6">
              <Link to="/" className="hover:text-accent transition-colors">Home</Link>
              <span>/</span>
              <span className="text-text">Contact</span>
            </nav>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-text mb-6">
              Let's Start a Conversation
            </h1>
            <p className="text-muted text-lg md:text-xl">
              Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-display font-semibold text-2xl text-text mb-6">
                  Get in Touch
                </h2>
                <p className="text-muted mb-8">
                  Whether you have a question about our services, pricing, or just want to say hello, our team is ready to answer all your questions.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <a href="mailto:hello@devagency.com" className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                    <FiMail size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-text mb-1">Email</h4>
                    <p className="text-muted group-hover:text-accent transition-colors">hello@devagency.com</p>
                  </div>
                </a>

                <a href="tel:+1234567890" className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                    <FiPhone size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-text mb-1">Phone</h4>
                    <p className="text-muted group-hover:text-accent transition-colors">+92 345 0570563</p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                    <FiMapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-text mb-1">Office</h4>
                    <p className="text-muted">Lahore, Pakistan</p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="aspect-video bg-surface rounded-xl overflow-hidden border border-surface-light/20">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.551286174068!2d74.3587!3d31.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e58107d9%3A0xc23abe6ccc7e2462!2sLahore%2C%20Pakistan!5e0!3m2!1sen!2s!4v1699999999999!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(100%) invert(92%)' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-surface p-8 rounded-2xl border border-surface-light/20"
              >
                {showSuccess ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FiCheck className="text-green-500" size={40} />
                    </div>
                    <h3 className="font-display font-semibold text-2xl text-text mb-4">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-muted mb-4">
                      Thank you for reaching out. We've received your message and will get back to you within 24 hours.
                    </p>
                    <div className="bg-primary p-4 rounded-lg inline-block mb-4">
                      <p className="text-sm text-muted">Reference ID</p>
                      <p className="font-mono font-semibold text-accent">{referenceId}</p>
                    </div>
                    <p className="text-sm text-muted">
                      Please check your email for a confirmation.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                          Full Name <span className="text-accent">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onBlur={() => handleBlur('name')}
                          className={`w-full px-4 py-3 bg-primary border rounded-lg text-text placeholder-muted focus:outline-none focus:border-accent transition-colors ${
                            errors.name && touched.name ? 'border-red-500' : 'border-surface-light/20'
                          }`}
                          placeholder="John Doe"
                        />
                        {errors.name && touched.name && (
                          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                          Email Address <span className="text-accent">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={() => handleBlur('email')}
                          className={`w-full px-4 py-3 bg-primary border rounded-lg text-text placeholder-muted focus:outline-none focus:border-accent transition-colors ${
                            errors.email && touched.email ? 'border-red-500' : 'border-surface-light/20'
                          }`}
                          placeholder="john@example.com"
                        />
                        {errors.email && touched.email && (
                          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Phone */}
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-text mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-primary border border-surface-light/20 rounded-lg text-text placeholder-muted focus:outline-none focus:border-accent transition-colors"
                          placeholder="+1 (234) 567-890"
                        />
                      </div>

                      {/* Company */}
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-text mb-2">
                          Company Name
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-primary border border-surface-light/20 rounded-lg text-text placeholder-muted focus:outline-none focus:border-accent transition-colors"
                          placeholder="Your Company"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Service */}
                      <div>
                        <label htmlFor="service" className="block text-sm font-medium text-text mb-2">
                          Service Needed <span className="text-accent">*</span>
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          onBlur={() => handleBlur('service')}
                          className={`w-full px-4 py-3 bg-primary border rounded-lg text-text focus:outline-none focus:border-accent transition-colors ${
                            errors.service && touched.service ? 'border-red-500' : 'border-surface-light/20'
                          }`}
                        >
                          <option value="">Select a service</option>
                          {services.map((service) => (
                            <option key={service} value={service}>{service}</option>
                          ))}
                        </select>
                        {errors.service && touched.service && (
                          <p className="mt-1 text-sm text-red-500">{errors.service}</p>
                        )}
                      </div>

                      {/* Budget */}
                      <div>
                        <label className="block text-sm font-medium text-text mb-3">
                          Budget Range <span className="text-accent">*</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {budgets.map((budget) => (
                            <label
                              key={budget}
                              className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-all ${
                                formData.budget === budget
                                  ? 'bg-accent border-accent text-white'
                                  : 'bg-primary border-surface-light/20 text-muted hover:border-accent'
                              }`}
                            >
                              <input
                                type="radio"
                                name="budget"
                                value={budget}
                                checked={formData.budget === budget}
                                onChange={handleChange}
                                className="sr-only"
                              />
                              <span className="text-sm">{budget}</span>
                            </label>
                          ))}
                        </div>
                        {errors.budget && touched.budget && (
                          <p className="mt-1 text-sm text-red-500">{errors.budget}</p>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
                        Project Details <span className="text-accent">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={() => handleBlur('message')}
                        className={`w-full px-4 py-3 bg-primary border rounded-lg text-text placeholder-muted focus:outline-none focus:border-accent transition-colors resize-none ${
                          errors.message && touched.message ? 'border-red-500' : 'border-surface-light/20'
                        }`}
                        placeholder="Tell us about your project, goals, and timeline..."
                      />
                      {errors.message && touched.message && (
                        <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                      )}
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <p className="text-red-500 text-sm">{error}</p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submitLoading}
                      className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-accent hover:bg-accentLight disabled:opacity-50 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-accent/25"
                    >
                      {submitLoading ? (
                        <>
                          <FiLoader className="animate-spin" size={20} />
                          Sending...
                        </>
                      ) : (
                        <>
                          <FiSend size={20} />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
