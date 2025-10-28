import React, { memo } from 'react';
import './SearchInput.css';

// Props for the search input component
interface SearchInputProps {
  value: string; // current input value
  onChange: (value: string) => void; // called when user types
}

// Simple, controlled search bar component
// Wrapped in React.memo to avoid re-rendering when props don’t change
const SearchInput: React.FC<SearchInputProps> = memo(({ value, onChange }) => {
  
  // Handle user input and send the value to parent (App)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="search-container">
      {/* search icon (purely visual, handled with CSS for positioning) */}
      <svg
        className="search-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="7.5" cy="7.5" r="5.5" />
        <line x1="11.5" y1="11.5" x2="15" y2="15" />
      </svg>

      {/* controlled input – state handled completely by parent */}
      <input
        type="text"
        className="search-input"
        placeholder="Search for a GitHub repository..."
        value={value}
        onChange={handleChange}
      />
    </div>
  );
});

export default SearchInput;

