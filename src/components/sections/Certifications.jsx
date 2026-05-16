const CERTS = [
  {
    medal: '🏅',
    checkClass: '',
    checkText: '✓ VERIFIED',
    issuer: 'Selfmade Ninja Academy',
    name: 'Cyber Tech Mastery',
    year: '2026',
    tags: ['Ethical Hacking','Pen Testing','Network Security'],
  },
  {
    medal: '📜',
    checkClass: 'cert-check-blue',
    checkText: '✓ CERTIFIED',
    issuer: 'Hackover Security PVT LTD',
    name: 'CCNA',
    year: '2024',
    tags: ['Cisco','Networking','Routing'],
  },
  {
    medal: '💻',
    checkClass: 'cert-check-purple',
    checkText: '✓ CERTIFIED',
    issuer: 'Error Makes Clever',
    name: 'Full Stack Web Development',
    year: '2025',
    tags: ['HTML','CSS','JavaScript'],
  },
  {
    medal: '🔧',
    checkClass: 'cert-check-yellow',
    checkText: '✓ CERTIFIED',
    issuer: 'Mohan Institute',
    name: 'Computer Hardware Chip-Level Servicing',
    year: '2025',
    tags: ['Hardware','Chip-Level','Servicing'],
  },
]

export default function Certifications() {
  return (
    <section id="certifications" className="section active">
      <div className="section-header">
        <div className="section-tag">// 04 — CERTIFICATIONS</div>
        <h2 className="section-title">Credentials</h2>
      </div>

      <div className="certs-grid">
        {CERTS.map(({ medal, checkClass, checkText, issuer, name, year, tags }) => (
          <div key={name} className="cert-card-sm glass-card">
            <div className="cert-top">
              <div className="cert-medal">{medal}</div>
              <div className={`cert-check${checkClass ? ' ' + checkClass : ''}`}>{checkText}</div>
            </div>
            <div className="cert-issuer-sm">{issuer}</div>
            <div className="cert-name-sm">{name}</div>
            <div className="cert-year">{year}</div>
            <div className="cert-tags-sm">{tags.map(t => <span key={t}>{t}</span>)}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
