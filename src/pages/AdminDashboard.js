import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from '../components/Admin/ProductForm';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [editingId, setEditingId] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  // Simple password check (in production, use proper auth)
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === process.env.REACT_APP_ADMIN_PASSWORD || password === 'admin123') {
      setAuthenticated(true);
      setPassword('');
    } else {
      setMessage({ type: 'error', text: 'Incorrect password' });
    }
  };

  useEffect(() => {
    if (authenticated) {
      fetchProducts();
    }
  }, [authenticated]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to fetch products' });
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (formData) => {
    try {
      setLoading(true);
      const { imageFile, imagePreview, ...productData } = formData;

      let imagePath = productData.image;
      
      if (imageFile) {
        // Create a simple filename from title
        const fileName = `${productData.title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.jpg`;
        imagePath = `/images/${fileName}`;
        
        // In production, you would upload the image file here
        // For now, we'll just use the filename
        // TODO: Implement image upload to /public/images/
      }

      const payload = {
        ...productData,
        image: imagePath,
      };

      if (editingId) {
        // Update existing product
        await axios.put(`/api/products/${editingId}`, payload);
        setMessage({ type: 'success', text: 'Product updated successfully!' });
        setEditingId(null);
      } else {
        // Create new product
        await axios.post('/api/products', payload);
        setMessage({ type: 'success', text: 'Product created successfully!' });
      }

      fetchProducts();
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.error || 'Failed to save product' });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/api/products/${id}`);
        setMessage({ type: 'success', text: 'Product deleted successfully!' });
        fetchProducts();
      } catch (error) {
        setMessage({ type: 'error', text: error.response?.data?.error || 'Failed to delete product' });
      }
    }
  };

  const handleEditProduct = (product) => {
    setEditingId(product.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  if (!authenticated) {
    return (
      <div className="admin-login">
        <div className="login-container">
          <h1>Admin Portal</h1>
          <form onSubmit={handleLogin}>
            <div className="login-group">
              <label htmlFor="password">Admin Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                autoFocus
              />
            </div>
            <button type="submit">Login</button>
          </form>
          {message.text && (
            <div className={`message ${message.type}`}>{message.text}</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={() => setAuthenticated(false)} className="logout-btn">
          Logout
        </button>
      </header>

      {message.text && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      <div className="admin-content">
        <section className="product-form-section">
          <ProductForm
            onSubmit={handleAddProduct}
            initialProduct={editingId ? products.find(p => p.id === editingId) : null}
            isLoading={loading}
          />
          {editingId && (
            <button onClick={handleCancelEdit} className="cancel-edit-btn">
              Cancel Edit
            </button>
          )}
        </section>

        <section className="products-list-section">
          <h2>Current Products ({products.length})</h2>
          {loading ? (
            <div className="loading">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="no-products">No products yet</div>
          ) : (
            <div className="products-list">
              {products.map((product) => (
                <div key={product.id} className="product-item">
                  {product.image && (
                    <img src={product.image} alt={product.title} className="product-thumbnail" />
                  )}
                  <div className="product-info">
                    <h3>{product.title}</h3>
                    <p className="category">{product.category}</p>
                    <p className="price">${parseFloat(product.price).toFixed(2)}</p>
                    <p className="status">{product.sold ? 'SOLD' : 'Available'}</p>
                  </div>
                  <div className="product-actions">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
