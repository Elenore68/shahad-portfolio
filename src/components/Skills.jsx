import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiJavascript, SiPython, SiNodedotjs, SiFirebase, SiHtml5, SiCss3, SiGit, SiGithub, SiDocker, SiMongodb, SiExpress, SiVuedotjs, SiDjango ,SiKubernetes , SiFigma, SiMysql} from 'react-icons/si'
import { FcLinux } from "react-icons/fc";
import { FaJava } from "react-icons/fa6";
import { VscAzure } from "react-icons/vsc";
import ScrollFloat from './bits/ScrollFloat.jsx'
import LogoLoop from './bits/LogoLoop.jsx'

function Skills() {
  const techLogos = [
      // 🌐 Web Development
  { node: <SiReact style={{ fontSize: '64px', color: '#61DAFB' }} />, title: "React", href: "https://react.dev" },
  { node: <SiTypescript style={{ fontSize: '64px', color: '#3178C6' }} />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss style={{ fontSize: '64px', color: '#06B6D4' }} />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiJavascript style={{ fontSize: '64px', color: '#F7DF1E' }} />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { node: <SiHtml5 style={{ fontSize: '64px', color: '#E34F26' }} />, title: "HTML5", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { node: <SiCss3 style={{ fontSize: '64px', color: '#1572B6' }} />, title: "CSS3", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },

  // 🧠 Backend & Databases
  { node: <SiPython style={{ fontSize: '64px', color: '#3776AB' }} />, title: "Python", href: "https://www.python.org" },
  { node: <SiDjango style={{ fontSize: '64px', color: '#004D40' }} />, title: "Django", href: "https://www.djangoproject.com" },
  { node: <SiMysql style={{ fontSize: '64px', color: '#00758F' }} />, title: "MySQL", href: "" },
  { node: <FaJava style={{ fontSize: '64px', color: '#E76F00' }} />, title: "Java", href: "" },

  // ☁️ Cloud & DevOps
  { node: <SiFirebase style={{ fontSize: '64px', color: '#FFCA28' }} />, title: "Firebase", href: "https://firebase.google.com" },
  { node: <VscAzure style={{ fontSize: '64px', color: '#3CB9EF' }} />, title: "Azure", href: "" },
  { node: <SiDocker style={{ fontSize: '64px', color: '#2496ED' }} />, title: "Docker", href: "https://www.docker.com" },
  { node: <SiKubernetes style={{ fontSize: '64px', color: '#2D8DC7' }} />, title: "Kubernetes", href: "https://kubernetes.io/" },
  { node: <FcLinux style={{ fontSize: '64px' }} />, title: "Linux", href: "" },

  // ⚙️ Tools & Design
  { node: <SiGit style={{ fontSize: '64px', color: '#F05032' }} />, title: "Git", href: "https://git-scm.com" },
  { node: <SiGithub style={{ fontSize: '64px', color: '#181717' }} />, title: "GitHub", href: "https://github.com" },
  { node: <SiFigma style={{ fontSize: '64px', color: '#F24E1E' }} />, title: "Figma", href: "" },


    
  ]

  return (
    <section id="skills" className="relative w-full py-12 md:py-16 bg-[#F4F3FA]">
      <div className="relative max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        {/* Section Title */}
        <div className="mb-8 md:mb-12">
          <ScrollFloat
            animationDuration={1}
            ease='back.inOut(2)'
            scrollStart='center bottom+=50%'
            scrollEnd='bottom bottom-=40%'
            stagger={0.05}
            containerClassName=""
            textClassName="text-[#443592] font-bold text-3xl md:text-4xl"
          >
            Skills
          </ScrollFloat>
          <div className="h-[3px] w-[70px] bg-[#EFCB7B] mt-2" />
        </div>

        {/* Description */}
        <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-3xl mb-8">
          I'm experienced in a wide range of technologies across frontend, backend, and DevOps, building efficient, scalable, and visually engaging solutions that bridge creativity with engineering.
        </p>

        {/* Animated Logo Loop - Moving logos in two rows */}
        <div className="mt-4 mb-2 space-y-4">
          {/* First Row */}
          <div style={{ height: '100px' }}>
            <LogoLoop
              logos={techLogos.slice(0, Math.ceil(techLogos.length / 2))}
              speed={50}
              direction="left"
              logoHeight={64}
              gap={60}
              pauseOnHover
              scaleOnHover
              fadeOut
              fadeOutColor="#F4F3FA"
              ariaLabel="Technology skills row 1"
              className="py-4"
            />
          </div>
          {/* Second Row - Moving in opposite direction */}
          <div style={{ height: '100px' }}>
            <LogoLoop
              logos={techLogos.slice(Math.ceil(techLogos.length / 2))}
              speed={50}
              direction="right"
              logoHeight={64}
              gap={60}
              pauseOnHover
              scaleOnHover
              fadeOut
              fadeOutColor="#F4F3FA"
              ariaLabel="Technology skills row 2"
              className="py-4"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills

