import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { clearCart, selectCartTotal } from '../../store/slices/cartSlice';
import { showNotification } from '../../store/slices/uiSlice';
import './StripeCheckout.css';

// Initialize Stripe (you'll need to add your publishable key)
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_51234567890abcdefghijklmnopqrstuvwxyz');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const cartItems = useSelector((state) => state.cart.items);
  const total = useSelector(selectCartTotal);
  
  const [loading, setLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: ''
  });

  const handleInputChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    // In a real application, you would:
    // 1. Send order details to your backend
    // 2. Create a payment intent on your server
    // 3. Confirm the payment with Stripe
    
    // For demo purposes, we'll simulate a successful payment
    try {
      const cardElement = elements.getElement(CardElement);

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // For demo: Use Stripe's test card number 4242 4242 4242 4242
      // In production, you'd call stripe.confirmCardPayment() with a payment intent from your server
      
      dispatch(showNotification({
        message: 'Payment successful! Thank you for your purchase.',
        type: 'success'
      }));
      
      dispatch(clearCart());
      navigate('/');
      
    } catch (error) {
      dispatch(showNotification({
        message: 'Payment failed. Please try again.',
        type: 'error'
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <div className="order-summary">
        <h2>Order Summary</h2>
        <div className="summary-items">
          {cartItems.map((item) => (
            <div key={item.id} className="summary-item">
              <span>{item.title} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="summary-total">
          <strong>Total:</strong>
          <strong>${total.toFixed(2)}</strong>
        </div>
      </div>

      <div className="customer-info-section">
        <h2>Customer Information</h2>
        
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={customerInfo.name}
            onChange={handleInputChange}
            required
            placeholder="John Doe"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={customerInfo.email}
            onChange={handleInputChange}
            required
            placeholder="john@example.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={customerInfo.address}
            onChange={handleInputChange}
            required
            placeholder="123 Main St"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={customerInfo.city}
              onChange={handleInputChange}
              required
              placeholder="New York"
            />
          </div>

          <div className="form-group">
            <label htmlFor="zip">ZIP Code</label>
            <input
              type="text"
              id="zip"
              name="zip"
              value={customerInfo.zip}
              onChange={handleInputChange}
              required
              placeholder="10001"
            />
          </div>
        </div>
      </div>

      <div className="payment-section">
        <h2>Payment Information</h2>
        <div className="card-element-container">
          <CardElement 
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
        
        <div className="test-card-info">
          <p><strong>Test Mode:</strong> Use card number <code>4242 4242 4242 4242</code></p>
          <p>Any future expiry date and any 3-digit CVC</p>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={!stripe || loading}
        className="pay-button"
      >
        {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
      </button>
    </form>
  );
};

const StripeCheckout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default StripeCheckout;
