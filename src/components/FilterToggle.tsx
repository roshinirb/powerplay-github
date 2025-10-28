import React, { memo } from 'react';
import './FilterToggle.css';

// Props for the bookmark filter toggle
interface FilterToggleProps {
  showBookmarked: boolean; // current toggle state
  onToggle: (showBookmarked: boolean) => void; // called when user changes toggle
}

// Simple controlled toggle component for "Show Bookmarked Only".
// Wrapped in React.memo to avoid unnecessary re-renders.
const FilterToggle: React.FC<FilterToggleProps> = memo(({ showBookmarked, onToggle }) => {
  
  // Pass updated toggle value back to parent component
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onToggle(e.target.checked);
  };

  return (
    // The label wraps both checkbox and slider so the entire area is clickable
    <label className="filter-toggle">
      {/* Hidden checkbox – real state holder, styled with CSS */}
      <input
        type="checkbox"
        checked={showBookmarked}
        onChange={handleChange}
      />

      {/* The visible slider and label text */}
      <span className="slider"></span>
      <span className="label-text">Show Bookmarked Only</span>
    </label>
  );
});

export default FilterToggle;
