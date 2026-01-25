import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleCart } from '../../store/slices/cartSlice';
import { selectCartItemCount } from '../../store/slices/cartSlice';
import './Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const cartItemCount = useSelector(selectCartItemCount);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>🏛️ Antique Treasures</h1>
        </Link>
        
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/shop" className="nav-link">Shop</Link>
        </nav>

        <button 
          className="cart-button" 
          onClick={() => dispatch(toggleCart())}
          aria-label="Shopping cart"
        >
          🛒 Cart
          {cartItemCount > 0 && (
            <span className="cart-badge">{cartItemCount}</span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
