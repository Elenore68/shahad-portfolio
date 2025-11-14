import expIcon from '../assets/icons/experience.png'
import eduIcon from '../assets/icons/education-icon.png'
import ScrollStack, { ScrollStackItem } from './ScrollStack'
import CurvedLoop from './CurvedLoop'

function About() {
  return (
    <section id="about" className="relative w-full overflow-visible bg-[#F4F3FA] -mt-4 pb-8 md:pb-12">
      {/* Curved Loop Text */}
      <div className="relative w-full -mt-12 md:-mt-16 mb-4 md:mb-8">
        <CurvedLoop 
          marqueeText="Every sunrise is a reminder that no night lasts forever. ✦"
          speed={1}
          curveAmount={250}
          direction="left"
          interactive={true}
          className="fill-[#443592]"
          highlightWord="sunrise"
          highlightColor="#EFCB7B"
        />
      </div>
      
      {/* Content with ScrollStack */}
      <div className="relative max-w-6xl mx-auto overflow-visible">
        <ScrollStack useWindowScroll={true}>
          {/* Card 1: About Me & Description */}
          <ScrollStackItem
            itemClassName="rounded-3xl group hover:scale-[1.02] transition-all duration-500 ease-out"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
              backdropFilter: 'blur(20px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 20px 60px rgba(68, 53, 146, 0.15), 0 8px 24px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
              position: 'relative',
              zIndex: 1,
              minHeight: '280px',
            }}
          >
            <div className="h-full flex flex-col justify-center relative overflow-visible p-6 md:p-8">
              {/* Decorative gradient overlay */}
              <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none" />
              
              <div className="text-center mb-4 md:mb-6 relative z-10">
                <div className="inline-block mb-4">
                  <h2 className="text-[#443592] font-bold text-2xl md:text-4xl lg:text-5xl mb-3 md:mb-4 bg-gradient-to-r from-[#443592] to-[#6B5B95] bg-clip-text text-transparent">
                    About Me
                  </h2>
                  <div className="h-[3px] md:h-[4px] w-[60px] md:w-[80px] bg-gradient-to-r from-[#EFCB7B] via-[#F4D03F] to-[#EFCB7B] mt-2 mx-auto rounded-full shadow-lg" />
                </div>
              </div>
              <p className="text-sm md:text-base lg:text-lg leading-relaxed text-[#2D2D2D] text-center px-2 md:px-4 relative z-10" style={{ fontFamily: 'Poppins, ui-sans-serif, system-ui' }}>
                A Computer Science graduate passionate about design and technology. I specialize in blending creativity with engineering, focusing on frontend development, UI/UX design, and cloud solutions to craft meaningful and impactful digital experiences.
              </p>
            </div>
          </ScrollStackItem>

          {/* Card 2: Education */}
          <ScrollStackItem
            itemClassName="rounded-3xl group hover:scale-[1.02] transition-all duration-500 ease-out relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
              backdropFilter: 'blur(20px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 20px 60px rgba(68, 53, 146, 0.15), 0 8px 24px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
            }}
          >
            {/* Decorative gradient overlay */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 opacity-50 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none" />
            
            <div className="h-full flex flex-col justify-center relative z-10 p-6 md:p-8">
              <div className="flex items-center gap-2 md:gap-3 text-[#443592] mb-4 md:mb-5 group-hover:gap-3 md:group-hover:gap-4 transition-all duration-300">
                <div className="p-2 rounded-xl bg-gradient-to-br from-purple-100/30 to-blue-100/30 backdrop-blur-sm border border-purple-200/20 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <img src={eduIcon} alt="Education" className="w-7 h-7 md:w-8 md:h-8 object-contain" />
                </div>
                <h2 className="font-bold text-xl md:text-2xl lg:text-3xl bg-gradient-to-r from-[#443592] to-[#6B5B95] bg-clip-text text-transparent">
                  Education
                </h2>
              </div>
              <div className="h-[3px] w-[60px] md:w-[70px] bg-gradient-to-r from-[#EFCB7B] via-[#F4D03F] to-[#EFCB7B] mb-5 md:mb-6 rounded-full shadow-md" />
              <div className="space-y-3 text-[#2D2D2D]">
                <div className="p-4 md:p-5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-colors duration-300">
                  <p className="font-bold text-base md:text-lg text-[#443592] mb-1">Bachelor of Science in Computer Science</p>
                  <p className="text-sm md:text-base text-gray-700">Taibah University – Yanbu, Madina</p>
                  <p className="text-xs md:text-sm text-gray-600 mt-1">2020 – 2025</p>
                </div>
                <div className="inline-block px-3 md:px-4 py-2 rounded-full bg-gradient-to-r from-[#EFCB7B]/20 to-[#F4D03F]/20 border border-[#EFCB7B]/30 backdrop-blur-sm">
                  <p className="text-xs md:text-sm font-semibold text-[#443592]">Graduated with First Honors</p>
                </div>
              </div>
            </div>
          </ScrollStackItem>

          {/* Card 3: Experience */}
          <ScrollStackItem
            itemClassName="rounded-3xl group hover:scale-[1.02] transition-all duration-500 ease-out relative overflow-hidden min-h-[400px] md:min-h-[450px]"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
              backdropFilter: 'blur(20px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 20px 60px rgba(68, 53, 146, 0.15), 0 8px 24px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
            }}
          >
            {/* Decorative gradient overlay */}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-pink-200/20 to-purple-200/20 rounded-full blur-3xl translate-y-1/2 translate-x-1/2 opacity-50 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none" />
            
            <div className="h-full flex flex-col justify-center relative z-10 p-6 md:p-8">
              <div className="flex items-center gap-2 md:gap-3 text-[#443592] mb-4 md:mb-5 group-hover:gap-3 md:group-hover:gap-4 transition-all duration-300">
                <div className="p-2 rounded-xl bg-gradient-to-br from-pink-100/30 to-purple-100/30 backdrop-blur-sm border border-pink-200/20 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <img src={expIcon} alt="Experience" className="w-7 h-7 md:w-8 md:h-8 object-contain" />
                </div>
                <h2 className="font-bold text-xl md:text-2xl lg:text-3xl bg-gradient-to-r from-[#443592] to-[#6B5B95] bg-clip-text text-transparent">
                  Experience
                </h2>
              </div>
              <div className="h-[3px] w-[60px] md:w-[70px] bg-gradient-to-r from-[#EFCB7B] via-[#F4D03F] to-[#EFCB7B] mb-5 md:mb-6 rounded-full shadow-md" />
              <div className="space-y-3 md:space-y-4 text-[#2D2D2D]">
                <div className="p-5 md:p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 hover:shadow-lg transition-all duration-300 group/item">
                  <p className="font-bold text-base md:text-lg text-[#443592] mb-2 group-hover/item:text-[#6B5B95] transition-colors">IT Trainee</p>
                  <p className="text-sm md:text-base text-gray-700 mb-2">Royal Commission for Jubail and Yanbu</p>
                  <p className="text-xs md:text-sm text-gray-600 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#EFCB7B]"></span>
                    June 2024 – August 2024
                  </p>
                </div>
                <div className="p-5 md:p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 hover:shadow-lg transition-all duration-300 group/item">
                  <p className="font-bold text-base md:text-lg text-[#443592] mb-2 group-hover/item:text-[#6B5B95] transition-colors">Frontend Developer Intern</p>
                  <p className="text-sm md:text-base text-gray-700 mb-2">LUCA MIRO – Remote</p>
                  <p className="text-xs md:text-sm text-gray-600 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#EFCB7B]"></span>
                    April 2025 – July 2025
                  </p>
                </div>
              </div>
            </div>
          </ScrollStackItem>
        </ScrollStack>
      </div>

  </section>
  )
}
export default About



