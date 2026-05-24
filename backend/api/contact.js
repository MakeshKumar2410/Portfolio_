import nodemailer from 'nodemailer'

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function createTransporter() {
  const user = process.env.SMTP_USER?.trim()
  const pass = process.env.SMTP_PASS?.trim().replace(/\s/g, '')
  if (!user || !pass) return null

  let port = Number(process.env.SMTP_PORT) || 587
  let secure = process.env.SMTP_SECURE === 'true'
  if (port === 587) secure = false
  if (port === 465) secure = true

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port,
    secure,
    auth: { user, pass },
    tls: port === 587 ? { minVersion: 'TLSv1.2' } : undefined,
  })
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }

  const name = String(req.body?.name || '').trim()
  const email = String(req.body?.email || '').trim()
  const message = String(req.body?.message || '').trim()

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Please fill in all fields.' })
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ success: false, message: 'Please enter a valid email address.' })
  }

  if (message.length > 5000) {
    return res.status(400).json({ success: false, message: 'Message is too long (max 5000 characters).' })
  }

  const transporter = createTransporter()
  const TO_EMAIL = process.env.CONTACT_TO || 'makeshmk2004@gmail.com'

  if (!transporter) {
    console.log('\n[contact] SMTP not configured — message logged locally:')
    console.log({ name, email, message })
    console.log('Add SMTP_USER and SMTP_PASS to Vercel environment variables.\n')
    return res.status(503).json({
      success: false,
      emailed: false,
      message: 'Email is not configured on the server.',
    })
  }

  try {
    const smtpUser = process.env.SMTP_USER.trim()
    const info = await transporter.sendMail({
      from: `"Portfolio Contact" <${smtpUser}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <h2>New portfolio message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <hr>
        <p>${message.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>')}</p>
      `,
    })

    console.log('[contact] email sent:', info.messageId, '→', TO_EMAIL)
    res.json({
      success: true,
      emailed: true,
      message: 'Message sent successfully. Check your inbox (and spam folder).',
    })
  } catch (err) {
    console.error('[contact] send failed:', err.message)
    if (err.response) console.error('[contact] SMTP response:', err.response)
    res.status(500).json({
      success: false,
      emailed: false,
      message:
        err.code === 'EAUTH'
          ? 'Gmail rejected the login. Use an App Password and check Vercel env vars.'
          : 'Could not send email. Check SMTP settings in Vercel environment variables.',
    })
  }
}
