import React, { useState } from 'react';
import '../styles/SearchBar.css';

interface SearchBarProps {
  onSearch: (term: string, type: 'all' | 'bus' | 'train') => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'bus' | 'train'>('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm, filterType);
  };

  return (
    <div className="search-container">
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          className="search-input"
          placeholder="Search by route number, station name, or line..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="filter-select"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as 'all' | 'bus' | 'train')}
        >
          <option value="all">All Transport</option>
          <option value="bus">Buses Only</option>
          <option value="train">Trains Only</option>
        </select>
        <button type="submit" className="search-btn">Search</button>
      </form>
    </div>
  );
};
