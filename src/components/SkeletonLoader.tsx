import React from 'react';
import './SkeletonLoader.css';

// Simple loading placeholder card (skeleton loader)
// Shown while fetching data to make the UI feel smoother
const SkeletonLoader: React.FC = () => {
  return (
    // same layout as ProjectItem so the page doesn’t jump when data loads
    <div className="skeleton-card">
      <div className="skeleton-avatar"></div>
      <div className="skeleton-details">
        {/* fake title and description lines */}
        <div className="skeleton-line skeleton-title"></div>
        <div className="skeleton-line skeleton-desc"></div>
        <div className="skeleton-line skeleton-desc-2"></div>
      </div>
    </div>
  );
};

// no need for React.memo – no props or re-renders here
export default SkeletonLoader;
