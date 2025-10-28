# 🚀 Github Repository Finder (Powerplay Frontend Intern Assignment)

A tiny, production-ready **React + TypeScript** micro-app that lets users search and bookmark GitHub repositories.

🔗 **[Live Demo →](https://your-deployed-link.vercel.app)**  
*(Replace with your actual Vercel or Netlify link)*

---

## ✨ Features

This project fulfills all the assignment requirements — with extra polish and UX improvements:

- 🔍 **Live GitHub Search**  
  Debounced (500 ms) API calls to GitHub’s public `/search/repositories` endpoint.

- 💨 **Smooth Loading Experience**  
  Uses skeleton loader animation instead of basic “Loading…” text.

- ⭐ **Persistent Bookmarks**  
  - Save or remove repositories by toggling the star.  
  - Bookmarks are saved to **localStorage** and survive reloads.  
  - Stored as complete repo objects for instant rendering.

- 🔁 **Bookmark Filter Toggle**  
  - **OFF:** normal GitHub search mode.  
  - **ON:** shows only saved bookmarks.  
  - Works perfectly with the search bar.

- 🌐 **Clickable Repo Titles**  
  Open any repo on GitHub directly in a new tab.

- 🧱 **Error & Empty States**  
  Gracefully handles all cases — idle, loading, error, and no results.

- ⚡ **Optimized Performance**  
  Uses `React.memo`, `useCallback`, and `useMemo` to minimize re-renders.

- 🧹 **Clean Tooling**  
  100% TypeScript, ESLint + Prettier configured, **no lint warnings**.

---

## 🛠️ Getting Started

Run the project locally:

```bash
# 1. Clone the repo
git clone https://github.com/roshinirb/powerplay-github.git

# 2. Navigate into it
cd powerplay-github

# 3. Install dependencies
npm install

# 4. Start the app
npm run dev

