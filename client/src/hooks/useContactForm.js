import { useState } from 'react'
import * as yup from 'yup'

// Validation schema
const contactSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  phone: yup
    .string()
    .matches(/^[\d\s\-\+\(\)]+$/, 'Please enter a valid phone number')
    .optional(),
  company: yup.string().optional(),
  service: yup
    .string()
    .required('Please select a service'),
  budget: yup
    .string()
    .required('Please select a budget range'),
  message: yup
    .string()
    .required('Message is required')
    .min(20, 'Message must be at least 20 characters'),
})

/**
 * Custom hook for contact form handling
 * @returns {Object} Form state and handlers
 */
export const useContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  /**
   * Handle input change
   * @param {Object} e - Event object
   */
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  /**
   * Handle field blur (for validation)
   * @param {string} field - Field name
   */
  const handleBlur = async (field) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    
    try {
      await contactSchema.validateAt(field, formData)
      setErrors(prev => ({ ...prev, [field]: '' }))
    } catch (error) {
      setErrors(prev => ({ ...prev, [field]: error.message }))
    }
  }

  /**
   * Validate entire form
   * @returns {boolean} Is form valid
   */
  const validateForm = async () => {
    try {
      await contactSchema.validate(formData, { abortEarly: false })
      setErrors({})
      return true
    } catch (error) {
      const validationErrors = {}
      error.inner.forEach(err => {
        validationErrors[err.path] = err.message
      })
      setErrors(validationErrors)
      setTouched({
        name: true,
        email: true,
        service: true,
        budget: true,
        message: true,
      })
      return false
    }
  }

  /**
   * Reset form to initial state
   */
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      budget: '',
      message: '',
    })
    setErrors({})
    setTouched({})
  }

  /**
   * Get form data for submission
   * @returns {Object} Form data
   */
  const getFormData = () => formData

  return {
    formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    getFormData,
    setFormData,
  }
}

export default useContactForm
