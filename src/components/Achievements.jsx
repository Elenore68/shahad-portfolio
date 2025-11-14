import { useState, useRef, useEffect, useCallback, memo } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'
import ScrollFloat from './bits/ScrollFloat.jsx'
import { GrAchievement } from 'react-icons/gr'
import { PiCertificateLight } from 'react-icons/pi'
import { HiOutlineAcademicCap } from 'react-icons/hi'
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io'

function Achievements() {
  const scrollContainerRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [achievements, setAchievements] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const rafIdRef = useRef(null)
  const lastScrollLeftRef = useRef(-1)

  // Fetch achievements from Firebase
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setLoading(true)
        const achievementsCollection = collection(db, 'achievements')
        const achievementsQuery = query(achievementsCollection, orderBy('order', 'asc'))
        const achievementsSnapshot = await getDocs(achievementsQuery)
        const achievementsList = achievementsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setAchievements(achievementsList)
        setError(null)
      } catch (err) {
        console.error('Error fetching achievements:', err)
        setError('Failed to load achievements. Please check your Firebase configuration.')
        setAchievements([])
      } finally {
        setLoading(false)
      }
    }
    fetchAchievements()
  }, [])

  const tagColorPalette = [
    { bg: 'rgba(217, 155, 164, 0.27)', text: '#E23F57' },
    { bg: 'rgba(244, 191, 79, 0.27)', text: '#DE9600' },
    { bg: 'rgba(68, 53, 146, 0.27)', text: '#443592' },
    { bg: 'rgba(99, 102, 241, 0.27)', text: '#6366F1' },
    { bg: 'rgba(14, 165, 233, 0.27)', text: '#0EA5E9' },
    { bg: 'rgba(34, 197, 94, 0.27)', text: '#22C55E' },
  ]

  const getCategoryIcon = (category) => {
    let icon, bgColor, iconColor
    switch (category) {
      case 'Competition':
        bgColor = 'rgba(244, 191, 79, 0.25)'
        iconColor = '#DE9600'
        icon = <GrAchievement className="w-6 h-6" style={{ color: iconColor }} />
        break
      case 'Certification':
        bgColor = 'rgba(68, 53, 146, 0.25)'
        iconColor = '#443592'
        icon = <PiCertificateLight className="w-6 h-6" style={{ color: iconColor }} />
        break
      case 'Academic':
        bgColor = 'rgba(217, 155, 164, 0.25)'
        iconColor = '#E23F57'
        icon = <HiOutlineAcademicCap className="w-6 h-6" style={{ color: iconColor }} />
        break
      default:
        bgColor = 'rgba(156, 163, 175, 0.25)'
        iconColor = '#9CA3AF'
        icon = <PiCertificateLight className="w-6 h-6" style={{ color: iconColor }} />
    }
    return (
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{ background: bgColor }}
      >
        {icon}
      </div>
    )
  }

  const getCategoryColor = (category, index) => {
    const categoryColorMap = {
      'Competition': { bg: 'rgba(244, 191, 79, 0.27)', text: '#DE9600' },
      'Certification': { bg: 'rgba(68, 53, 146, 0.27)', text: '#443592' },
      'Academic': { bg: 'rgba(217, 155, 164, 0.27)', text: '#E23F57' },
    }
    if (categoryColorMap[category]) return categoryColorMap[category]
    return tagColorPalette[index % tagColorPalette.length]
  }

  // Scroll button check
  const checkScrollButtons = useCallback(() => {
    const container = scrollContainerRef.current
    if (!container) return
    const { scrollLeft, scrollWidth, clientWidth } = container
    const isScrollable = scrollWidth > clientWidth

    if (isScrollable) {
      if (Math.abs(scrollLeft - lastScrollLeftRef.current) > 1) {
        lastScrollLeftRef.current = scrollLeft
        setCanScrollLeft(scrollLeft > 5)
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5)
      } else if (lastScrollLeftRef.current === -1) {
        lastScrollLeftRef.current = scrollLeft
        setCanScrollLeft(scrollLeft > 5)
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5)
      }
    } else {
      setCanScrollLeft(false)
      setCanScrollRight(false)
    }
  }, [])

  const handleScroll = useCallback(() => {
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
    rafIdRef.current = requestAnimationFrame(() => checkScrollButtons())
  }, [checkScrollButtons])

  const handleResize = useCallback(() => {
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
    rafIdRef.current = requestAnimationFrame(() => checkScrollButtons())
  }, [checkScrollButtons])

  useEffect(() => {
    const container = scrollContainerRef.current
    checkScrollButtons()

    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true })
      window.addEventListener('resize', handleResize, { passive: true })
      return () => {
        container.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [handleScroll, handleResize, checkScrollButtons])

  useEffect(() => {
    if (!loading && achievements.length > 0) {
      const timer = setTimeout(() => {
        checkScrollButtons()
        setTimeout(() => checkScrollButtons(), 300)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [loading, achievements.length, checkScrollButtons])

  // Scroll buttons behavior
  const scroll = useCallback((direction) => {
    const container = scrollContainerRef.current
    if (!container) return

    const firstCard = container.querySelector('[class*="flex-shrink-0"]')
    const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 384

    const currentScroll = container.scrollLeft
    const maxScroll = container.scrollWidth - container.clientWidth
    const scrollAmount = cardWidth

    let newScroll =
      direction === 'left'
        ? Math.max(0, currentScroll - scrollAmount)
        : Math.min(maxScroll, currentScroll + scrollAmount)

    container.scrollTo({ left: newScroll, behavior: 'smooth' })
    checkScrollButtons()
    setTimeout(checkScrollButtons, 50)
    setTimeout(checkScrollButtons, 350)
  }, [checkScrollButtons])

  // 🔧 FIX — Disable drag on mobile (only desktop)
  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const scrollLeftRef = useRef(0)

  const handleMouseDown = useCallback((e) => {
    if (window.innerWidth < 900) return  // 🔧 FIX
    if (!scrollContainerRef.current) return
    isDraggingRef.current = true
    startXRef.current = e.pageX - scrollContainerRef.current.offsetLeft
    scrollLeftRef.current = scrollContainerRef.current.scrollLeft
    scrollContainerRef.current.style.cursor = 'grabbing'
    scrollContainerRef.current.style.userSelect = 'none'
  }, [])

  const handleMouseMove = useCallback((e) => {
    if (window.innerWidth < 900) return // 🔧 FIX
    if (!isDraggingRef.current || !scrollContainerRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startXRef.current) * 2
    scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk
  }, [])

  const handleMouseUp = useCallback(() => {
    if (!scrollContainerRef.current) return
    isDraggingRef.current = false
    scrollContainerRef.current.style.cursor = 'grab'
    scrollContainerRef.current.style.userSelect = 'auto'
  }, [])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    // Desktop only — prevent mobile freeze
    if (window.innerWidth > 900) {
      container.addEventListener('mousedown', handleMouseDown)
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      container.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleMouseDown, handleMouseMove, handleMouseUp])

  return (
    <section
      id="achievements"
      className="relative w-full py-12 md:py-16 bg-[#F4F3FA]"
      style={{
        WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'auto',
        touchAction: 'auto'  // 🔧 FIX
      }}
    >
      <div className="relative max-w-7xl mx-auto px-6 md:px-16 lg:px-24">

        {/* Header */}
        <div className="mb-4">
          <ScrollFloat
            animationDuration={1}
            ease='back.inOut(2)'
            scrollStart='center bottom+=50%'
            scrollEnd='bottom bottom-=40%'
            stagger={0.05}
            textClassName="text-[#443592] font-bold text-3xl md:text-4xl"
          >
            Achievements & Certifications
          </ScrollFloat>
          <div className="h-[3px] w-[70px] bg-[#EFCB7B] mt-2 mb-3" />
          <p className="text-gray-700 text-base md:text-lg max-w-3xl mb-4">
            Highlights of my journey – awards, competitions & credentials earned.
          </p>
        </div>

        {/* Scroll Wrapper */}
        <div className="relative" style={{ width: '100%', overflow: 'hidden' }}>
          
          {/* Navigation Arrows */}
          <div className="flex justify-end gap-2 mb-4" style={{ zIndex: 10, position: 'relative' }}>
            <button
              onClick={() => canScrollLeft && scroll('left')}
              disabled={!canScrollLeft}
              className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-30"
            >
              <IoIosArrowDropleft className="w-5 h-5 text-gray-700" />
            </button>

            <button
              onClick={() => canScrollRight && scroll('right')}
              disabled={!canScrollRight}
              className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-30"
            >
              <IoIosArrowDropright className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Cards Scroll Container — FIX APPLIED HERE */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollBehavior: 'smooth',
              // 🔧 FIX: removed touch-action, userSelect, grab, overscrollBehaviorX
            }}
          >
            {/* Loading Skeleton */}
            {loading && (
              <div className="flex-shrink-0 w-[320px] md:w-[360px] rounded-2xl p-6 bg-white/50 animate-pulse">
                <div className="h-12 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="flex-shrink-0 w-[320px] md:w-[360px] rounded-2xl p-6 bg-red-50 border border-red-200">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Empty */}
            {!loading && !error && achievements.length === 0 && (
              <div className="flex-shrink-0 w-[320px] md:w-[360px] rounded-2xl p-6 bg-gray-50">
                <p className="text-gray-600 text-sm">No achievements found.</p>
              </div>
            )}

            {/* Cards */}
            {achievements.map((achievement, index) => {
              const categoryColors = getCategoryColor(achievement.category, index)
              return (
                <div
                  key={achievement.id || index}
                  className="flex-shrink-0 w-[320px] md:w-[360px] rounded-2xl p-6"
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    transform: 'translateZ(0)',
                    transition: 'transform 0.3s ease-out'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  {/* Icon / Year */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getCategoryIcon(achievement.category)}
                      <span className="text-sm text-gray-500 font-medium">{achievement.year}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{achievement.title}</h3>

                  {/* Org */}
                  <p className="text-sm text-gray-600 mb-3">{achievement.org}</p>

                  {/* Description */}
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">{achievement.desc}</p>

                  {/* Category Tag */}
                  <div className="mt-auto">
                    <span
                      className="inline-block px-3 py-1.5 rounded-lg text-xs font-semibold"
                      style={{
                        background: categoryColors.bg,
                        color: categoryColors.text
                      }}
                    >
                      {achievement.category}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* hide scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  )
}

export default memo(Achievements)
