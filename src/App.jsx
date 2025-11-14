import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Achievements from './components/Achievements.jsx'
import Contact from './components/Contact.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

function App() {
  return (
    <div 
      className="bg-canvas"
      style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }}
    >
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
      </main>
      <ScrollToTop />
    </div>
  )
}

export default App


