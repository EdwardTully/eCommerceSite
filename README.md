# ReLoop - eCommerce Site

A modern eCommerce application built with React, Redux, and Stripe for sustainable shopping. Browse quality products, add items to your cart, and complete purchases with a seamless checkout experience.

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


## Managing Product Data (Descriptions & Images)

You have two main options for managing your product data (descriptions, images, etc.):

### 1. Manual Editing ("Nuclear Option")

- Open `db.json` in a text editor (such as VS Code).
- Add, edit, or remove product objects directly in the `products` array.
- Update fields like `title`, `description`, `category`, `price`, `sold`, and `image` as needed.
- Save the file and restart the mock backend (`npm run server` or `npm run dev`) if running.

**Example product entry:**
```json
{
  "id": 21,
  "title": "Antique Pocket Watch",
  "category": "miscellaneous",
  "price": 120.00,
  "sold": false,
  "description": "A beautiful 19th-century pocket watch in working condition.",
  "image": "https://your-image-url.com/pocketwatch.jpg"
}
```

### 2. Admin Client App (Recommended for Shopkeepers)

You can build a simple form-based React app (or use any frontend framework) to manage your inventory via the mock API (`json-server`).

**Basic steps:**
1. Create a new React app (e.g., `npx create-react-app admin-client`).
2. Use Axios or Fetch to connect to your running mock backend (default: `http://localhost:3001/products`).
3. Build forms for:
   - Adding new products (POST)
   - Editing existing products (PUT/PATCH)
   - Deleting products (DELETE)
   - Uploading or linking images (just set the `image` URL field)
4. Optionally, add authentication or restrict access for security.

**Example POST request to add a product:**
```js
axios.post('http://localhost:3001/products', {
  title: 'New Item',
  category: 'furniture',
  price: 99.99,
  sold: false,
  description: 'Description here',
  image: 'https://your-image-url.com/item.jpg'
});
```

**Tips:**
- You can use tools like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to test API requests before building a UI.
- For production, consider a real backend and image hosting (e.g., AWS S3, Cloudinary).

If you want a starter template or more details for the admin client, just let me know!
---

## Support

For issues or questions, please check the console for error messages or review the Redux DevTools for state debugging.

---

**Happy Shopping!** 🛍️


##Card Useage
Yes, that's correct. In most modern eCommerce sites:

The shopping cart UI and logic are built in your app, but payment processing (billing) is handled by a third-party provider like Stripe, PayPal, or Square for security and compliance.
The cart's state is managed locally (e.g., with Redux), but the actual payment and sensitive data never touch your server—they go directly to the payment provider.
This is the approach used in your project: Stripe is integrated for billing, while the cart is managed in your React/Redux frontend