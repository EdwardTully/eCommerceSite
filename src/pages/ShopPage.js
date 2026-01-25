import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/productsSlice';
import ProductGrid from '../components/Products/ProductGrid';
import FilterBar from '../components/Products/FilterBar';
import './ShopPage.css';

const ShopPage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.products);

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

  return (
    <div className="shop-page">
      <div className="shop-header">
        <h1>Browse Our Collection</h1>
        <p>Discover unique antiques and vintage treasures</p>
      </div>
      
      <FilterBar />
      
      {loading ? (
        <div className="loading-spinner">Loading products...</div>
      ) : (
        <ProductGrid />
      )}
    </div>
  );
};

export default ShopPage;
