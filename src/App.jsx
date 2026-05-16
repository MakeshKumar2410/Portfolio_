import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import ParticleCanvas from './components/ParticleCanvas'
import CursorGlow from './components/CursorGlow'
import Home from './components/sections/Home'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Certifications from './components/sections/Certifications'
import Resume from './components/sections/Resume'
import Contact from './components/sections/Contact'

const SECTIONS = { home: Home, about: About, skills: Skills, projects: Projects, certifications: Certifications, resume: Resume, contact: Contact }

export default function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigate = (section) => {
    setActiveSection(section)
    setSidebarOpen(false)
  }

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setSidebarOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const ActiveSection = SECTIONS[activeSection]

  return (
    <>
      <ParticleCanvas />
      <div className="scanlines" />

      <button
        type="button"
        className={`mobile-menu-btn${sidebarOpen ? ' is-open' : ''}`}
        onClick={() => setSidebarOpen(o => !o)}
        aria-label={sidebarOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={sidebarOpen}
      >
        <span className="menu-bar" />
        <span className="menu-bar" />
        <span className="menu-bar" />
      </button>

      <Sidebar activeSection={activeSection} isOpen={sidebarOpen} onNavigate={navigate} />

      {sidebarOpen && (
        <div className="sidebar-overlay open" onClick={() => setSidebarOpen(false)} />
      )}

      <main className="main-content">
        <ActiveSection onNavigate={navigate} />
      </main>

      <CursorGlow />
    </>
  )
}
