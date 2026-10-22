```tsx
import React, { useState, useEffect, ChangeEvent, SelectChangeEvent } from 'react';
import './FilterBar.css';

interface FilterBarProps {
  /** Callback when the search term changes */
  onSearch: (term: string) => void;
  /** Callback when the filter selection changes */
  onFilterChange: (value: string) => void;
}

/**
 * FilterBar – provides a text search box and a dropdown to filter by source.
 * It is fully accessible and works with keyboard navigation.
 */
const FilterBar: React.FC<FilterBarProps> = ({ onSearch, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState<string>('all');

  const sources = ['All', 'Job Board', 'LinkedIn', 'News'];

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleFilterChange = (e: SelectChangeEvent<HTMLSelectElement>) => {
    setFilterValue(e.target.value);
    onFilterChange(e.target.value);
  };

  // Close the dropdown on outside click for better UX
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        filterValueRef.current &&
        !filterValueRef.current.contains(target) &&
        !searchInputRef.current.contains(target)
      ) {
        // optionally close dropdown – not required for this simple UI
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filterValueRef = React.useRef<HTMLSelectElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="filter-bar" aria-label="Opportunity filter">
      <input
        type="text"
        placeholder="Search opportunities..."
        value={searchTerm}
        onChange={handleSearchChange}
        aria-label="Search term"
        ref={searchInputRef}
        className="search-input"
      />

      <select
        value={filterValue}
        onChange={handleFilterChange}
        aria-label="Filter by source"
        className="filter-select"
      >
        {sources.map((src) => (
          <option key={src} value={src}>
            {src}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
```