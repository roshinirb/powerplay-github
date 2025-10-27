// src/App.tsx

// 1. UPDATE THE IMPORT
import ProjectItem, { type Repository } from './components/ProjectItem';
import SearchInput from './components/SearchInput';
import './App.css'; 

// This is our fake data for testing the UI
const FAKE_REPO: Repository = {
  id: 12345,
  name: 'react',
  description:
    'A declarative, efficient, and flexible JavaScript library for building user interfaces. This is a longer description to test clamping.',
  stargazers_count: 215000,
  language: 'TypeScript',
  owner: {
    avatar_url: 'https://avatars.githubusercontent.com/u/69631?v=4',
  },
};

function App() {
  return (
    <div className="container">
      <h1>GitHub Repo Search</h1>
      {/* 1. ADD THE SEARCH INPUT HERE */}
      <SearchInput />
      <div className="project-list-container"> {/* Renamed class */}
        {/* 2. UPDATE THE COMPONENT NAME */}
        <ProjectItem repo={FAKE_REPO} />
        <ProjectItem repo={FAKE_REPO} /> 
      </div>
    </div>
  );
}

export default App;