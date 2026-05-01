import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight, FiMessageSquare } from 'react-icons/fi'

const testimonials = [
  {
    id: 1,
    quote: "DevAgency transformed our online presence completely. Their attention to detail and technical expertise exceeded our expectations. The new website has increased our leads by 200%.",
    author: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
  },
  {
    id: 2,
    quote: "Working with DevAgency was a game-changer for our e-commerce business. They delivered a stunning, high-performing platform that our customers love. Highly recommended!",
    author: "Michael Chen",
    role: "Founder, StyleHub",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
  },
  {
    id: 3,
    quote: "The team at DevAgency is incredibly talented and professional. They took our complex requirements and turned them into an elegant, user-friendly solution. Exceptional work!",
    author: "Emily Rodriguez",
    role: "Marketing Director, GrowthLabs",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100"
  },
  {
    id: 4,
    quote: "From concept to launch, DevAgency provided outstanding support and delivered a product that truly represents our brand. Their design skills are top-notch.",
    author: "David Park",
    role: "Product Manager, InnovateCo",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
  }
]

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPaused])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <div 
      className="relative max-w-4xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Quote Icon */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-accent rounded-full flex items-center justify-center z-10">
        <FiMessageSquare className="text-white" size={24} />
      </div>

      {/* Main Slider */}
      <div className="bg-surface rounded-2xl p-8 md:p-12 border border-surface-light/20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="text-lg md:text-xl text-text leading-relaxed mb-8">
              "{testimonials[currentIndex].quote}"
            </p>

            <div className="flex flex-col items-center">
              <img
                src={testimonials[currentIndex].avatar}
                alt={testimonials[currentIndex].author}
                className="w-16 h-16 rounded-full object-cover border-2 border-accent mb-4"
              />
              <h4 className="font-display font-semibold text-text">
                {testimonials[currentIndex].author}
              </h4>
              <p className="text-muted text-sm">
                {testimonials[currentIndex].role}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={goToPrevious}
            className="w-10 h-10 rounded-full border border-surface-light flex items-center justify-center text-muted hover:text-accent hover:border-accent transition-colors"
            aria-label="Previous testimonial"
          >
            <FiChevronLeft size={20} />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-6 bg-accent' 
                    : 'bg-surface-light hover:bg-muted'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            className="w-10 h-10 rounded-full border border-surface-light flex items-center justify-center text-muted hover:text-accent hover:border-accent transition-colors"
            aria-label="Next testimonial"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TestimonialSlider
