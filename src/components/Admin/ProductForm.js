import React, { useState } from 'react';
import './ProductForm.css';

const CATEGORIES = [
  'Furniture',
  'Decorative Objects',
  'Collectibles',
  'Art & Prints',
  'Glassware',
  'Books & Documents',
  'Tools & Hardware',
  'Military Memorabilia',
  'Scientific Instruments',
  'Vintage Electronics',
  'Advertising'
];

const ProductForm = ({ onSubmit, initialProduct = null, isLoading = false }) => {
  const [formData, setFormData] = useState(
    initialProduct || {
      title: '',
      description: '',
      price: '',
      category: 'Furniture',
      image: '',
      sold: false,
    }
  );
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialProduct?.image || '');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      imageFile: imageFile,
      imagePreview: imagePreview,
    });
  };

  return (
    <div className="product-form-container">
      <form onSubmit={handleSubmit} className="product-form">
        <h2>{initialProduct ? 'Edit Product' : 'Add New Product'}</h2>

        <div className="form-group">
          <label htmlFor="title">Product Title *</label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Victorian Side Table"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Detailed product description..."
            rows="4"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Price *</label>
            <input
              id="price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="image">Product Image *</label>
          <input
            id="image"
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            required={!initialProduct}
          />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
              <p className="preview-label">Image Preview</p>
            </div>
          )}
        </div>

        <div className="form-group checkbox">
          <input
            id="sold"
            type="checkbox"
            name="sold"
            checked={formData.sold}
            onChange={handleChange}
          />
          <label htmlFor="sold">Mark as Sold</label>
        </div>

        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? 'Saving...' : initialProduct ? 'Update Product' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
