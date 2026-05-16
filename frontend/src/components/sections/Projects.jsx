const PROJECTS = [
  {
    icon: '📡',
    tag: 'IoT Security · March 2025',
    title: 'WiFi Penetration Tool using ESP8266',
    desc: 'Built a custom WiFi penetration testing tool using the ESP8266 microcontroller and ESP Flasher. The device can perform deauthentication attacks, beacon flooding, and probe sniffing — demonstrating real-world wireless attack vectors in a controlled lab environment.',
    tech: ['ESP8266','ESP Flasher','WiFi Security','Hardware Hacking'],
  },
  {
    icon: '🏗️',
    tag: 'Network Engineering · November 2025',
    title: 'Advanced Campus Area Network Architecture',
    desc: 'Designed and implemented a full-scale campus area network using Cisco Packet Tracer and Python automation scripts. The architecture includes VLAN segmentation, inter-VLAN routing, DHCP, DNS, VPN tunnels, and ACL-based access control across multiple buildings.',
    tech: ['Python','Cisco Packet Tracer','VLAN','Routing','ACL'],
  },
  {
    icon: '📶',
    tag: 'Hardware Security · January 2026',
    title: 'DIY Bluetooth Jammer using ESP32',
    desc: 'Engineered a Bluetooth jamming device using ESP32 and nRF24 modules programmed with Arduino IDE. The project explores 2.4GHz frequency interference techniques, demonstrating how unprotected IoT devices can be disrupted — a practical study in wireless security threats.',
    tech: ['ESP32','nRF24','Arduino IDE','Bluetooth Security','IoT'],
  },
]

const ACHIEVEMENTS = [
  { icon:'🏆', text: <span>Completed <strong>picoCTF</strong> challenges successfully</span> },
  { icon:'🎯', text: <span>Completed <strong>CTF</strong> at Selfmade Ninja Academy Lab</span> },
  { icon:'🔧', text: <span>Organized <strong>Debugging Competition</strong> at Hindusthan College</span> },
  { icon:'🎤', text: <span>Delivered <strong>Seminar</strong> on Intro to Cyber Attack at Sakthi Engineering College</span> },
]

export default function Projects() {
  return (
    <section id="projects" className="section active">
      <div className="section-header">
        <div className="section-tag">// 03 — PROJECTS</div>
        <h2 className="section-title">Work &amp; Research</h2>
      </div>

      <div className="projects-grid">
        {PROJECTS.map(({ icon, tag, title, desc, tech }) => (
          <div key={title} className="project-card glass-card">
            <div className="project-icon">{icon}</div>
            <div className="project-tag">{tag}</div>
            <h3 className="project-title">{title}</h3>
            <p className="project-desc">{desc}</p>
            <div className="project-tech">{tech.map(t => <span key={t}>{t}</span>)}</div>
            <div className="project-arrow">→</div>
          </div>
        ))}
      </div>

      <div className="section-header" style={{ marginTop:'48px' }}>
        <div className="section-tag">// ACHIEVEMENTS</div>
        <h2 className="section-title">Highlights</h2>
      </div>

      <div className="achievements-grid">
        {ACHIEVEMENTS.map(({ icon, text }, i) => (
          <div key={i} className="ach-card glass-card">
            <div className="ach-icon">{icon}</div>
            <div className="ach-text">{text}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
