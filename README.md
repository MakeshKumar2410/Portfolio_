**Moderen Portfolio**

- **Description:** A personal modern portfolio built with Vite + React. The frontend lives in `frontend/` and the backend lives in `backend/`.
- **Backend:** handles contact form email delivery.
- **Frontend:** static React site with Home, About, Projects, Skills, Resume, Certifications, and Contact sections.

**Features**
- React + Vite frontend with interactive UI components.
- Node backend for contact form submission and SMTP email.
- Separate `frontend/.env` and `backend/.env` files for local development and deployment.

**Tech Stack**
- **Frontend:** React, Vite
- **Backend:** Node.js, Express, Nodemailer

**Getting Started**
- **Prerequisites:** Node.js >= 16 and npm.

- **Install dependencies**

```
cd frontend
npm install
cd ../backend
npm install
```

- **Configure environment variables**

Update or create:
- `frontend/.env`
- `backend/.env`

Sample files are available:
- `frontend/.env.example`
- `backend/.env.example`

- **Run locally**

Start the backend:

```
cd backend
npm start
```

Start the frontend:

```
cd frontend
npm run dev
```

- **Build the frontend**

```
cd frontend
npm run build
npm run preview
```

**Project Structure**
- `frontend/` — React frontend app and Vite config.
- `backend/` — Node backend app for email/contact API.
- `backend/server/index.js` — backend entry point for local development.
- `backend/test-smtp.js` — SMTP test utility.

**Environment variables**
- `frontend/.env`
  - `VITE_BACKEND_URL=http://localhost:3001`
- `backend/.env`
  - `PORT=3001`
  - `CONTACT_TO=your-email@example.com`
  - `SMTP_HOST=smtp.gmail.com`
  - `SMTP_PORT=587`
  - `SMTP_SECURE=false`
  - `SMTP_USER=your-smtp-user@example.com`
  - `SMTP_PASS=your-smtp-password`

**Deploying to Vercel**
1. Create a Vercel account and connect your repository.
2. Deploy the frontend from the `frontend/` folder.
   - Build command: `npm run build`
   - Output directory: `dist`
   - Add an environment variable: `VITE_BACKEND_URL=https://your-backend-url`
3. Deploy the backend separately if needed.
   - Because this backend uses Express, Vercel does not host it as a long-running Node server by default.
   - Use a Node-friendly host (Render, Railway, Heroku, etc.) or convert it into Vercel serverless functions.
   - Add backend environment variables in your backend host matching `backend/.env`.

**Vercel setup notes**
- Use `frontend/` as the frontend project root.
- In production, the frontend will call the backend URL defined in `VITE_BACKEND_URL`.
- If you host the backend elsewhere, set `VITE_BACKEND_URL` to that public URL.

**Recommended flow**
1. Deploy the backend first and copy the deployment URL.
2. Deploy the frontend and set `VITE_BACKEND_URL` to the backend URL.
3. Verify the contact form works against the deployed backend.

**Notes**
- The frontend uses `/api/contact` for local development and `VITE_BACKEND_URL` in production.
- Keep `.env` files private; `.gitignore` already excludes them.

---

Created for the local project "Moderen Portfolio" — edit this file to add personal details, deployment steps, or CI instructions.
