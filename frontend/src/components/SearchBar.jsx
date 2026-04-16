import React from 'react';
import { Search, X } from 'lucide-react';
import '../styles/SearchBar.css';

const SearchBar = ({ value, onChange, onClear, isLoading = false }) => {
  return (
    <div className="search-container">
      <div className="search-wrapper">
        <Search size={20} className="search-icon" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="search-input"
          disabled={isLoading}
        />
        {value && (
          <button
            className="search-clear"
            onClick={onClear}
            title="Clear search"
            disabled={isLoading}
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
