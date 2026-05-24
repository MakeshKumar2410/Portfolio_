# Backend - Node.js Serverless API

This is the backend of the Modern Portfolio application, providing serverless API functions for email delivery via Vercel.

## 📋 Overview

A lightweight Node.js backend providing:
- Contact form API endpoint with email delivery
- SMTP integration with Gmail
- Health check endpoint
- Serverless functions for Vercel deployment

## 🎯 Features

- **Serverless Architecture:** Runs as Vercel serverless functions
- **Email Delivery:** SMTP integration with nodemailer
- **CORS Support:** Allows requests from frontend
- **Input Validation:** Email validation and sanitization
- **Error Handling:** Comprehensive error responses

## 📁 Project Structure

```
backend/
├── api/                    # Vercel serverless functions
│   ├── contact.js         # POST /api/contact endpoint
│   └── health.js          # GET /api/health endpoint
├── server/                # Old Express server (optional, for local dev)
│   ├── index.js
│   └── test-smtp.js
├── package.json
├── .env                   # Environment variables
├── .env.example           # Environment template
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js >= 16
- npm
- Gmail account with 2-Step Verification enabled (for SMTP)

### Installation

```bash
cd backend
npm install
```

### Environment Setup

Create a `.env` file in the `backend/` folder:

```
CONTACT_TO=your-email@example.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@example.com
SMTP_PASS=your-16-char-app-password
```

Copy from `.env.example` if needed:
```bash
cp .env.example .env
```

### Running Locally (Optional)

For local testing with the old Express server:

```bash
npm start
```

Server will run at `http://localhost:3001`

### Testing Serverless Functions Locally

Install Vercel CLI (optional):

```bash
npm install -g vercel
vercel dev
```

Access at `http://localhost:3000`

## 📦 Dependencies

### Production
- **nodemailer** ^6.9.16 - Email delivery
- **cors** ^2.8.5 - Cross-origin requests
- **dotenv** ^16.4.7 - Environment variable loading
- **express** ^4.21.2 - Web framework (for development only)

### Deployment
Uses Vercel's built-in Node.js runtime. No additional dependencies needed for serverless.

## 🔗 API Endpoints

### POST /api/contact

Submit a contact form message with email delivery.

**Request:**
```bash
curl -X POST https://your-deployment.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello, this is a test message"
  }'
```

**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required, valid email)",
  "message": "string (required, max 5000 chars)"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "emailed": true,
  "message": "Message sent successfully. Check your inbox (and spam folder)."
}
```

**Error Responses:**

400 - Missing fields:
```json
{
  "success": false,
  "message": "Please fill in all fields."
}
```

400 - Invalid email:
```json
{
  "success": false,
  "message": "Please enter a valid email address."
}
```

400 - Message too long:
```json
{
  "success": false,
  "message": "Message is too long (max 5000 characters)."
}
```

503 - SMTP not configured:
```json
{
  "success": false,
  "emailed": false,
  "message": "Email is not configured on the server."
}
```

500 - SMTP error:
```json
{
  "success": false,
  "emailed": false,
  "message": "Could not send email. Check SMTP settings."
}
```

### GET /api/health

Health check endpoint to verify API status and SMTP configuration.

**Response:**
```json
{
  "ok": true,
  "smtp": true
}
```

- `ok` - API is running
- `smtp` - SMTP credentials are configured

## ⚙️ Environment Variables

### Required
- **CONTACT_TO** - Email address to receive contact form submissions
- **SMTP_USER** - Gmail address (your email)
- **SMTP_PASS** - Gmail App Password (16 characters)

### Optional
- **SMTP_HOST** - SMTP server (default: `smtp.gmail.com`)
- **SMTP_PORT** - SMTP port (default: `587`)
- **SMTP_SECURE** - Use TLS (default: `false` for port 587)

## 📧 Gmail SMTP Setup

### Step 1: Enable 2-Step Verification
1. Go to https://myaccount.google.com/security
2. Enable "2-Step Verification"

### Step 2: Generate App Password
1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer"
3. Generate a 16-character password
4. Copy it to `SMTP_PASS` in your `.env` file

### Step 3: Add to Environment Variables (Vercel)
In your Vercel project settings:
1. Go to Settings > Environment Variables
2. Add each variable from `.env`

## 🔒 Security

- **Input Validation:** All inputs are validated and sanitized
- **Email Validation:** Regex check for valid email format
- **Message Length:** Maximum 5000 characters
- **CORS:** Allows requests from any origin (can be restricted)
- **Environment Variables:** Sensitive data stored in .env, never committed to GitHub

## 📝 Email Format

Outgoing emails include:
- **From:** Your Gmail address
- **To:** CONTACT_TO address
- **Reply-To:** Sender's email (user can reply directly)
- **Subject:** "Portfolio contact from [Name]"
- **Body:** Name, Email, Message in HTML format

## 🧪 Testing

### Test Email Sending Locally

```bash
npm run test:email
```

This runs `backend/server/test-smtp.js` to verify SMTP configuration.

### Test API Endpoint

```bash
npm start
# In another terminal:
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
```

## 🚀 Deployment to Vercel

### Automatic Deployment

1. Push to GitHub
2. Connect repository to Vercel
3. Vercel detects `backend/api/` folder
4. Vercel deploys as serverless functions

### Manual Deployment

```bash
vercel deploy
```

### After Deployment

1. Add environment variables in Vercel project settings
2. Redeploy or update environment variables through dashboard
3. Test the `/api/contact` endpoint

## 📚 File Descriptions

### api/contact.js
Main contact form handler:
- Validates input (name, email, message)
- Creates SMTP transporter
- Sends email via nodemailer
- Returns success/error response

### api/health.js
Health check endpoint:
- Verifies API is running
- Checks if SMTP credentials are set
- Used for monitoring

### server/index.js (Deprecated for Vercel)
Old Express server for local development:
- Not needed for Vercel deployment
- Can be deleted after migration
- Kept for reference

### server/test-smtp.js (Optional)
SMTP testing utility:
- Tests email connection
- Verifies credentials
- Useful for debugging

## 🐛 Troubleshooting

### SMTP Authentication Failed

**Error:** "Gmail rejected the login"

**Solution:**
1. Use an App Password, not your regular password
2. Ensure 2-Step Verification is enabled
3. Check that SMTP_USER and SMTP_PASS have no extra spaces
4. Verify in Vercel environment variables

### Email Not Sending

**Check:**
1. Vercel deployment logs (Deployments tab)
2. SMTP_USER and SMTP_PASS are correct
3. CONTACT_TO email is valid
4. Check Gmail spam folder

### API Not Found

**Check:**
1. Vercel deployment was successful
2. `backend/api/` folder exists with correct files
3. `vercel.json` is in the root directory
4. Redeploy if needed

### CORS Errors

The API includes CORS headers allowing requests from any origin. If needed, restrict:

Edit `api/contact.js` and change:
```javascript
res.setHeader('Access-Control-Allow-Origin', 'https://your-domain.com')
```

## 📖 Learn More

- [Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions)
- [Nodemailer Documentation](https://nodemailer.com/)
- [Gmail SMTP Setup](https://support.google.com/accounts/answer/185833)
- [Node.js Documentation](https://nodejs.org/docs/)

## 📄 License

MIT License

---

**Backend Version:** 1.0.0
**Type:** Vercel Serverless Functions
**Last Updated:** May 2026
