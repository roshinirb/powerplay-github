// src/types.ts

// Common type used across the app to describe a GitHub repository.
// Keeps the data consistent between API responses, state, and props.
export interface Repository {
  id: number; // unique repo ID
  name: string; // repo name
  description: string | null; // can be null if missing
  stargazers_count: number; // star count
  language: string | null; // primary language (can be null)
  owner: {
    avatar_url: string; // repo owner's avatar image
  };
  html_url: string; // GitHub repo link
}
