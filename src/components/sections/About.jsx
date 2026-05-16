export default function About() {
  return (
    <section id="about" className="section active">
      <div className="section-header">
        <div className="section-tag">// 01 — ABOUT</div>
        <h2 className="section-title">Who Am I</h2>
      </div>

      <div className="about-grid">
        <div className="about-text glass-card">
          <div className="card-accent" />
          <p>I am <strong>Makesh Kumar</strong>, a Master's of Computer Application student at Hindusthan College of Arts and Science, Coimbatore — specializing in cybersecurity, penetration testing, and network security.</p>
          <p>I have completed internships at <strong>Hackover Security</strong> in both Ethical Hacking and Cisco Networking, and hold certifications in Full Stack Web Development, <strong>Cyber Tech Mastery</strong>, CCNA, and hardware servicing.</p>
          <p>I actively participate in CTF challenges (picoCTF, Selfmade Ninja Academy), organize technical events, and deliver seminars on cybersecurity topics.</p>
          <div className="about-badges">
            {['Ethical Hacker','Pen Tester','Network Security','CTF Player','Hardware Hacker','Event Organizer'].map(b => (
              <span key={b} className="badge">{b}</span>
            ))}
          </div>
        </div>

        <div className="about-stats">
          {[
            { icon:'🔐', num:'3+', label:'Security Projects' },
            { icon:'🏅', num:'4',  label:'Certifications' },
            { icon:'💼', num:'2',  label:'Internships' },
            { icon:'🏆', num:'2+', label:'CTF Completed' },
          ].map(({ icon, num, label }) => (
            <div key={label} className="stat-card glass-card">
              <div className="stat-icon">{icon}</div>
              <div className="stat-number">{num}</div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="section-header" style={{ marginTop:'48px' }}>
        <div className="section-tag">// EDUCATION</div>
        <h2 className="section-title">Academic Background</h2>
      </div>
      <div className="edu-grid">
        {[
          { icon:'🎓', degree:"Master's of Computer Application (MCA)", school:'Hindusthan College of Arts and Science, Coimbatore', cgpa:'CGPA: 8.5', year:'2027 (Ongoing)' },
          { icon:'📚', degree:'B.Sc DCFS', school:'Nehru Arts and Science College', cgpa:'CGPA: 8.0', year:'2025' },
          { icon:'📋', degree:'Higher Secondary', school:'State Board of Tamil Nadu', cgpa:'60%', year:'2020' },
        ].map(({ icon, degree, school, cgpa, year }) => (
          <div key={degree} className="edu-card glass-card">
            <div className="edu-icon">{icon}</div>
            <div className="edu-info">
              <div className="edu-degree">{degree}</div>
              <div className="edu-school">{school}</div>
              <div className="edu-meta">
                <span className="edu-cgpa">{cgpa}</span>
                <span className="edu-year">{year}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Internship */}
      <div className="section-header" style={{ marginTop:'48px' }}>
        <div className="section-tag">// INTERNSHIP</div>
        <h2 className="section-title">Work Experience</h2>
      </div>
      <div className="internship-grid">
        <div className="internship-card glass-card">
          <div className="int-header">
            <div className="int-logo">🏢</div>
            <div>
              <div className="int-company">Hackover Security</div>
              <div className="int-role">Ethical Hacking &amp; Computer Networks Internship</div>
              <div className="int-location">📍 Coimbatore, India</div>
            </div>
          </div>
          <p className="int-desc">Hands-on internship covering computer networks fundamentals and ethical hacking techniques — including reconnaissance, exploitation, and reporting in real-world lab environments.</p>
          <div className="project-tech"><span>Ethical Hacking</span><span>Network Security</span><span>Penetration Testing</span></div>
        </div>
        <div className="internship-card glass-card">
          <div className="int-header">
            <div className="int-logo">🌐</div>
            <div>
              <div className="int-company">Hackover Security</div>
              <div className="int-role">Computer Networks using Cisco Packet Tracer</div>
              <div className="int-location">📍 Coimbatore, India</div>
            </div>
          </div>
          <p className="int-desc">Specialized internship focused on network design, simulation, and troubleshooting using Cisco Packet Tracer — covering VLAN, routing protocols, subnetting, and access control lists.</p>
          <div className="project-tech"><span>Cisco Packet Tracer</span><span>VLAN</span><span>Routing</span><span>ACL</span></div>
        </div>
      </div>
    </section>
  )
}
