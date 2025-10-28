Github Repository Finder (Powerplay FS Intern Assignment)

A tiny, production-ready React micro-app that lets a user search and bookmark GitHub repositories.

https://powerplay-github.vercel.app/

Features

This project meets all the core requirements of the problem statement, with a few thoughtful UX improvements:

Live GitHub Search: Search repositories with a 500ms debounced API call.

Polished Loading State: Uses a modern skeleton loader to "gracefully" handle loading.

Advanced Bookmark System:

Click the star icon to save/remove bookmarks.

Bookmarks are persisted in localStorage and validated on load.

Saves the full repository object for a better UX.

Advanced Filter Toggle:

Toggle OFF: Search all of GitHub.

Toggle ON: Instantly search within your saved bookmarks.

Click-to-Open: Repository titles are links that open the GitHub page in a new tab.

Robust Error Handling: Displays 5+ unique, graceful states (idle, loading, error, and multiple "empty" states).

High-Performance: Built with React.memo, useCallback, and useMemo to prevent all unnecessary re-renders.

Clean Tooling: Written in 100% TypeScript with zero npm run lint errors.

Getting Started

To run this project locally:

Clone the repository:

git clone [https://github.com/roshinirb/powerplay-github.git](https://github.com/roshinirb/powerplay-github.git)


Navigate to the project directory:

cd powerplay-github


Install dependencies:

npm install


Run the development server:

npm run dev


The app will be available at http://localhost:5173.

Available Scripts

npm run dev: Starts the development server.

npm run build: Creates a production-ready build of the app.

npm run lint: Lints all .ts and .tsx files for errors and warnings.

My "Write Up": Decisions, Trade-offs, and Next Steps

As requested, here is a brief walk-through of my key design decisions.

1. Key Decisions

State Management (React Hooks vs. External Library): I chose to use only built-in React hooks (useState, useCallback, useMemo, useEffect) for all state management. For an app of this scope, this is a "real-world" decision that avoids the unnecessary bundle size and complexity of external libraries like Redux or Zustand, while still providing a highly performant and maintainable architecture.

Architecture ("Smart Container, Dumb Components"): The App.tsx component is the single "smart" container that holds all state and logic (fetching, filtering, etc.). All other components (ProjectItem, SearchInput, FilterToggle) are "dumb" presentational components that just receive props and report events up. This makes the app easy to debug and reuse components.

Bookmark Storage (Full Object vs. ID): I made a conscious decision to store the entire Repository object in localStorage instead of just the id.

The Trade-off: This uses more localStorage space.

The Benefit (Why I did it): The UX improvement is massive. It allows the app to instantly display bookmarked items (in "Library Mode") without needing to re-fetch their data. This also enabled the advanced "search within bookmarks" feature. I also added a validation step on app load to filter out any corrupt or stale data from localStorage, making the app more robust.

2. Trade-offs

No Pagination: The app only fetches the first 30 results as specified. A trade-off of this simplicity is that a user can't browse for more results.

CSS-in-JS vs. Plain CSS: I used plain .css files for each component. This is simple, has zero overhead, and is easy to maintain for a project of this size. A trade-off is that the styles aren't "scoped" by default, but this is a non-issue here and keeps the dependencies clean.

3. Possible Next Steps

If I had more time, I would:

Implement Pagination: Use the GitHub API's page parameter to add a "Load More" button or infinite scroll.

Add Sorting: Add a dropdown to sort results by "Stars" (default) or "Last Updated."

Cloud Sync: Transition bookmarks from localStorage to a service like Firebase/Firestore to allow a user to sync their bookmarks across different devices.
