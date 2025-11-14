import { useState, memo } from 'react'
import emailjs from '@emailjs/browser'
import ScrollFloat from './bits/ScrollFloat.jsx'
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi'
import { FaLinkedin, FaGithub  } from 'react-icons/fa'
import { FaXTwitter } from "react-icons/fa6";
import { MdArrowOutward } from 'react-icons/md'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  // EmailJS Configuration
  // IMPORTANT: Replace these with your actual EmailJS credentials from https://www.emailjs.com/
  // If you see a 400 error, it means these credentials are not set correctly
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_r62dc6a'
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_odb9i5c'
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'OWaQiZTpWtVaLwnoG'
  const RECIPIENT_EMAIL = 'shahad23at@gmail.com' // Your email address

  // Check if EmailJS is configured (verify values are set and have proper format)
  const isEmailJSConfigured = 
    EMAILJS_SERVICE_ID &&
    EMAILJS_SERVICE_ID.startsWith('service_') &&
    EMAILJS_TEMPLATE_ID &&
    EMAILJS_TEMPLATE_ID.startsWith('template_') &&
    EMAILJS_PUBLIC_KEY &&
    EMAILJS_PUBLIC_KEY.length > 10

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    // Check if EmailJS is configured
    if (!isEmailJSConfigured) {
      setSubmitStatus('not-configured')
      setIsSubmitting(false)
      return
    }

    try {
      // Send email using EmailJS
      // Important: Make sure your EmailJS template has "Reply To" field set to {{reply_to}} or {{from_email}}
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        email: formData.email, // Also send as 'email' for template compatibility
        reply_to: formData.email, // Set reply-to to sender's email
        reply_to_email: formData.email, // Alternative field name
        subject: formData.subject || 'Contact from Portfolio',
        message: formData.message,
        to_email: RECIPIENT_EMAIL
      }

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      )
      
      if (response.status === 200) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        throw new Error(`EmailJS returned status ${response.status}`)
      }
      
      setTimeout(() => setSubmitStatus(null), 5000)
    } catch (error) {
      console.error('EmailJS Error Details:', {
        error,
        status: error?.status,
        text: error?.text,
        serviceId: EMAILJS_SERVICE_ID,
        templateId: EMAILJS_TEMPLATE_ID,
        hasPublicKey: !!EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY'
      })
      
      // Provide specific error message
      if (error?.status === 400) {
        setSubmitStatus('config-error')
      } else {
        setSubmitStatus('error')
      }
      setTimeout(() => setSubmitStatus(null), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section 
      id="contact" 
      className="relative w-full py-20 md:py-28 bg-[#F4F3FA]"
      style={{
        willChange: 'scroll-position',
        transform: 'translateZ(0)'
      }}
    >
      <div className="relative max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <ScrollFloat
            animationDuration={1}
            ease='back.inOut(2)'
            scrollStart='center bottom+=50%'
            scrollEnd='bottom bottom-=40%'
            stagger={0.05}
            containerClassName=""
            textClassName="text-[#443592] font-bold text-3xl md:text-4xl"
          >
            Get In Touch
          </ScrollFloat>
          <div className="h-[3px] w-[70px] bg-[#EFCB7B] mt-2 mb-4" />
          <p className="text-gray-700 text-base md:text-lg max-w-3xl">
            Have a question or want to work together? Feel free to drop me a message. I'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Information */}
          <div>
            <h3 className="text-2xl font-bold text-[#443592] mb-4">Contact Information</h3>
            <p className="text-gray-700 mb-8">
              Fill up the form and I'll get back to you as soon as possible.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#443592]/10 flex items-center justify-center flex-shrink-0">
                  <HiOutlineMail className="w-6 h-6 text-[#443592]" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Email</p>
                  <a href="mailto:shahad23at@gmail.com" className="text-gray-600 hover:text-[#443592] transition-colors">
                    shahad23at@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#443592]/10 flex items-center justify-center flex-shrink-0">
                  <HiOutlinePhone className="w-6 h-6 text-[#443592]" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Phone</p>
                  <p className="text-gray-600">Available upon request</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#443592]/10 flex items-center justify-center flex-shrink-0">
                  <HiOutlineLocationMarker className="w-6 h-6 text-[#443592]" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Location</p>
                  <p className="text-gray-600">Saudi Arabia</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="font-semibold text-gray-900 mb-4">Connect with me</p>
              <div className="flex gap-4">
                <a
                  href="www.linkedin.com/in/shahad02aljohani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#443592] hover:bg-[#443592] hover:text-white transition-all duration-300 shadow-md"
                >
                  <FaLinkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/Elenore68"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#443592] hover:bg-[#443592] hover:text-white transition-all duration-300 shadow-md"
                >
                  <FaGithub className="w-5 h-5" />
                </a>
                <a
                  href="https://x.com/_hollygrove5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#443592] hover:bg-[#443592] hover:text-white transition-all duration-300 shadow-md"
                >
                  <FaXTwitter  className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div 
            className="bg-white rounded-2xl p-8 shadow-lg"
            style={{
              willChange: 'transform',
              transform: 'translateZ(0)'
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#443592] focus:border-transparent outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#443592] focus:border-transparent outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#443592] focus:border-transparent outline-none transition-all"
                  placeholder="How can I help you?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#443592] focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Your message here..."
                />
              </div>

              {submitStatus === 'success' && (
                <div className="p-3 bg-green-100 text-green-700 rounded-lg text-sm">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}

              {submitStatus === 'not-configured' && (
                <div className="p-3 bg-yellow-100 text-yellow-800 rounded-lg text-sm">
                  <strong>EmailJS not configured:</strong> Please set up EmailJS credentials in Contact.jsx. 
                  For now, you can contact me directly at <a href="mailto:shahad23at@gmail.com" className="underline">shahad23at@gmail.com</a>
                </div>
              )}

              {submitStatus === 'config-error' && (
                <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                  <strong>Configuration Error (400):</strong> Please check your EmailJS credentials (Service ID, Template ID, Public Key) in Contact.jsx. 
                  Make sure they match your EmailJS account settings. 
                  <br />Contact me directly at <a href="mailto:shahad23at@gmail.com" className="underline">shahad23at@gmail.com</a>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                  Error sending message. Please try again or contact me directly at <a href="mailto:shahad23at@gmail.com" className="underline">shahad23at@gmail.com</a>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#443592] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#443592]/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                {!isSubmitting && <MdArrowOutward className="w-5 h-5" />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(Contact)

