import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'
import ScrollFloat from './bits/ScrollFloat.jsx'
import bg2 from '../assets/images/bg2.png'
import AddProjectsButton from './AddProjectsButton.jsx'
import { SiGithub } from 'react-icons/si'
import { MdArrowOutward } from 'react-icons/md'

function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showAll, setShowAll] = useState(false)
  
  // Show only first 3 projects initially
  const displayedProjects = showAll ? projects : projects.slice(0, 3)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const projectsCollection = collection(db, 'projects')
        const projectsSnapshot = await getDocs(projectsCollection)
        const projectsList = projectsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        
        setProjects(projectsList)
        setError(null)
      } catch (err) {
        console.error('Error fetching projects:', err)
        setError('Failed to load projects. Please check your Firebase configuration.')
        setProjects([])
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Tag color system with 27% opacity background and specific text colors
  const tagColorPalette = [
    { bg: 'rgba(217, 155, 164, 0.27)', text: '#E23F57' }, // Pink
    { bg: 'rgba(244, 191, 79, 0.27)', text: '#DE9600' }, // Yellow/Gold
    { bg: 'rgba(68, 53, 146, 0.27)', text: '#443592' }, // Purple
    { bg: 'rgba(99, 102, 241, 0.27)', text: '#6366F1' }, // Indigo
    { bg: 'rgba(14, 165, 233, 0.27)', text: '#0EA5E9' }, // Sky Blue
    { bg: 'rgba(34, 197, 94, 0.27)', text: '#22C55E' }, // Green
    { bg: 'rgba(236, 72, 153, 0.27)', text: '#EC4899' }, // Pink
    { bg: 'rgba(168, 85, 247, 0.27)', text: '#A855F7' }, // Purple
  ]

  const getTagColor = (tag, index) => {
    // Use index to cycle through colors
    const colorIndex = index % tagColorPalette.length
    return tagColorPalette[colorIndex]
  }

  return (
    <section id="projects" className="relative w-full overflow-hidden pt-14 md:pt-20 pb-4 md:pb-6">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bg2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.85
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(244,243,250,0.3) 0%, rgba(255,255,255,0.1) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        {/* Section Title */}
        <div className="mb-12 md:mb-16">
          <ScrollFloat
            animationDuration={1}
            ease='back.inOut(2)'
            scrollStart='center bottom+=50%'
            scrollEnd='bottom bottom-=40%'
            stagger={0.05}
            containerClassName=""
            textClassName="text-[#443592] font-semibold text-3xl md:text-4xl"
          >
            Projects
          </ScrollFloat>
          <div className="h-[3px] w-[70px] bg-[#EFCB7B] mt-2" />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-[#443592] text-lg">Loading projects...</div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12 text-red-600">
            <p>{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && projects.length === 0 && (
          <div className="text-center py-12 text-[#2D2D2D]">
            <p className="mb-4">No projects found. Add projects to your Firebase database.</p>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && projects.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {displayedProjects.map((project) => (
              <div
                key={project.id}
                className="group relative rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.03] flex flex-col"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  padding: '1.5rem'
                }}
              >
                {/* Project Image - Floating at top, no frame */}
                <div 
                  className="relative w-full mb-6 flex-shrink-0"
                  style={{
                    height: '45%',
                    minHeight: '200px',
                    paddingTop: '0.5rem'
                  }}
                >
                  <img
                    src={project.image || 'https://via.placeholder.com/400x300'}
                    alt={project.nameProject || 'Project'}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    style={{
                      filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))'
                    }}
                  />
                </div>

                {/* Card Content */}
                <div className="flex flex-col flex-grow px-0">
                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                    {project.nameProject || 'Untitled Project'}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-[2px] flex-grow">


                    {project.descraption || project.description || 'No description available.'}
                  </p>

                  {/* Links - GitHub Tag Style */}
                  {project.Links && project.Links.length > 0 && project.Links[0] && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.Links.filter(link => link && link.trim() !== '').map((link, index) => (
                        <a
                          key={index}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-300 transition-all duration-200 hover:opacity-80"
                          style={{
                            background: 'rgba(255, 255, 255, 0.23)',
                            borderColor: '#D0D7DE',
                            color: '#24292F'
                          }}
                        >
                          {index === 0 ? (
                            <>
                              <SiGithub className="w-4 h-4" />
                              <span className="text-sm font-medium">GitHub</span>
                            </>
                          ) : (
                            <>
                              <MdArrowOutward className="w-4 h-4" />
                              <span className="text-sm font-medium">Demo</span>
                            </>
                          )}
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags && project.tags.filter(tag => tag && tag.trim() !== '').map((tag, index) => {
                      const colors = getTagColor(tag, index)
                      return (
                        <span
                          key={index}
                          className="px-3 py-1.5 rounded-full text-xs font-medium"
                          style={{
                            background: colors.bg,
                            color: colors.text
                          }}
                        >
                          {tag}
                        </span>
                      )
                    })}
                  </div>
                </div>
              </div>
              ))}
            </div>

            {/* Show More / Show Less Buttons */}
            {projects.length > 3 && (
              <div className="flex justify-center mt-12">
                {!showAll ? (
                  <button
                    onClick={() => setShowAll(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 text-gray-700 font-medium"
                    style={{
                      background: 'rgba(255, 255, 255, 0.49)',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    <span>Show More Projects</span>
                    <span className="text-gray-600">&lt; &gt;</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setShowAll(false)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 text-gray-700 font-medium"
                    style={{
                      background: 'rgba(255, 255, 255, 0.8)',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    <span>Show Less Projects</span>
                    <span className="text-gray-600">&lt; &gt;</span>
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Add Projects Button (only show if no projects) */}
      {!loading && projects.length === 0 && (
        <AddProjectsButton />
      )}
    </section>
  )
}

export default Projects

