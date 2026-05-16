import { useEffect, useRef } from 'react'

const SKILLS = [
  { icon:'🔓', name:'Penetration Testing',      pct:40 },
  { icon:'🔍', name:'Vulnerability Assessment', pct:35 },
  { icon:'🐧', name:'Linux / Kali Linux',       pct:70 },
  { icon:'🐍', name:'Python',                   pct:65 },
  { icon:'🕸️', name:'Web Security',             pct:60 },
  { icon:'⌨️', name:'C Programming',            pct:70 },
  { icon:'🧩', name:'Full Stack',               pct:60 },
  { icon:'🌐', name:'Network Security',         pct:88 },
  { icon:'📡', name:'TCP/IP & Networking',      pct:88 },
  { icon:'🔎', name:'OSINT Reconnaissance',     pct:75 },
]

const TOOLS = [
  { title:'🔒 Security Tools',   tags:['Kali Linux','Metasploit','Nmap','Wireshark','Cisco Packet Tracer'] },
  { title:'💻 Programming',      tags:['Python','C','HTML','CSS','JavaScript'] },
  { title:'📡 Networking',       tags:['TCP/IP','Subnetting','VLAN','DHCP','DNS','VPN','ACL'] },
  { title:'🖥️ Operating Systems',tags:['Linux','Windows','Windows Server','Kali Linux'] },
  { title:'🔌 Hardware & IoT',   tags:['ESP8266','ESP32','Arduino IDE','nRF24','ESP Flasher'] },
  { title:'🎯 Cyber Skills',     tags:['CTF Challenges','Digital Forensics','OSINT','Web App Security'] },
]

function SkillBar({ icon, name, pct }) {
  const fillRef = useRef(null)
  useEffect(() => {
    const t = setTimeout(() => { if (fillRef.current) fillRef.current.style.width = pct + '%' }, 120)
    return () => clearTimeout(t)
  }, [pct])
  return (
    <div className="skill-card glass-card">
      <div className="skill-icon">{icon}</div>
      <div className="skill-info">
        <div className="skill-name">{name}</div>
        <div className="skill-bar-wrap">
          <div className="skill-bar">
            <div className="skill-fill" ref={fillRef} style={{ width: 0 }} />
          </div>
          <span className="skill-pct">{pct}%</span>
        </div>
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section active">
      <div className="section-header">
        <div className="section-tag">// 02 — SKILLS</div>
        <h2 className="section-title">Capabilities</h2>
      </div>

      <div className="skills-grid">
        {SKILLS.map(s => <SkillBar key={s.name} {...s} />)}
      </div>

      <div className="section-header" style={{ marginTop:'48px' }}>
        <div className="section-tag">// TOOLS & TECH</div>
        <h2 className="section-title">Tech Arsenal</h2>
      </div>

      <div className="tools-grid">
        {TOOLS.map(({ title, tags }) => (
          <div key={title} className="tool-group glass-card">
            <div className="tool-group-title">{title}</div>
            <div className="tool-tags">{tags.map(t => <span key={t}>{t}</span>)}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
