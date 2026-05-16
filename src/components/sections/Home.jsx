import { useState, useEffect } from 'react'
import MiniTerminal from '../MiniTerminal'
import AIChatBar from '../AIChatBar'

const PHRASES = [
  'Cyber Security Enthusiast',
  'Penetration Tester',
  'Network Security Analyst',
  'CTF Player & Researcher',
  'IoT Hardware Hacker',
]

function TypingText() {
  const [text, setText] = useState('')
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const phrase = PHRASES[phraseIdx]
    let timeout

    if (!deleting) {
      if (charIdx < phrase.length) {
        timeout = setTimeout(() => setCharIdx(i => i + 1), 72)
      } else {
        timeout = setTimeout(() => setDeleting(true), 2000)
      }
    } else {
      if (charIdx > 0) {
        timeout = setTimeout(() => setCharIdx(i => i - 1), 42)
      } else {
        setDeleting(false)
        setPhraseIdx(i => (i + 1) % PHRASES.length)
        timeout = setTimeout(() => {}, 300)
      }
    }

    setText(phrase.slice(0, charIdx))
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, phraseIdx])

  return <span id="typingText">{text}</span>
}

function HexFrame() {
  return (
    <div className="hex-frame">
      <div className="hex-inner">
        <div className="hex-content">
          <div className="hex-icon">🛡️</div>
          <div className="hex-stat"><span className="stat-val">3+</span><span className="stat-key">Projects</span></div>
          <div className="hex-stat"><span className="stat-val">4</span><span className="stat-key">Certs</span></div>
          <div className="hex-stat"><span className="stat-val">2</span><span className="stat-key">Internships</span></div>
        </div>
      </div>
      <div className="hex-ring r1" /><div className="hex-ring r2" /><div className="hex-ring r3" />
    </div>
  )
}

export default function Home({ onNavigate }) {
  return (
    <section id="home" className="section active">
      <div className="home-grid">
        <div className="home-left">
          <div className="hero-tag">// PORTFOLIO v2.0 — MCA · Cybersecurity</div>
          <h1 className="hero-name">MAKESH<br /><span className="hero-name-sub">KUMAR</span></h1>
          <div className="hero-title">
            <span className="title-prefix">&gt;_</span>
            <TypingText />
            <span className="cursor-blink">|</span>
          </div>
          <p className="hero-desc">
            Cybersecurity enthusiast with hands-on experience in penetration testing, digital forensics, and CTF challenges.
            Successfully completed picoCTF challenges and actively organized technical competitions to promote secure coding practices.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => onNavigate('projects')}>
              <span>View Projects</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <a className="btn-secondary" href="assets/resume.pdf" download>
              <span>Download Resume</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
          </div>
        </div>
        <div className="home-right"><HexFrame /></div>
      </div>

      <MiniTerminal />
      <AIChatBar />
    </section>
  )
}
