import React, { useState, forwardRef, useImperativeHandle } from 'react';
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
  'Advertising',
  'Oddities'
];

const ProductForm = forwardRef(({ onSubmit, initialProduct = null, isLoading = false }, ref) => {
  const [formData, setFormData] = useState(
    initialProduct || {
      title: '',
      description: '',
      price: '',
      category: 'Furniture',
      image: '',
      sold: false,
      featured: false,
    }
  );
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState(initialProduct?.image_urls || [initialProduct?.image].filter(Boolean) || []);

  useImperativeHandle(ref, () => ({
    resetForm: () => {
      setFormData({
        title: '',
        description: '',
        price: '',
        category: 'Furniture',
        image: '',
        sold: false,
        featured: false,
      });
      setImageFiles([]);
      setImagePreviews([]);
    }
  }));

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    
    // Create previews for all files
    const previews = [];
    let loadedCount = 0;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        previews.push(event.target.result);
        loadedCount++;
        if (loadedCount === files.length) {
          setImagePreviews(previews);
        }
      };
      reader.res: imageFiles,
      imagePreviews: imagePreviews
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
          <label htmlFor="image">Product Images * (Multiple files supported)</label>
          <input
            id="image"
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            multiple
            required={!initialProduct}
          />
          {imagePreviews.length > 0 && (
            <div className="image-preview-gallery">
              <p className="preview-label">Image Previews ({imagePreviews.length})</p>
              <div className="preview-grid">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="preview-item">
                    <img src={preview} alt={`Preview ${index + 1}`} />
                    <span className="preview-number">{index + 1}</span>
                  </div>
                ))}
              </div>
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

        <div className="form-group checkbox">
          <input
            id="featured"
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
          />
          <label htmlFor="featured">Feature on Homepage</label>
        </div>

        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? 'Saving...' : initialProduct ? 'Update Product' : 'Add Product'}
        </button>
      </form>
    </div>
  );
});

ProductForm.displayName = 'ProductForm';

export default ProductForm;
