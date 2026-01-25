# Antique Treasures - eCommerce Site

A full-featured eCommerce application built with React, Redux, and Stripe for an antique shop. Browse unique treasures, add items to your cart, and complete purchases with a seamless checkout experience.

## Features

✨ **Product Browsing**
- Beautiful card-based product layout
- Click on any card to view detailed product information in a modal
- High-quality product images with fallback support

🔍 **Search & Filter**
- Search products by title, description, or category
- Filter by product categories
- Real-time results count

🛒 **Shopping Cart**
- Add/remove products
- Adjust quantities
- Persistent cart (saved to localStorage)
- Slide-out cart panel
- Real-time total calculation

💳 **Checkout with Stripe**
- Secure payment processing (test mode for development)
- Customer information form
- Order summary
- Stripe Elements integration

🎨 **Responsive Design**
- Mobile-first approach
- Works seamlessly on desktop, tablet, and mobile
- Modern UI with smooth animations

## Tech Stack

- **Frontend**: React 18
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Styling**: CSS3 with CSS Variables
- **Payment Processing**: Stripe (test mode)
- **Mock Backend**: json-server
- **HTTP Client**: Axios

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure Stripe (Optional)**
   - The app comes with test keys pre-configured
   - To use your own Stripe test keys, sign up at [Stripe](https://stripe.com)
   - Update the `.env` file with your publishable key:
     ```
     REACT_APP_STRIPE_PUBLISHABLE_KEY=your_test_key_here
     ```

### Running the Application

**Option 1: Run both servers simultaneously (Recommended)**
```bash
npm run dev
```
This starts both the React app (port 3000) and the mock API server (port 3001).

**Option 2: Run servers separately**

Terminal 1 - Start the mock backend:
```bash
npm run server
```

Terminal 2 - Start the React app:
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

## Using the Application

### Testing Payments

The app is in **test mode** for Stripe. Use these test credentials:

- **Card Number**: `4242 4242 4242 4242`
- **Expiry Date**: Any future date (e.g., 12/25)
- **CVC**: Any 3 digits (e.g., 123)
- **ZIP**: Any 5 digits (e.g., 12345)

### Available Routes

- `/` - Home page with featured products
- `/shop` - Browse all products with search and filter
- `/checkout` - Complete your purchase

## Project Structure

```
eCommerceSite/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Cart/
│   │   │   ├── ShoppingCart.js
│   │   │   └── ShoppingCart.css
│   │   ├── Checkout/
│   │   │   ├── StripeCheckout.js
│   │   │   └── StripeCheckout.css
│   │   ├── Layout/
│   │   │   ├── Header.js
│   │   │   └── Header.css
│   │   ├── Products/
│   │   │   ├── ProductCard.js
│   │   │   ├── ProductGrid.js
│   │   │   ├── ProductDetailModal.js
│   │   │   ├── FilterBar.js
│   │   │   └── [CSS files]
│   │   └── UI/
│   │       ├── Notification.js
│   │       └── Notification.css
│   ├── pages/
│   │   ├── HomePage.js
│   │   ├── ShopPage.js
│   │   ├── CheckoutPage.js
│   │   └── [CSS files]
│   ├── store/
│   │   ├── store.js
│   │   └── slices/
│   │       ├── productsSlice.js
│   │       ├── cartSlice.js
│   │       └── uiSlice.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── db.json (mock database)
├── package.json
└── README.md
```

## Key Features Explained

### Card-Based Product Display
Each product is displayed as a card with:
- Product image
- Title and category
- Price
- Description
- "Add to Cart" button
- Click anywhere on the card to view full details

### Product Detail Modal
Clicking a product card opens a modal with:
- Larger product image
- Complete description
- Product details
- Add to cart functionality

### Shopping Cart
- Slides in from the right
- Shows all cart items
- Quantity controls (+/-)
- Remove item option
- Running total
- Proceeds to checkout

### Redux State Management
- `productsSlice`: Manages product data, filtering, and search
- `cartSlice`: Handles cart items with localStorage persistence
- `uiSlice`: Controls modals and notifications

## Customization

### Changing the Color Scheme
Edit the CSS variables in `src/index.css`:
```css
:root {
  --primary-color: #8b4513;
  --secondary-color: #d4a574;
  --accent-color: #c19a6b;
  /* ... more colors */
}
```

### Adding New Products
Edit `db.json` to add or modify products:
```json
{
  "id": "999",
  "title": "Product Name",
  "category": "category-name",
  "price": 99.99,
  "sold": false,
  "description": "Product description",
  "image": "image-url"
}
```

### Featured Products
Update the `featured` array in `db.json` to change homepage featured items.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Notes

- Cart data persists in localStorage
- Images have fallback URLs if original fails to load
- Fully responsive design (mobile, tablet, desktop)
- All Stripe transactions are in test mode - no real charges

## Future Enhancements

Potential features to add:
- User authentication
- Product reviews and ratings
- Wishlist functionality
- Order history
- Admin panel for product management
- Email notifications
- Product variants (size, color, etc.)
- Related products suggestions

## License

This project is for educational/demonstration purposes.

## Support

For issues or questions, please check the console for error messages or review the Redux DevTools for state debugging.

---

**Happy Shopping!** 🛍️
