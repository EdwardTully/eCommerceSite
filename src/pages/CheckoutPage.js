import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import StripeCheckout from '../components/Checkout/StripeCheckout';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.items);

  if (cartItems.length === 0) {
    return <Navigate to="/shop" />;
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1>Checkout</h1>
        <StripeCheckout />
      </div>
    </div>
  );
};

export default CheckoutPage;
