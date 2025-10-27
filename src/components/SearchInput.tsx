// src/components/SearchInput.tsx

import React from 'react';
import './SearchInput.css'; // We'll add styles next

// Define the props it will receive
interface SearchInputProps {
  // We'll add props later, like onChange
}

const SearchInput: React.FC<SearchInputProps> = () => {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search for a GitHub repository..."
      />
    </div>
  );
};

export default SearchInput;