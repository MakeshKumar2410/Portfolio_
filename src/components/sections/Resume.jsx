export default function Resume() {
  return (
    <section id="resume" className="section active">
      <div className="section-header">
        <div className="section-tag">// 05 — RESUME</div>
        <h2 className="section-title">Download CV</h2>
      </div>
      <div className="resume-center">
        <div className="resume-card glass-card">
          <div className="resume-preview">
            <div className="resume-lines">
              <div className="r-line long" /><div className="r-line medium" /><div className="r-block" />
              <div className="r-line long" /><div className="r-line short" /><div className="r-line medium" />
              <div className="r-block" /><div className="r-line long" />
            </div>
            <div className="resume-label">MAKESH_KUMAR_RESUME.pdf</div>
          </div>
          <a className="btn-primary resume-btn" href="assets/resume.pdf" download>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Download Resume</span>
          </a>
          <p className="resume-note">PDF • Updated 2025</p>
        </div>
      </div>
    </section>
  )
}
