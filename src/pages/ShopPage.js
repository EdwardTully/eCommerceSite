import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/productsSlice';
import CategorySection from '../components/Products/CategorySection';
import FilterBar from '../components/Products/FilterBar';
import './ShopPage.css';

const ShopPage = () => {
  const dispatch = useDispatch();
  const { loading, error, filteredItems } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (error) {
    return (
      <div className="shop-page">
        <div className="error-message">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={() => dispatch(fetchProducts())}>Try Again</button>
        </div>
      </div>
    );
  }

  // Group products by category from filteredItems only
  const groupedByCategory = {};
  filteredItems.forEach((product) => {
    if (!groupedByCategory[product.category]) {
      groupedByCategory[product.category] = [];
    }
    groupedByCategory[product.category].push(product);
  });

  return (
    <div className="shop-page">
      <div className="shop-header">
        <h1>Browse Our Collection</h1>
        <p>Discover unique antiques and vintage treasures</p>
      </div>
      
      <FilterBar />
      
      {loading ? (
        <div className="loading-spinner">Loading products...</div>
      ) : filteredItems.length === 0 ? (
        <div className="shop-container">
          <div className="no-products">
            <h2>No products found</h2>
            <p>Try adjusting your filters</p>
          </div>
        </div>
      ) : (
        <div className="shop-container">
          {Object.entries(groupedByCategory).map(([category, products]) => (
            <CategorySection 
              key={category} 
              category={category} 
              products={products}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopPage;
