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

  // Use image path from database (stored in /public/images/)
  const imageUrl = product.image;

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-image-container">
        <img 
          src={imageUrl} 
          alt={product.title}
          className="product-images"
          onError={(e) => {
            e.target.src = 'https://s.yimg.com/fz/api/res/1.2/9fKgZxD.U97Ethk.Ss8Tvw--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpbGw7aD00MTI7cHhvZmY9NTA7cHlvZmY9MTAwO3E9ODA7c3M9MTt3PTM4OA--/https://i.pinimg.com/736x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg';
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
