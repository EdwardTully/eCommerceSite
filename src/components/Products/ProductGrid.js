import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import './ProductGrid.css';

const ProductGrid = () => {
  const { filteredItems, loading } = useSelector((state) => state.products);

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (filteredItems.length === 0) {
    return (
      <div className="no-products">
        <h2>No products found</h2>
        <p>Try adjusting your filters or search query</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {filteredItems.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
