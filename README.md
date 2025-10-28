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
  - **ON:** Shows all bookmarked repositories. When the toggle is ON and the user types in the search bar,
    the app filters and displays only those bookmarked repositories that match the search term — enhancing UX.

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

---

## 🖥️ Local Setup

The app will be available at **http://localhost:5173**.

---

## 📜 Available Scripts

| Command | Description |
|----------|-------------|
| `npm run dev` | Starts the development server |
| `npm run build` | Creates a production-ready build of the app |
| `npm run lint` | Lints all `.ts` and `.tsx` files for errors and warnings |

---

## 🧠 My Write-Up: Decisions, Trade-offs, and Next Steps

Here’s a quick overview of my design approach and technical reasoning behind key implementation choices.

---

###  1. Key Decisions

**State Management (React Hooks vs. External Library)**  
I decided to use only **React’s built-in hooks** — `useState`, `useEffect`, `useCallback`, and `useMemo` — for state management.  
For an app of this scope, this keeps the code **lightweight, clean, and performant** without needing Redux or Zustand.

---

**Architecture ("Smart Container, Dumb Components")**  
- `App.tsx` is the single **smart container**, responsible for all logic: fetching, filtering, bookmarking, etc.  
- Components like `ProjectItem`, `SearchInput`, and `FilterToggle` are **presentational only** — they render UI and emit events upward.  
- This pattern improves maintainability, reusability, and debugging clarity.

---

**Bookmark Storage (Full Object vs. ID)**  
I intentionally stored the **entire repository object** in `localStorage` instead of just the repo ID.

- **Trade-off:** Slightly more localStorage space.  
- **Benefit:** Instant rendering of bookmarked repositories without re-fetching data from the API.  
  This also enables the **“search within bookmarks”** feature for a smoother UX.  
- Added an initialization check to **validate and clean up stale or corrupted data** from localStorage for better stability.

---

###  2. Trade-offs

**No Pagination:**  
The app fetches only the first 30 results, as specified in the requirements.  
While this limits browsing depth, it keeps the UX focused and the API usage minimal.

**CSS-in-JS vs. Plain CSS:**  
I used **plain `.css` files** for each component — simple, zero runtime overhead, and easy to manage.  
The trade-off is that styles aren’t automatically scoped, but this is acceptable for a small-scale project and keeps dependencies clean.

---



