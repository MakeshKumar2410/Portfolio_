# Frontend - React Vite Portfolio App

This is the frontend of the Modern Portfolio application, built with React and Vite.

## 📋 Overview

A responsive, interactive single-page application featuring:
- Multiple portfolio sections (Home, About, Projects, Skills, Resume, Certifications, Contact)
- Interactive UI components (ParticleCanvas, CursorGlow, MiniTerminal, AIChatBar)
- Contact form with email submission
- Modern, clean design with CSS styling

## 🎯 Features

- **Fast Development:** Hot module replacement (HMR) with Vite
- **React 18:** Latest React features and hooks
- **Responsive Design:** Mobile-friendly layout
- **Contact Integration:** Form submission to backend API
- **Interactive Components:** Canvas animations, glowing cursor, terminal emulator

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── AIChatBar.jsx       # AI chat skills display
│   │   ├── CursorGlow.jsx      # Glowing cursor effect
│   │   ├── MiniTerminal.jsx    # Interactive terminal
│   │   ├── ParticleCanvas.jsx  # Animated particles
│   │   ├── Sidebar.jsx         # Navigation sidebar
│   │   └── sections/
│   │       ├── About.jsx       # About me section
│   │       ├── Certifications.jsx
│   │       ├── Contact.jsx     # Contact form
│   │       ├── Home.jsx        # Landing page
│   │       ├── Projects.jsx    # Portfolio projects
│   │       ├── Resume.jsx
│   │       └── Skills.jsx      # Skills display
│   ├── styles/
│   │   └── index.css           # Global styles
│   ├── terminal/
│   │   └── engine.js           # Terminal engine logic
│   ├── App.jsx                 # Main app component
│   └── main.jsx                # Entry point
├── index.html
├── package.json
├── vite.config.js
├── .env                        # Local environment variables
├── .env.example                # Environment template
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js >= 16
- npm or yarn

### Installation

```bash
cd frontend
npm install
```

### Local Development

```bash
npm run dev
```

The app will start at `http://localhost:5173` with hot reload enabled.

### Build for Production

```bash
npm run build
```

Output is generated in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

Locally preview the production build before deploying.

## ⚙️ Environment Variables

Create a `.env` file in the `frontend/` folder:

```
# Backend URL - leave empty for /api endpoints (Vercel)
# For local dev with separate backend: http://localhost:3001
VITE_BACKEND_URL=
```

Copy from `.env.example` if needed:
```bash
cp .env.example .env
```

## 📦 Dependencies

### Production
- **react** - UI library
- **react-dom** - React DOM rendering

### Development
- **@vitejs/plugin-react** - React fast refresh plugin
- **vite** - Build tool and dev server
- **concurrently** - Run multiple commands
- **cross-env** - Cross-platform env variables

## 🔗 API Integration

### Contact Form Endpoint

The contact form sends to `/api/contact`:

**Request:**
```javascript
fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Your message'
  })
})
```

**Response:**
```json
{
  "success": true,
  "emailed": true,
  "message": "Message sent successfully."
}
```

### Backend URL Configuration

In **local development:**
- Uses Vite proxy to `http://localhost:3001`
- Defined in `vite.config.js`

In **production (Vercel):**
- Uses relative `/api/contact` endpoint
- Or uses `VITE_BACKEND_URL` if set

## 📝 Vite Configuration

The `vite.config.js` includes:
- React plugin for JSX support
- Proxy configuration for local backend at `http://localhost:3001`
- Dev server setup

## 🎨 Styling

Global styles are in `src/styles/index.css`. Component styles can be:
- Inline styles in JSX
- CSS modules
- CSS Scoped styles

## 🔄 Component Communication

Components use React hooks:
- `useState` - Local state management
- `useEffect` - Side effects and lifecycle

For complex state, consider adding Context API or a state management library.

## 📱 Responsive Design

The portfolio is responsive and works on:
- Desktop (1920px+)
- Tablet (768px - 1920px)
- Mobile (320px - 768px)

## 🧪 Testing (Optional)

No testing framework is currently installed. To add:

```bash
npm install --save-dev vitest @testing-library/react
```

## 📚 Useful Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run server` | Run backend server (from root) |
| `npm run test:email` | Test SMTP email (from root) |

## 🌐 Deployment to Vercel

1. Push to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Vercel auto-detects Vite configuration
5. Set `VITE_BACKEND_URL` environment variable (if needed)
6. Click Deploy

See root `VERCEL_SERVERLESS_DEPLOYMENT.txt` for detailed steps.

## 🐛 Troubleshooting

**HMR not working?**
- Clear browser cache
- Restart dev server
- Check firewall settings

**Build fails?**
- Delete `node_modules/` and `package-lock.json`
- Run `npm install` again
- Check for syntax errors

**API calls failing?**
- Ensure backend server is running (for local dev)
- Check `VITE_BACKEND_URL` environment variable
- Verify CORS headers from backend

## 📖 Learn More

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Vercel Deployment Guide](https://vercel.com/docs)

## 📄 License

MIT License

---

**Frontend Version:** 1.0.0
**Last Updated:** May 2026
