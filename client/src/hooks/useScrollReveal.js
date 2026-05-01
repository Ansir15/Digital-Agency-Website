import { useEffect, useRef, useState } from 'react'

/**
 * Hook to reveal elements on scroll using Intersection Observer
 * @param {Object} options - Intersection Observer options
 * @returns {Object} ref and isVisible state
 */
export const useScrollReveal = (options = {}) => {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  
  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: true,
    ...options
  }
  
  useEffect(() => {
    const element = ref.current
    if (!element) return
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (defaultOptions.triggerOnce) {
            observer.unobserve(element)
          }
        } else if (!defaultOptions.triggerOnce) {
          setIsVisible(false)
        }
      },
      {
        threshold: defaultOptions.threshold,
        rootMargin: defaultOptions.rootMargin,
      }
    )
    
    observer.observe(element)
    
    return () => {
      observer.unobserve(element)
    }
  }, [defaultOptions.threshold, defaultOptions.rootMargin, defaultOptions.triggerOnce])
  
  return { ref, isVisible }
}

/**
 * Hook to animate counter when element is in view
 * @param {number} endValue - Final value to count to
 * @param {number} duration - Animation duration in ms
 * @returns {Object} ref, count, and isVisible
 */
export const useCountUp = (endValue, duration = 2000) => {
  const ref = useRef(null)
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const hasAnimated = useRef(false)
  
  useEffect(() => {
    const element = ref.current
    if (!element) return
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true)
          hasAnimated.current = true
          
          const startTime = performance.now()
          const startValue = 0
          
          const animate = (currentTime) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            
            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3)
            const currentValue = Math.floor(startValue + (endValue - startValue) * easeOut)
            
            setCount(currentValue)
            
            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }
          
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )
    
    observer.observe(element)
    
    return () => {
      observer.unobserve(element)
    }
  }, [endValue, duration])
  
  return { ref, count, isVisible }
}

export default useScrollReveal
