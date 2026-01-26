import React from 'react';
import ProductCard from './ProductCard';
import './CategorySection.css';

const CategorySection = ({ category, products }) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="category-section">
      <div className="category-header">
        <h2>{category}</h2>
        <span className="product-count">{products.length} items</span>
      </div>
      <div className="category-products">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
