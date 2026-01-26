import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategory, setSearchQuery, clearFilters } from '../../store/slices/productsSlice';
import './FilterBar.css';

const FilterBar = () => {
  const dispatch = useDispatch();
  const { categories, selectedCategory, searchQuery, filteredItems, items } = useSelector((state) => state.products);

  const handleCategoryChange = (e) => {
    dispatch(setSelectedCategory(e.target.value));
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <div className="filter-bar">
      <div className="filter-controls">
        <div className="category-filter">
          <label htmlFor="category-select">Category:</label>
          <select 
            id="category-select"
            value={selectedCategory} 
            onChange={handleCategoryChange}
            className="category-select"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {(selectedCategory !== 'all' || searchQuery) && (
          <button onClick={handleClearFilters} className="clear-filters-btn">
            Clear Filters
          </button>
        )}
      </div>

      <div className="results-count">
        Showing {filteredItems.length} of {items.length} products
      </div>
    </div>
  );
};

export default FilterBar;
