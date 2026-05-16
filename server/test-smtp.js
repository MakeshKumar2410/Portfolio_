import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const envPath = path.join(__dirname, '../.env')

dotenv.config({ path: envPath })

const user = process.env.SMTP_USER?.trim()
const pass = process.env.SMTP_PASS?.trim().replace(/\s/g, '')

console.log('Loading:', envPath)
console.log('SMTP_USER:', user || '(missing)')
console.log('SMTP_PASS length:', pass?.length ?? 0, pass?.includes('REPLACE') ? '(still placeholder!)' : '')

if (!user || !pass) {
  console.error('\nMissing SMTP_USER or SMTP_PASS in .env (not .env.example)')
  process.exit(1)
}

if (pass.includes('REPLACE') || pass.length < 16) {
  console.error('\nSMTP_PASS in .env is not a valid App Password.')
  console.error('Edit .env in the project ROOT folder and paste your 16-character Gmail App Password.')
  process.exit(1)
}

let port = Number(process.env.SMTP_PORT) || 587
let secure = process.env.SMTP_SECURE === 'true'
if (port === 587) secure = false
if (port === 465) secure = true

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port,
  secure,
  auth: { user, pass },
  tls: port === 587 ? { minVersion: 'TLSv1.2' } : undefined,
})

try {
  await transporter.verify()
  console.log('\nSMTP connection: OK')
  const info = await transporter.sendMail({
    from: `"Portfolio Test" <${user}>`,
    to: process.env.CONTACT_TO || user,
    subject: 'Portfolio SMTP test',
    text: 'If you received this, SMTP is working correctly.',
  })
  console.log('Test email sent:', info.messageId)
  console.log('Check inbox and Spam for:', process.env.CONTACT_TO || user)
} catch (err) {
  console.error('\nSMTP FAILED:', err.message)
  console.error('\nIf you put the password in .env.example only, copy it to .env instead.')
  console.error('Create a new App Password: https://myaccount.google.com/apppasswords')
  process.exit(1)
}
