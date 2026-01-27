import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeProductModal } from '../../store/slices/uiSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { showNotification } from '../../store/slices/uiSlice';
import './ProductDetailModal.css';

const ProductDetailModal = () => {
  const dispatch = useDispatch();
  const { isProductModalOpen, selectedProduct } = useSelector((state) => state.ui);

  if (!isProductModalOpen || !selectedProduct) {
    return null;
  }

  const handleClose = () => {
    dispatch(closeProductModal());
  };

  const handleAddToCart = () => {
    dispatch(addToCart(selectedProduct));
    dispatch(showNotification({
      message: `${selectedProduct.title} added to cart!`,
      type: 'success'
    }));
    dispatch(closeProductModal());
  };

  const handleBackdropClick = (e) => {
    if (e.target.className === 'modal-backdrop') {
      handleClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={handleClose}>✕</button>
        
        <div className="modal-body">
          <div className="modal-image-section">
            <img 
              src={selectedProduct.image} 
              alt={selectedProduct.title}
              className="modal-image"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>

          <div className="modal-info-section">
            <div className="modal-category">{selectedProduct.category}</div>
            <h2 className="modal-title">{selectedProduct.title}</h2>
            
            <div className="modal-price">
              ${Number(selectedProduct.price).toFixed(2)}
            </div>

            <div className="modal-description">
              <h3>Description</h3>
              <p>{selectedProduct.description}</p>
            </div>

            <div className="modal-details">
              <h3>Product Details</h3>
              <ul>
                <li><strong>Category:</strong> {selectedProduct.category}</li>
                <li><strong>Condition:</strong> Vintage/Used</li>
                <li><strong>Availability:</strong> {selectedProduct.sold ? 'Sold Out' : 'In Stock'}</li>
              </ul>
            </div>

            <div className="modal-actions">
              <button 
                className="add-to-cart-modal-btn"
                onClick={handleAddToCart}
                disabled={selectedProduct.sold}
              >
                {selectedProduct.sold ? 'Sold Out' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
