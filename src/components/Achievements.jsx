import { useState, useRef, useEffect } from 'react'
import ScrollFloat from './bits/ScrollFloat.jsx'
import { GrAchievement } from 'react-icons/gr'
import { PiCertificateLight } from 'react-icons/pi'
import { HiOutlineAcademicCap } from 'react-icons/hi'
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io'

function Achievements() {
  const scrollContainerRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const achievements = [
    {
      year: "2024",
      title: "3rd Place – Datathon 2024",
      org: "Himma Bootcamp / Tuwaiq Academy",
      desc: "Developed an AI-driven data solution during a national data competition.",
      category: "Competition"
    },
    {
      year: "2024",
      title: "Google Data Analytics",
      org: "Google / Coursera",
      desc: "Completed Google's 8-course program covering SQL, Tableau and data visualization.",
      category: "Certification"
    },
    {
      year: "2023",
      title: "Dean's List – Taibah University",
      org: "Taibah University – CS Department",
      desc: "Recognized for academic excellence and top GPA ranking.",
      category: "Academic"
    },
    {
      year: "2025",
      title: "Data Analysis using SQL",
      org: "Tuwaiq Academy",
      desc: "Gained hands-on experience in SQL and database management for data analysis.",
      category: "Certification"
    },
    {
      year: "2025",
      title: "Web Development with Django",
      org: "Tuwaiq Academy",
      desc: "Built full-stack web applications using Django and Bootstrap.",
      category: "Certification"
    }
  ]

  // Use same colors as Projects tags
  const tagColorPalette = [
    { bg: 'rgba(217, 155, 164, 0.27)', text: '#E23F57' }, // Pink
    { bg: 'rgba(244, 191, 79, 0.27)', text: '#DE9600' }, // Yellow/Gold
    { bg: 'rgba(68, 53, 146, 0.27)', text: '#443592' }, // Purple
    { bg: 'rgba(99, 102, 241, 0.27)', text: '#6366F1' }, // Indigo
    { bg: 'rgba(14, 165, 233, 0.27)', text: '#0EA5E9' }, // Sky Blue
    { bg: 'rgba(34, 197, 94, 0.27)', text: '#22C55E' }, // Green
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
        iconColor = '#E23F57' // Pink like tag
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
    // Map categories to specific colors, then cycle through palette
    const categoryColorMap = {
      'Competition': { bg: 'rgba(244, 191, 79, 0.27)', text: '#DE9600' },
      'Certification': { bg: 'rgba(68, 53, 146, 0.27)', text: '#443592' },
      'Academic': { bg: 'rgba(217, 155, 164, 0.27)', text: '#E23F57' },
    }
    
    if (categoryColorMap[category]) {
      return categoryColorMap[category]
    }
    
    // Fallback to cycling through palette
    return tagColorPalette[index % tagColorPalette.length]
  }

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScrollButtons()
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScrollButtons)
      window.addEventListener('resize', checkScrollButtons)
      return () => {
        container.removeEventListener('scroll', checkScrollButtons)
        window.removeEventListener('resize', checkScrollButtons)
      }
    }
  }, [])

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section id="achievements" className="relative w-full overflow-hidden py-12 md:py-16 bg-[#F4F3FA]">
      <div className="relative max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        {/* Section Header */}
        <div className="mb-4">
          <ScrollFloat
            animationDuration={1}
            ease='back.inOut(2)'
            scrollStart='center bottom+=50%'
            scrollEnd='bottom bottom-=40%'
            stagger={0.05}
            containerClassName=""
            textClassName="text-[#443592] font-bold text-3xl md:text-4xl"
          >
            Achievements & Certifications
          </ScrollFloat>
          <div className="h-[3px] w-[70px] bg-[#EFCB7B] mt-2 mb-3" />
          <p className="text-gray-700 text-base md:text-lg max-w-3xl mb-4">
            Highlights of my journey – awards, competitions & credentials earned.
          </p>
        </div>

        {/* Scroll Container with Navigation */}
        <div className="relative">
          {/* Navigation Buttons - Above Cards */}
          <div className="flex justify-end gap-2 mb-4">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center transition-all duration-200 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Scroll left"
            >
              <IoIosArrowDropleft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center transition-all duration-200 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Scroll right"
            >
              <IoIosArrowDropright className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Cards Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
            onScroll={checkScrollButtons}
          >
            {achievements.map((achievement, index) => {
              const categoryColors = getCategoryColor(achievement.category, index)
              return (
                <div
                  key={index}
                  className="flex-shrink-0 w-[320px] md:w-[360px] rounded-2xl p-6 transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'rgba(255, 255, 255, 0.6)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}
                >
                  {/* Icon and Year */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getCategoryIcon(achievement.category)}
                      <span className="text-sm text-gray-500 font-medium">{achievement.year}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {achievement.title}
                  </h3>

                  {/* Organization */}
                  <p className="text-sm text-gray-600 mb-3">
                    {achievement.org}
                  </p>

                  {/* Description */}
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {achievement.desc}
                  </p>

                  {/* Category Badge */}
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

      {/* Hide scrollbar styles */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}

export default Achievements

