import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from './components/Layout/Header';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminDashboard from './pages/AdminDashboard';
import ShoppingCart from './components/Cart/ShoppingCart';
import ProductDetailModal from './components/Products/ProductDetailModal';
import Notification from './components/UI/Notification';
import './App.css';

const MainLayout = ({ children }) => (
  <>
    <Header />
    <main className="main-content">
      {children}
    </main>
    <ShoppingCart />
    <ProductDetailModal />
    <Notification />
  </>
);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
            <Route path="/shop" element={<MainLayout><ShopPage /></MainLayout>} />
            <Route path="/checkout" element={<MainLayout><CheckoutPage /></MainLayout>} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
