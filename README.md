**Moderen Portfolio**

- **Description:**: A personal modern portfolio built with Vite + React. Includes interactive components (AI chat bar, particle canvas, mini terminal) and a small server for optional backend tasks.

**Features**
- **Single-page React app:**: Sections for Home, About, Projects, Skills, Resume, Certifications, Contact.
- **Interactive UI:**: `ParticleCanvas`, `MiniTerminal`, `CursorGlow`, `AIChatBar` components.
- **Local server:**: `server/index.js` and `server/test-smtp.js` for optional backend or testing.

**Tech Stack**
- **Frontend:**: React, Vite
- **Backend:**: Node.js (lightweight server in `server/`)

**Getting Started**
- **Prerequisites:**: Node.js >= 16 and npm.
- **Install:**

```
npm install
```

- **Run (development):**

```
npm run dev
```

- **Build for production:**

```
npm run build
npm run preview
```

- **Run server (optional):**

```
node server/index.js
```

**Project Structure**
- **Root:**: `index.html`, `package.json`, `vite.config.js`
- **src/**: React entry (`main.jsx`, `App.jsx`), components, styles, and `sections/` (About, Projects, etc.)
- **server/**: Simple Node server and `test-smtp.js` for email testing
- **terminal/**: `engine.js` — terminal engine used by `MiniTerminal` component

**Scripts**
- **dev:**: run the Vite dev server (`npm run dev`)
- **build:**: produce a production build (`npm run build`)
- **preview:**: locally preview the production build (`npm run preview`)

**Development Notes**
- **Components:**: See `src/components/` and `src/components/sections/` for UI pieces and page sections.
- **Styling:**: Global styles in `src/styles/index.css`.
- **Terminal engine:**: `terminal/engine.js` provides the logic used by the `MiniTerminal` component.

**Contributing**
- **Start a branch:**: Create a feature branch, keep commits focused and open a PR for review.

**License**
- **Suggested:**: MIT — add a `LICENSE` file if you want to open-source this project.

**Contact**
- **Author:**: Add your name and contact details here or in the `Contact` section of the site.

---

Created for the local project "Moderen Portfolio" — edit this file to add personal details, deployment steps, or CI instructions.
