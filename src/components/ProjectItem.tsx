// src/components/ProjectItem.tsx

import React from 'react';
// 1. IMPORT THE CSS FILE
import './ProjectItem.css'; 

// This interface defines the 'shape' of a repo's data
export interface Repository {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  language: string;
  owner: {
    avatar_url: string;
  };
}

// This defines the props our component expects
interface ProjectItemProps {
  repo: Repository;
}

// 2. RENAME THE COMPONENT
// We use React.memo as required to prevent re-renders
const ProjectItem: React.FC<ProjectItemProps> = React.memo(({ repo }) => {
  return (
    <div className="project-item-card"> {/* Renamed class for clarity */}
      <img
        src={repo.owner.avatar_url}
        alt={`${repo.name} avatar`}
        className="project-item-avatar"
      />
      <div className="project-item-details">
        <h3 className="project-item-title">{repo.name}</h3>
        <p className="project-item-description">{repo.description}</p>
        <div className="project-item-meta">
          <span className="project-item-stars">
            ⭐ {repo.stargazers_count.toLocaleString()}
          </span>
          <span className="project-item-language">{repo.language}</span>
        </div>
      </div>
      <button className="project-item-bookmark-btn">Bookmark</button>
    </div>
  );
});

// 3. RENAME THE EXPORT
export default ProjectItem;