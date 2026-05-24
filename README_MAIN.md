# Modern Portfolio - Full Stack Application

A modern, interactive full-stack portfolio website built with React and Node.js, deployed on Vercel.

## 📋 Project Overview

This project contains:
- **Frontend:** React + Vite single-page app with interactive UI components
- **Backend:** Node.js serverless functions for contact form and email delivery

The entire application is deployed to Vercel as a single project with both frontend and backend.

## 🎯 Features

- **Interactive React Components:** ParticleCanvas, CursorGlow, MiniTerminal, AIChatBar
- **Responsive Design:** Mobile-friendly portfolio sections
- **Contact Form:** Integrated with SMTP email delivery
- **Serverless Backend:** Runs on Vercel without a separate server
- **Environment-based Configuration:** Separate configs for frontend and backend

## 📁 Project Structure

```
Modern Portfolio/
├── frontend/                 # React Vite application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── sections/        # Page sections (Home, About, Projects, etc.)
│   │   ├── styles/          # Global CSS
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── .env                 # Frontend env vars (local dev)
│   └── .env.example         # Frontend env template
│
├── backend/                  # Node.js serverless backend
│   ├── api/                 # Vercel serverless functions
│   │   ├── contact.js       # POST /api/contact
│   │   └── health.js        # GET /api/health
│   ├── package.json
│   ├── .env                 # Backend env vars (local dev)
│   └── .env.example         # Backend env template
│
├── vercel.json              # Vercel deployment config
├── README.md                # This file
├── DEPLOYMENT_STEPS.txt     # GitHub + Vercel deployment guide
└── VERCEL_SERVERLESS_DEPLOYMENT.txt  # Detailed serverless setup
```

## 🚀 Quick Start

### Prerequisites
- Node.js >= 16
- npm or yarn
- Git

### Local Development

1. **Clone and install dependencies**
```bash
cd frontend
npm install
cd ../backend
npm install
```

2. **Configure environment files**

Create `frontend/.env`:
```
VITE_BACKEND_URL=http://localhost:3001
```

Create `backend/.env`:
```
CONTACT_TO=your-email@example.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@example.com
SMTP_PASS=your-app-password
```

3. **Start backend server**
```bash
cd backend
npm start
```

4. **Start frontend dev server**
```bash
cd frontend
npm run dev
```

Frontend will be available at `http://localhost:5173`

## 📦 Build for Production

Frontend:
```bash
cd frontend
npm run build
npm run preview
```

## 🌐 Deployment to Vercel

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### Step 2: Deploy on Vercel
1. Go to https://vercel.com
2. Click "Add New" > "Project"
3. Select your portfolio repository
4. Vercel auto-detects the configuration
5. Click "Deploy"

### Step 3: Add Environment Variables
In Vercel project settings, add:
- `CONTACT_TO`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`

See `VERCEL_SERVERLESS_DEPLOYMENT.txt` for detailed instructions.

## 📝 API Endpoints

### POST /api/contact
Submit a contact form message.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your message here"
}
```

**Response:**
```json
{
  "success": true,
  "emailed": true,
  "message": "Message sent successfully."
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "ok": true,
  "smtp": true
}
```

## 🔐 Environment Variables

### Frontend (frontend/.env)
- `VITE_BACKEND_URL` — Backend URL (empty for /api endpoints)

### Backend (backend/.env)
- `CONTACT_TO` — Email recipient for contact form
- `SMTP_HOST` — SMTP server (default: smtp.gmail.com)
- `SMTP_PORT` — SMTP port (default: 587)
- `SMTP_SECURE` — Use TLS (default: false)
- `SMTP_USER` — SMTP username/email
- `SMTP_PASS` — SMTP password or app password

> **⚠️ Never commit .env files to GitHub**

## 📚 Documentation

- `DEPLOYMENT_STEPS.txt` — Step-by-step GitHub + Vercel deployment guide
- `VERCEL_SERVERLESS_DEPLOYMENT.txt` — Detailed serverless backend setup
- `frontend/README.md` — Frontend-specific instructions
- `backend/README.md` — Backend-specific instructions

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Vite
- CSS3

**Backend:**
- Node.js
- Express (development only)
- Nodemailer (email)
- CORS

**Deployment:**
- Vercel (serverless functions)
- GitHub (version control)

## 📧 Email Configuration

This project uses Gmail SMTP for sending emails. To set up:

1. Enable 2-Step Verification on your Google Account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the 16-character password as `SMTP_PASS` in your .env file

## 🐛 Troubleshooting

**Contact form not sending?**
- Check Vercel deployment logs
- Verify environment variables in Vercel settings
- Confirm SMTP credentials are correct

**SMTP authentication failed?**
- Use Gmail App Password, not your regular password
- Ensure 2-Step Verification is enabled
- Check that `SMTP_USER` and `SMTP_PASS` are correct

**API not found?**
- Ensure `backend/api/` folder exists
- Check `vercel.json` configuration
- Redeploy to Vercel

## 📄 License

MIT License - Feel free to use this project as a template for your own portfolio.

## 👤 Author

Makesh Kumar S

- Email: makeshmk2004@gmail.com
- LinkedIn: https://www.linkedin.com/in/makeshkumar24/
- GitHub: https://github.com/MakeshKumar2410

---

**Last Updated:** May 2026
