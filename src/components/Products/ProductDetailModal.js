import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeProductModal } from '../../store/slices/uiSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { showNotification } from '../../store/slices/uiSlice';
import './ProductDetailModal.css';

const ProductDetailModal = () => {
  const dispatch = useDispatch();
  const { isProductModalOpen, selectedProduct } = useSelector((state) => state.ui);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  if (!isProductModalOpen || !selectedProduct) {
    return null;
  }

  // Get images array - support both new image_urls and legacy image field
  const images = selectedProduct.image_urls && selectedProduct.image_urls.length > 0
    ? selectedProduct.image_urls.map(img => `/images/${img}`)
    : [selectedProduct.image];

  const currentImage = images[currentImageIndex];

  const handleClose = () => {
    dispatch(closeProductModal());
    setCurrentImageIndex(0);
    setIsZoomed(false);
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

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const handleDragStart = (e) => {
    e.preventDefault();
    return false;
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={handleClose}>✕</button>
        
        <div className="modal-body">
          <div className="modal-image-section">
            <div 
              className={`modal-image-container ${isZoomed ? 'zoomed' : ''}`}
              onMouseMove={handleMouseMove}
              style={isZoomed ? {
                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
              } : {}}
            >
              <img 
                src={currentImage} 
                alt={selectedProduct.title}
                className="modal-image"
                draggable={false}
                onDragStart={handleDragStart}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>

            {/* Zoom Toggle Button */}
            <button 
              className="zoom-toggle-btn"
              onClick={() => setIsZoomed(!isZoomed)}
              title={isZoomed ? 'Normal View' : 'Zoom In'}
            >
              {isZoomed ? '🔍−' : '🔍+'}
            </button>

            {/* Image Navigation */}
            {images.length > 1 && (
              <div className="image-navigation">
                <button 
                  className="nav-btn prev-btn"
                  onClick={handlePrevImage}
                  title="Previous image"
                >
                  ‹
                </button>
                <div className="image-counter">
                  {currentImageIndex + 1} / {images.length}
                </div>
                <button 
                  className="nav-btn next-btn"
                  onClick={handleNextImage}
                  title="Next image"
                >
                  ›
                </button>
              </div>
            )}

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="thumbnail-gallery">
                {images.map((img, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                    title={`Image ${index + 1}`}
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
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
