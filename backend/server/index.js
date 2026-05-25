import express from 'express'
import cors from 'cors'
import fs from 'fs'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

dotenv.config({ path: path.join(__dirname, '../.env') })
const app = express()
const PORT = process.env.PORT || 3001
const TO_EMAIL = process.env.CONTACT_TO || 'makeshmk2004@gmail.com'

app.use(cors({ origin: true }))
app.use(express.json({ limit: '32kb' }))

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function createTransporter() {
  const user = process.env.SMTP_USER?.trim()
  const pass = process.env.SMTP_PASS?.trim().replace(/\s/g, '')
  if (!user || !pass) return null

  // Gmail: port 465 = SSL (secure true) · port 587 = STARTTLS (secure false)
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

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    message: 'Server is working',
    smtp: Boolean(process.env.SMTP_USER && process.env.SMTP_PASS),
  })
})

app.get('/', (_req, res) => {
  res.send('Portfolio backend is running. Use /api/health to verify the API status.');
})

app.post('/api/contact', async (req, res) => {
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

  if (!transporter) {
    console.log('\n[contact] SMTP not configured — message logged locally:')
    console.log({ name, email, message })
    console.log('Add SMTP_USER and SMTP_PASS to .env and restart npm run dev.\n')
    return res.status(503).json({
      success: false,
      emailed: false,
      message: 'Email is not configured on the server. Add SMTP settings to .env and restart npm run dev.',
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
          ? 'Gmail rejected the login. Use an App Password in .env (not your normal password) and restart the server.'
          : 'Could not send email. Check SMTP settings in .env and restart npm run dev.',
    })
  }
})

if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../../frontend/dist')
  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath))
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api')) return next()
      res.sendFile(path.join(distPath, 'index.html'))
    })
  } else {
    console.log(`Production dist folder not found at ${distPath}; skipping static frontend serve.`)
  }
}

app.listen(PORT, async () => {
  const smtpReady = Boolean(process.env.SMTP_USER?.trim() && process.env.SMTP_PASS?.trim())
  console.log(`API server running at http://localhost:${PORT}`)
  console.log('Server is working and ready to receive requests.')

  if (!smtpReady) {
    console.log('SMTP NOT configured — add SMTP_USER and SMTP_PASS to .env')
    return
  }

  const port = Number(process.env.SMTP_PORT) || 587
  if (process.env.SMTP_SECURE === 'true' && port === 587) {
    console.warn('Warning: SMTP_SECURE=true with port 587 is invalid for Gmail. Use port 465 + secure true, OR port 587 + secure false.')
  }

  const transporter = createTransporter()
  try {
    await transporter.verify()
    console.log(`SMTP verified OK → emails will go to ${TO_EMAIL}`)
  } catch (err) {
    console.error('\n*** SMTP LOGIN FAILED ***')
    console.error(err.message)
    console.error('Gmail rejected your App Password. Steps:')
    console.error('  1. Enable 2-Step Verification on your Google account')
    console.error('  2. Create a NEW App Password: https://myaccount.google.com/apppasswords')
    console.error('  3. Put the 16-character password in .env as SMTP_PASS (no spaces)')
    console.error('  4. Restart: npm run dev')
    console.error('  5. Test: npm run test:email\n')
  }
})
