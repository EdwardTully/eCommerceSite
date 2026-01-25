import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts, fetchFeaturedProducts } from '../store/slices/productsSlice';
import ProductCard from '../components/Products/ProductCard';
import './HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const { featured, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Discover Unique Treasures</h1>
          <p>Your premier destination for antiques, collectibles, and vintage finds</p>
          <Link to="/shop" className="cta-button">Browse Collection</Link>
        </div>
      </section>

      <section className="featured-section">
        <h2>Featured Items</h2>
        <div className="featured-grid">
          {loading ? (
            <p>Loading featured items...</p>
          ) : (
            featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </section>

      <section className="categories-preview">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          <Link to="/shop?category=electronics" className="category-card">
            <span className="category-icon">📺</span>
            <h3>Electronics</h3>
          </Link>
          <Link to="/shop?category=furniture" className="category-card">
            <span className="category-icon">🪑</span>
            <h3>Furniture</h3>
          </Link>
          <Link to="/shop?category=books" className="category-card">
            <span className="category-icon">📚</span>
            <h3>Books</h3>
          </Link>
          <Link to="/shop?category=fitness" className="category-card">
            <span className="category-icon">💪</span>
            <h3>Fitness</h3>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
