import { useState, useRef, useEffect } from 'react'

function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')
}

const INTENTS = [
  {
    keys: ['about','yourself','who are you','background','bio','introduce','profile','who is makesh','about makesh kumar','about you','your background','introduce yourself'],
    blocks: [
      { type:'heading', text:'◈  About Makesh Kumar' },
      { type:'text', text:'Cybersecurity enthusiast with hands-on experience in penetration testing, digital forensics, and CTF challenges. Successfully completed picoCTF challenges and actively organized technical competitions to promote secure coding practices.' },
      { type:'text', text:"Currently pursuing Master's of Computer Application (MCA) at Hindusthan College of Arts and Science, Coimbatore — with a CGPA of 8.5. Seeking an entry-level cybersecurity role to contribute technical skills and a continuous learning mindset." },
      { type:'text', text:'Completed 2 internships at Hackover Security, Coimbatore — covering Ethical Hacking and Cisco Packet Tracer network design.' },
      { type:'tags', items:['Ethical Hacker','Pen Tester','Network Security','CTF Player','IoT Hardware','Event Organizer'] },
    ],
  },
  {
    keys: ['internship','work experience','hackover','job experience'],
    blocks: [
      { type:'heading', text:'💼  Internship Experience' },
      { type:'text', text:'Two internships completed at Hackover Security, Coimbatore, India:' },
      { type:'project', icon:'🏢', title:'Internship 1 — Ethical Hacking & Computer Networks', desc:'Hands-on internship covering computer networks fundamentals and ethical hacking techniques — including reconnaissance, exploitation, and vulnerability reporting in real-world lab environments.', tech:['Ethical Hacking','Network Security','Penetration Testing','Vulnerability Assessment'] },
      { type:'project', icon:'🌐', title:'Internship 2 — Computer Networks using Cisco Packet Tracer', desc:'Specialized internship focused on network design, simulation, and troubleshooting using Cisco Packet Tracer — covering VLAN segmentation, inter-VLAN routing, DHCP, DNS, VPN tunnels, and access control lists.', tech:['Cisco Packet Tracer','VLAN','Routing','Switching','ACL','VPN'] },
    ],
  },
  {
    keys: ['skill','capability','expertise','tech','tools','proficiency','what can you do','linux','kali','python','network','hardware','esp','what are your skills','skill set','what do you know'],
    blocks: [
      { type:'heading', text:'◎  Skills & Capabilities' },
      { type:'text', text:'Full breakdown of technical skills with proficiency levels:' },
      { type:'skills', items:[
        { icon:'🔓', name:'Penetration Testing',      pct:40, desc:'Metasploit · Nmap · Vulnerability scanning · CTF challenges' },
        { icon:'🔍', name:'Vulnerability Assessment', pct:35, desc:'CVE analysis · Nessus · CVSS scoring · OSINT' },
        { icon:'🐧', name:'Linux / Kali Linux',       pct:70, desc:'Daily-driver OS · Bash scripting · Tool automation' },
        { icon:'🐍', name:'Python',                   pct:65, desc:'Security scripting · Automation · Network tools' },
        { icon:'🕸️', name:'Web Security',             pct:60, desc:'OWASP Top 10 · Web App Security · Burp Suite' },
        { icon:'⌨️', name:'C Programming',            pct:70, desc:'Systems programming · Memory management · Low-level logic' },
        { icon:'🧩', name:'Full Stack',               pct:60, desc:'HTML · CSS · JavaScript · Frontend & backend basics' },
        { icon:'🌐', name:'Network Security',         pct:88, desc:'VLAN · Routing · Switching · Firewall · Cisco Packet Tracer' },
        { icon:'📡', name:'TCP/IP & Networking',      pct:88, desc:'Subnetting · DHCP · DNS · VPN · ACL · Routing protocols' },
        { icon:'🔌', name:'IoT / Hardware',           pct:80, desc:'ESP8266 · ESP32 · nRF24 · Arduino IDE · hardware hacking' },
      ]},
    ],
  },
  {
    keys: ['project','work','built','created','esp8266','esp32','bluetooth','wifi','campus','network architecture'],
    blocks: [
      { type:'heading', text:'◈  Projects & Work' },
      { type:'text', text:'Three hardware/network security projects completed:' },
      { type:'project', icon:'📡', title:'WiFi Penetration Tool using ESP8266 — March 2025', desc:'Built a custom WiFi penetration testing tool using the ESP8266 microcontroller. Performs deauthentication attacks, beacon flooding, and probe sniffing — demonstrating wireless attack vectors in controlled lab environments.', tech:['ESP8266','ESP Flasher','WiFi Security','Hardware Hacking'] },
      { type:'project', icon:'🏗️', title:'Advanced Campus Area Network Architecture — Nov 2025', desc:'Designed and implemented a full-scale campus area network using Cisco Packet Tracer and Python. Includes VLAN segmentation, inter-VLAN routing, DHCP, DNS, VPN tunnels, and ACL-based access control across buildings.', tech:['Python','Cisco Packet Tracer','VLAN','Routing','ACL'] },
      { type:'project', icon:'📶', title:'DIY Bluetooth Jammer using ESP32 — January 2026', desc:'Engineered a Bluetooth jamming device using ESP32 and nRF24 modules programmed with Arduino IDE. Explores 2.4GHz frequency interference — demonstrating how unprotected IoT devices can be disrupted.', tech:['ESP32','nRF24','Arduino IDE','Bluetooth Security','IoT'] },
    ],
  },
  {
    keys: ['cert','credential','certificate','ccna','cyber tech','full stack','hardware','qualification'],
    blocks: [
      { type:'heading', text:'◉  Certifications & Credentials' },
      { type:'text', text:'Four verified professional certifications:' },
      { type:'cert', issuer:'Selfmade Ninja Academy', name:'Cyber Tech Mastery', desc:'Comprehensive program covering ethical hacking, penetration testing, network security, and hands-on security tooling with industry-standard practices.', tags:['Ethical Hacking','Pen Testing','Network Security'] },
      { type:'cert2', issuer:'Hackover Security PVT LTD', name:'CCNA', year:'2024', tags:['Cisco','Networking','Routing','Switching'] },
      { type:'cert2', issuer:'Error Makes Clever', name:'Full Stack Web Development', year:'2025', tags:['HTML','CSS','JavaScript','Full Stack'] },
      { type:'cert2', issuer:'Mohan Institute', name:'Computer Hardware Chip-Level Servicing', year:'2025', tags:['Hardware','Chip-Level','Servicing'] },
    ],
  },
  {
    keys: ['resume','cv','download','pdf'],
    blocks: [
      { type:'heading', text:'▤  Resume / CV' },
      { type:'text', text:"Makesh Kumar's resume covers MCA education, 2 internships at Hackover Security, 3 hardware/network projects, 4 certifications, CTF achievements, and full contact details." },
      { type:'text', text:'File: MAKESH_KUMAR_RESUME.pdf  |  Format: PDF  |  Updated: 2025' },
      { type:'download', label:'⬇  Download Resume PDF', href:'assets/resume.pdf' },
    ],
  },
  {
    keys: ['contact','reach','email','linkedin','github','connect','hire','get in touch'],
    blocks: [
      { type:'heading', text:'◌  Contact Information' },
      { type:'text', text:'Seeking an entry-level cybersecurity role. Open to internships, collaborations, and full-time opportunities.' },
      { type:'contacts', items:[
        { icon:'📧', label:'Email',    value:'makeshmk2004@gmail.com',      href:'mailto:makeshmk2004@gmail.com' },
        { icon:'💼', label:'LinkedIn', value:'linkedin.com/in/Makesh Kumar S', href:'https://linkedin.com/in/Makesh-Kumar-S' },
        { icon:'🐙', label:'GitHub',   value:'github.com/MakeshKumar2410',   href:'https://github.com/MakeshKumar2410' },
      ]},
      { type:'text', text:'Response time: within 24 hours.' },
    ],
  },
  {
    keys: ['hello','hi','hey','greet'],
    blocks: [
      { type:'heading', text:"👋  Hey there!" },
      { type:'text', text:"Welcome to Makesh Kumar's cybersecurity portfolio! Ask me anything — I'll type out the full answer right here." },
      { type:'text', text:'Try: "tell me about yourself", "show skills", "view projects", "certifications", "internship experience", or "contact".' },
      { type:'tags', items:['About','Skills','Projects','Certifications','Internship','Resume','Contact'] },
    ],
  },
  {
    keys: ['achievement','ctf','picoctf','competition','seminar'],
    blocks: [
      { type:'heading', text:'🏆  Achievements' },
      { type:'text', text:'Key highlights and accomplishments:' },
      { type:'tags', items:['Completed picoCTF','CTF @ Selfmade Ninja Academy','Debugging Competition Organizer','Cyber Attack Seminar Speaker'] },
      { type:'text', text:'Completed picoCTF challenges and the Selfmade Ninja Academy CTF lab. Organized a Debugging Competition at Hindusthan College. Delivered a seminar on "Introduction to Cyber Attack" at Sakthi Engineering College.' },
    ],
  },
]

function matchIntent(q) {
  const lower = q.toLowerCase(); let best = null, bestLen = 0
  for (const intent of INTENTS)
    for (const k of intent.keys)
      if (lower.includes(k) && k.length > bestLen) { best = intent; bestLen = k.length }
  return best
}

function SkillRow({ item }) {
  const fillRef = useRef(null)
  useEffect(() => {
    const t = setTimeout(() => { if (fillRef.current) fillRef.current.style.width = item.pct + '%' }, 200)
    return () => clearTimeout(t)
  }, [item.pct])
  return (
    <div className="rb-skill-row">
      <div className="rb-skill-top">
        <span className="rb-skill-icon">{item.icon}</span>
        <span className="rb-skill-name">{item.name}</span>
        <span className="rb-skill-pct">{item.pct}%</span>
      </div>
      <div className="rb-bar"><div className="rb-bar-fill" ref={fillRef} style={{ width: 0 }} /></div>
      <div className="rb-skill-desc">{item.desc}</div>
    </div>
  )
}

function Block({ b }) {
  switch (b.type) {
    case 'heading':   return <div className="rb-heading">{b.text}</div>
    case 'text':      return <p className="rb-text">{b.text}</p>
    case 'tags':      return <div className="rb-tags">{b.items.map(t => <span key={t} className="rb-tag">{t}</span>)}</div>
    case 'skills':    return <div className="rb-skills">{b.items.map(s => <SkillRow key={s.name} item={s} />)}</div>
    case 'project':   return (
      <div className="rb-project">
        <div className="rb-proj-header"><span className="rb-proj-icon">{b.icon}</span><span className="rb-proj-title">{b.title}</span></div>
        <p className="rb-proj-desc">{b.desc}</p>
        <div className="rb-tags">{b.tech.map(t => <span key={t} className="rb-tag rb-tag-blue">{t}</span>)}</div>
      </div>
    )
    case 'cert':      return (
      <div className="rb-cert">
        <div className="rb-cert-top">
          <span className="rb-cert-medal">🏅</span>
          <div><div className="rb-cert-issuer">{b.issuer}</div><div className="rb-cert-name">{b.name}</div><span className="rb-verified">✓ VERIFIED</span></div>
        </div>
        <p className="rb-text">{b.desc}</p>
        <div className="rb-tags">{b.tags.map(t => <span key={t} className="rb-tag">{t}</span>)}</div>
      </div>
    )
    case 'cert2':     return (
      <div className="rb-project" style={{ marginTop:'8px' }}>
        <div className="rb-proj-header"><span className="rb-proj-icon">📜</span><span className="rb-proj-title">{b.name}</span></div>
        <p className="rb-proj-desc">{b.issuer}{b.year ? ' · ' + b.year : ''}</p>
        <div className="rb-tags">{b.tags.map(t => <span key={t} className="rb-tag">{t}</span>)}</div>
      </div>
    )
    case 'contacts':  return (
      <div className="rb-contacts">
        {b.items.map(c => (
          <a key={c.label} className="rb-contact-card" href={c.href} target="_blank" rel="noopener noreferrer">
            <span className="rb-contact-icon">{c.icon}</span>
            <div><div className="rb-contact-label">{c.label}</div><div className="rb-contact-value">{c.value}</div></div>
            <span className="rb-contact-arrow">↗</span>
          </a>
        ))}
      </div>
    )
    case 'download':  return <a className="rb-dl" href={b.href} download>{b.label}</a>
    default: return null
  }
}

function AnimatedBlocks({ blocks }) {
  const [visible, setVisible] = useState(0)
  useEffect(() => {
    let i = 0
    function next() {
      if (i >= blocks.length) return
      i++; setVisible(i)
      const b = blocks[i - 1]
      const delay = b.type === 'heading' ? 160 : b.type === 'text' ? Math.min((b.text?.length || 0) * 1.2, 500) : b.type === 'skills' ? 280 : 190
      setTimeout(next, delay + 60)
    }
    next()
  }, [blocks])
  return <>{blocks.slice(0, visible).map((b, i) => <div key={i} className="rb-block-anim"><Block b={b} /></div>)}</>
}

const CHIPS = [
  { q:'tell me about yourself',   label:'👤 About Me' },
  { q:'show my skills',           label:'⚡ Skills' },
  { q:'show projects',            label:'🔒 Projects' },
  { q:'view certifications',      label:'🏅 Certifications' },
  { q:'internship experience',    label:'💼 Internships' },
  { q:'how to contact you',       label:'📬 Contact' },
]

export default function AIChatBar() {
  const [inputVal, setInputVal]   = useState('')
  const [response, setResponse]   = useState(null)   // { query, intent }
  const respRef = useRef(null)

  function handle(q) {
    if (!q.trim()) return
    setResponse({ query: q, intent: matchIntent(q) })
    setInputVal('')
    setTimeout(() => respRef.current?.scrollIntoView({ behavior:'smooth', block:'nearest' }), 80)
  }

  return (
    <div className="cmd-bar-wrap">
      <div className="cmd-label"><span className="cmd-label-dot" />ASK ANYTHING ABOUT MAKESH KUMAR</div>

      <div className="cmd-bar">
        <span className="cmd-prompt">&gt;_</span>
        <input
          type="text"
          className="cmd-input"
          placeholder='Try: "tell me about yourself"  or  "show skills"  or  "view projects"'
          autoComplete="off"
          spellCheck="false"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handle(inputVal) }}
        />
        <button className="cmd-send" onClick={() => handle(inputVal)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>

      <div className="cmd-chips">
        {CHIPS.map(({ q, label }) => (
          <button key={q} className="chip" onClick={() => handle(q)}>{label}</button>
        ))}
      </div>

      {response && (
        <div className="cmd-response" ref={respRef}>
          <div className="cmd-resp-inner">
            <div className="resp-user">
              <div className="resp-user-icon">YOU</div>
              <div className="resp-user-text">{response.query}</div>
            </div>
            <div className="resp-sys">
              <div className="resp-sys-icon">🛡</div>
              <div className="resp-sys-body">
                {response.intent ? (
                  <AnimatedBlocks blocks={response.intent.blocks} />
                ) : (
                  <>
                    <div className="rb-heading">◌  Not sure about that</div>
                    <p className="rb-text">
                      Try: <span style={{ color:'var(--accent)' }}>"about me"</span>,{' '}
                      <span style={{ color:'var(--accent)' }}>"skills"</span>,{' '}
                      <span style={{ color:'var(--accent)' }}>"projects"</span>,{' '}
                      <span style={{ color:'var(--accent)' }}>"internship"</span>,{' '}
                      <span style={{ color:'var(--accent)' }}>"certifications"</span>, or{' '}
                      <span style={{ color:'var(--accent)' }}>"contact"</span>.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
