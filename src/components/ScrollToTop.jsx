import { useState, useEffect, useRef, useCallback } from 'react'
import { FaChevronUp } from 'react-icons/fa'

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const rafIdRef = useRef(null)
  const lastScrollYRef = useRef(0)

  const toggleVisibility = useCallback(() => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop
    
    // Only update state if scroll position changed significantly
    if (Math.abs(scrollY - lastScrollYRef.current) > 50) {
      lastScrollYRef.current = scrollY
      setIsVisible(scrollY > 300)
    }
  }, [])

  useEffect(() => {
    // Throttled scroll handler using requestAnimationFrame
    const handleScroll = () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
      rafIdRef.current = requestAnimationFrame(toggleVisibility)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
      window.removeEventListener('scroll', handleScroll)
    }
  }, [toggleVisibility])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-[#443592] text-white shadow-lg hover:bg-[#443592]/90 transition-all duration-300 flex items-center justify-center hover:scale-110"
          aria-label="Scroll to top"
        >
          <FaChevronUp className="w-5 h-5" />
        </button>
      )}
    </>
  )
}

export default ScrollToTop

