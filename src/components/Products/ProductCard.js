import React from 'react';
import { useDispatch } from 'react-redux';
import { openProductModal } from '../../store/slices/uiSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { showNotification } from '../../store/slices/uiSlice';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleCardClick = () => {
    dispatch(openProductModal(product));
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent modal from opening
    dispatch(addToCart(product));
    dispatch(showNotification({
      message: `${product.title} added to cart!`,
      type: 'success'
    }));
  };

  // Support Netlify Blobs: if product.blob_key exists, use the API function to serve it
  const imageUrl = product.blob_key
    ? `/api/images/${product.blob_key}`
    : product.image;

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-image-container">
        <img 
          src={imageUrl} 
          alt={product.title}
          className="product-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x300?text=Image+Not+Available';
          }}
        />
        {product.sold && (
          <div className="sold-badge">SOLD</div>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">${Number(product.price).toFixed(2)}</span>
          <button 
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={product.sold}
          >
            {product.sold ? 'Sold Out' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
