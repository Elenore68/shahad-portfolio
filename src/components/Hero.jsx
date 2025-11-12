import Button from './bits/Button.jsx'
import { LuDownload } from "react-icons/lu";
import { LuLinkedin } from "react-icons/lu";
import { FaXTwitter } from "react-icons/fa6";
import { FiGithub } from "react-icons/fi";

function Hero() {
  return (
    <section className="relative bg-[#F4F3FA] py-16 md:py-24 px-5 md:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-16 md:min-h-[550px]">
        {/* Left: Text */}
        <div className="order-1 md:order-1 flex flex-col items-center md:items-start text-center md:text-left" style={{ fontFamily: 'Poppins, ui-sans-serif, system-ui' }}>
          <p className="text-[16px] md:text-[18px] text-[#4b4b4b]">Hello I'm</p>
          <h1 className="mt-2 text-[28px] md:text-[36px] font-semibold">
            <span className="text-[#D99BA4]">Shahad</span>{' '}
            <span className="text-[#443592]">Aljohani</span>
          </h1>
          <p className="mt-2 text-[16px] md:text-[20px] font-medium text-[#443592]">Computer Science Graduate</p>
          <p className="mt-5 max-w-[600px] text-[14px] md:text-[16px] leading-[1.7] text-[#555555]">
            Curious and detail‑oriented, I love organizing, creating, and exploring how things work.
          </p>
          <div className="mt-6 flex gap-3 flex-wrap justify-center md:justify-start">
            <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-[#443592] text-white px-5 md:px-6 py-2.5 rounded-lg text-[14px] md:text-[15px] font-medium shadow-soft">
              <LuDownload />
              Download CV
            </a>
            <a href="#projects" className="inline-flex items-center justify-center border border-[#D99BA4] text-[#D99BA4] px-5 md:px-6 py-2.5 rounded-lg text-[14px] md:text-[15px] font-medium">
              Projects
            </a>
          </div>
          {/* Social Icons */}
          <div className="mt-6 flex gap-4 justify-center md:justify-start">
            <a
              href="http://www.linkedin.com/in/shahad02aljohani"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-[#443592] transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LuLinkedin  className="w-6 h-6" color="#443592"/>
            </a>
            <a
              href="https://x.com/_hollygrove5"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-[#443592] transition-colors"
              aria-label="X Profile"
            >
              <FaXTwitter className="w-6 h-6"  color="#443592" />
            </a>
            <a
              href="https://github.com/Elenore68"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-[#443592] transition-colors"
              aria-label="github Profile"
            >
              <FiGithub className="w-6 h-6"  color="#443592" />
            </a>
          </div>
        </div>

        {/* Right: Code Window (restructured) */}
        <div className="relative order-2 md:order-2 h-auto md:h-[480px] flex items-center justify-center">
          <div className="relative w-full max-w-[520px] aspect-[535/367]">
            {/* Rotated gradient background behind card */}
            <div
              className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary-500/20 to-primary-500/5"
              style={{ transform: 'rotate(4.68142deg)' }}
            ></div>

            {/* Code window card */}
            <div className="relative bg-white border border-gray-200 p-4 sm:p-6 rounded-2xl shadow-sm h-full w-full">
              {/* Header */}
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-[10px] sm:text-xs text-gray-500">developer.js</div>
              </div>

              {/* Code content */}
              <div className="space-y-1.5 font-mono text-[10px] sm:text-sm md:text-base leading-[1.6] overflow-x-auto break-words">

                <div className="text-[#4CC9A2]">// Exploring Frontend, UI/UX, and Cloud</div>

                <div>
                  <span className="text-pink-600">const</span>
                  <span className="text-blue-600"> developer</span>
                  <span className="text-gray-500"> = </span>
                  <span className="text-orange-500">{'{'}</span>
                </div>

                <div className="pl-6">
                  <span className="text-purple-600">name</span>
                  <span className="text-gray-500">: </span>
                  <span className="text-[#B26F4D]">'Shahad Al-Johani'</span>
                  <span className="text-gray-500">,</span>
                </div>

                <div className="pl-6">
                  <span className="text-purple-600">skills</span>
                  <span className="text-gray-500">: </span>
                  <span className="text-orange-500">[</span>
                  <span className="text-[#B26F4D]">'React'</span>
                  <span className="text-gray-500">,</span>
                  <span className="text-[#B26F4D]">'Node.js'</span>
                  <span className="text-gray-500">,</span>
                  <span className="text-[#B26F4D]">'Python'</span>
                  <span className="text-gray-500">,</span>
                  <span className="text-[#B26F4D]">'JavaScript'</span>
                  <span className="text-orange-500">]</span>
                  <span className="text-gray-500">,</span>
                </div>

                <div className="pl-6">
                  <span className="text-purple-600">focuses</span>
                  <span className="text-gray-500">: </span>
                  <span className="text-orange-500">[</span>
                  <span className="text-[#B26F4D]">'Cloud Engineering'</span>
                  <span className="text-gray-500">,</span>
                  <span className="text-[#B26F4D]">'Frontend Development'</span>
                  <span className="text-gray-500">,</span>
                  <span className="text-[#B26F4D]">'UI/UX Design'</span>
                  <span className="text-orange-500">]</span>
                  <span className="text-gray-500">,</span>
                </div>

                <div className="pl-6">
                  <span className="text-purple-600">learning</span>
                  <span className="text-gray-500">: </span>
                  <span className="text-[#B26F4D]">'Always'</span>
                </div>

                <div>
                  <span className="text-orange-500">{'}'}</span>
                  <span className="text-gray-500">;</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero


