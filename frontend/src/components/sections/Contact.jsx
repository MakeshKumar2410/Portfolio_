import { useState } from 'react'

const TO_EMAIL = 'makeshmk2004@gmail.com'

const CONTACT_CARDS = [
  { icon:'📧', label:'Email',    value:TO_EMAIL,      href:`mailto:${TO_EMAIL}` },
  { icon:'💼', label:'LinkedIn', value:'Makesh Kumar S',               href:'https://www.linkedin.com/in/makeshkumar24/' },
  { icon:'🐙', label:'GitHub',   value:'MakeshKumar2410',              href:'https://github.com/MakeshKumar2410' },
]

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', message:'' })
  const [error, setError] = useState('')
  const [status, setStatus] = useState('idle')

  const mailtoHref = `mailto:${TO_EMAIL}?subject=${encodeURIComponent(
    `Portfolio Contact from ${form.name}`
  )}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please complete all fields before sending.')
      return
    }

    setError('')
    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Send failed')
      }

      setStatus('success')
      setForm({ name:'', email:'', message:'' })
    } catch (err) {
      setStatus('error')
      setError(err.message || 'Could not send your message. Make sure the server is running (npm run dev).')
    }
  }

  return (
    <section id="contact" className="section active">
      <div className="section-header">
        <div className="section-tag">// 06 — CONTACT</div>
        <h2 className="section-title">Get In Touch</h2>
      </div>

      <div className="contact-grid">
        <div className="contact-cards">
          {CONTACT_CARDS.map(({ icon, label, value, href }) => (
            <a key={label} className="contact-card glass-card" href={href} target="_blank" rel="noopener noreferrer">
              <div className="contact-icon">{icon}</div>
              <div className="contact-label">{label}</div>
              <div className="contact-value">{value}</div>
              <div className="contact-arrow">↗</div>
            </a>
          ))}
        </div>

        <form className="contact-form glass-card" onSubmit={handleSubmit}>
          <div className="form-head">
            <div className="form-title">Send a message</div>
            <div className="form-sub">I'll get back to you within 24 hours.</div>
          </div>

          <label className="form-field">
            <span>Name</span>
            <input
              type="text"
              name="name"
              placeholder="Your full name"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              required
            />
          </label>
          <label className="form-field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              required
            />
          </label>
          <label className="form-field">
            <span>Message</span>
            <textarea
              name="message"
              rows="6"
              placeholder="Tell me about your project or question"
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              required
            />
          </label>

          {status === 'success' && (
            <div className="form-success" role="status">
              Message sent successfully. I&apos;ll get back to you soon.
            </div>
          )}
          {error && <div className="form-error">{error}</div>}
          {status === 'error' && (
            <div className="form-fallback">
              <p>Or send directly from your email app:</p>
              <a className="btn-secondary contact-fallback" href={mailtoHref}>
                Send via Email App
              </a>
            </div>
          )}
          {status !== 'success' && (
            <button
              className="btn-primary contact-submit"
              type="submit"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </button>
          )}
        </form>
      </div>
    </section>
  )
}
