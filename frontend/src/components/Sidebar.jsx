const NAV_ITEMS = [
  { id: 'home',           icon: '⌂', label: 'Home' },
  { id: 'about',          icon: '◈', label: 'About' },
  { id: 'skills',         icon: '◎', label: 'Skills' },
  { id: 'projects',       icon: '◈', label: 'Projects' },
  { id: 'certifications', icon: '◉', label: 'Certs' },
  { id: 'contact',        icon: '◌', label: 'Contact' },
]

export default function Sidebar({ activeSection, isOpen, onNavigate }) {
  return (
    <aside className={`sidebar${isOpen ? ' open' : ''}`} id="sidebar">
      <div className="sidebar-logo">
        <span className="logo-bracket">[</span>
        <span className="logo-text">MKS</span>
        <span className="logo-bracket">]</span>
        <div className="logo-sub">SEC_OPS</div>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map(({ id, icon, label }) => (
          <a
            key={id}
            className={`nav-item${activeSection === id ? ' active' : ''}`}
            onClick={(e) => { e.preventDefault(); onNavigate(id) }}
            href="#"
          >
            <span className="nav-icon">{icon}</span>
            <span className="nav-label">{label}</span>
            <span className="nav-line" />
          </a>
        ))}
      </nav>

      <div className="sidebar-status">
        <div className="status-dot" />
        <span>SYSTEM ONLINE</span>
      </div>
    </aside>
  )
}
