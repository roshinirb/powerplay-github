import React from 'react';
import './ProjectItem.css';
import { type Repository } from '../types';

// Props for a single repository card
interface ProjectItemProps {
  repo: Repository; // full repository data
  isBookmarked: boolean; // true if repo is bookmarked
  onToggleBookmark: (repo: Repository) => void; // called when user clicks bookmark
}

// Displays one repository card (title, description, stars, language, and bookmark button)
// Wrapped in React.memo so it only re-renders when props change
const ProjectItem: React.FC<ProjectItemProps> = React.memo(
  ({ repo, isBookmarked, onToggleBookmark }) => {
    
    // Handle bookmark toggle click
    const handleBookmarkClick = () => {
      onToggleBookmark(repo);
    };

    return (
      // Add 'bookmarked' class for styling when the repo is saved
      <div className={`project-item-card ${isBookmarked ? 'bookmarked' : ''}`}>
        
        {/* Defensive check with optional chaining in case repo data is missing */}
        <img
          src={repo?.owner?.avatar_url}
          alt={`${repo?.name} avatar`}
          className="project-item-avatar"
        />

        <div className="project-item-details">
          {/* Repository name linking to GitHub */}
          <h3 className="project-item-title">
            <a
              href={repo?.html_url}
              target="_blank" // open in new tab
              rel="noopener noreferrer" // security best practice
            >
              {repo?.name}
            </a>
          </h3>

          {/* Show description if available */}
          <p className="project-item-description">
            {repo?.description || 'No description available.'}
          </p> 
          
          <div className="project-item-meta">
            {/* Show star count (formatted with commas) */}
            <span className="project-item-stars">
              ⭐ {repo?.stargazers_count?.toLocaleString()}
            </span>

            {/* Show language only if it exists */}
            {repo?.language && (
              <span className="project-item-language">{repo.language}</span>
            )}
          </div>
        </div>

        {/* Bookmark toggle button */}
        <button
          className="project-item-bookmark-btn"
          onClick={handleBookmarkClick}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          {isBookmarked ? (
            // Filled star (active state)
            <svg
              viewBox="0 0 16 16"
              version="1.1"
              width="16"
              height="16"
              fill="#58a6ff"
            >
              <path
                d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.192L.86A.75.75 0 0 1 1.276 5.1l4.21-.612L7.327.668A.75.75 0 0 1 8 .25Z"
              ></path>
            </svg>
          ) : (
            // Empty star (inactive state)
            <svg
              viewBox="0 0 16 16"
              version="1.1"
              width="16"
              height="16"
              fill="#8b949e"
            >
              <path
                d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.192L.86A.75.75 0 0 1 1.276 5.1l4.21-.612L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.506l-2.852.415 2.064 2.01-.488 2.84L8 9.397l2.56 1.346-.488-2.84 2.064-2.01-2.852-.415L8 2.695Z"
              ></path>
            </svg>
          )}
        </button>
      </div>
    );
  }
);

export default ProjectItem;
