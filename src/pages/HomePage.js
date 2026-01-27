import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts, fetchFeaturedProducts } from '../store/slices/productsSlice';
import ProductCard from '../components/Products/ProductCard';
import './HomePage.css';

const CATEGORIES_WITH_ICONS = [
  { name: 'Furniture', icon: '🪑', slug: 'Furniture' },
  { name: 'Decorative Objects', icon: '🎨', slug: 'Decorative Objects' },
  { name: 'Collectibles', icon: '🏆', slug: 'Collectibles' },
  { name: 'Art & Prints', icon: '🖼️', slug: 'Art & Prints' },
  { name: 'Glassware', icon: '🥃', slug: 'Glassware' },
  { name: 'Books & Documents', icon: '📚', slug: 'Books & Documents' },
  { name: 'Tools & Hardware', icon: '🔧', slug: 'Tools & Hardware' },
  { name: 'Military Memorabilia', icon: '⚔️', slug: 'Military Memorabilia' },
  { name: 'Scientific Instruments', icon: '🔬', slug: 'Scientific Instruments' },
  { name: 'Vintage Electronics', icon: '📺', slug: 'Vintage Electronics' },
  { name: 'Advertising', icon: '📢', slug: 'Advertising' },
  { name: 'Oddities', icon: '🎭', slug: 'Oddities' },
];

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
          {CATEGORIES_WITH_ICONS.map((category) => (
            <Link 
              key={category.slug}
              to={`/shop?category=${encodeURIComponent(category.slug)}`} 
              className="category-card"
            >
              <span className="category-icon">{category.icon}</span>
              <h3>{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
