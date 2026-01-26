# Admin Portal Documentation

## Overview
The Admin Portal allows site owners to manage products without redeploying the site. It provides a user-friendly interface to add, edit, and delete products.

## Accessing the Admin Portal

1. Navigate to `https://your-site.netlify.app/admin`
2. Enter the admin password (default: `admin123`)

## Setting the Admin Password

To set a secure admin password:

1. Create or update your `.env` file in the project root:
```
REACT_APP_ADMIN_PASSWORD=your_secure_password_here
```

2. The admin portal will use this password for login

## Predefined Categories

The following categories are available in the product form dropdown. These ensure consistent category naming across your store:

- Furniture
- Decorative Objects
- Vintage Textiles
- Collectibles
- Jewelry
- Art & Prints
- Glassware
- Kitchen & Dining
- Books & Documents
- Tools & Hardware

To add or modify categories, edit `src/components/Admin/ProductForm.js` and update the `CATEGORIES` array.

## Adding a Product

1. Login to the Admin Portal
2. Fill in the product form:
   - **Title**: Product name
   - **Description**: Detailed product information
   - **Price**: Product cost (e.g., 49.99)
   - **Category**: Select from dropdown list
   - **Image**: Upload a product image
   - **Sold Status**: Check if product is already sold

3. Click "Add Product"
4. The product will be added to the database and appear immediately in the shop

## Editing a Product

1. Click "Edit" button on any product in the list
2. Modify the fields as needed
3. Click "Update Product"
4. Changes will be reflected immediately in the shop

## Deleting a Product

1. Click "Delete" button on the product
2. Confirm the deletion
3. Product will be removed from the database and shop

## Product Images

### Image Upload Process
1. Select an image from your computer when adding/editing a product
2. The image filename is generated from the product title and timestamp
3. Images are stored with the path `/images/filename.jpg`

### Image Directory
Product images should be placed in `/public/images/` directory.

**Note**: Currently, image upload requires manual placement in the `/public/images/` folder. For automated image uploads via the admin portal, a file upload API endpoint would need to be implemented.

### Image Guidelines
- Supported formats: JPG, PNG, WebP
- Recommended dimensions: 400x400px or larger
- File size: Keep under 500KB for optimal performance

## Netlify Functions Used

### POST /api/products
Creates a new product in the database

**Request Body:**
```json
{
  "title": "Product Name",
  "description": "Product details",
  "price": 99.99,
  "category": "Furniture",
  "image": "/images/product-name-timestamp.jpg",
  "sold": false
}
```

### PUT /api/products/:id
Updates an existing product

**Request Body:** (same as POST, all fields optional)

### DELETE /api/products/:id
Deletes a product from the database

## Shop Display

Products added through the Admin Portal automatically appear in:
- `/shop` - Organized by category
- `/` (HomePage) - Featured products section (if implemented)

Category-based organization is dynamic—adding a new category automatically creates a new section on the shop page.

## Troubleshooting

### Password Issues
- Default password: `admin123`
- Ensure `.env` file is properly configured with `REACT_APP_ADMIN_PASSWORD`
- Restart the development server after updating `.env`

### Products Not Appearing
- Verify database connection to Neon
- Check Netlify Functions logs for errors
- Hard refresh browser (Ctrl+F5) to clear cache

### Image Not Displaying
- Ensure image is in `/public/images/` directory
- Check image filename matches the path in database
- Verify image file format is supported

## Security Notes

⚠️ **Important**: The current authentication system uses a simple password. For production deployment:

1. Implement proper authentication (OAuth, JWT, etc.)
2. Add HTTPS enforcement
3. Use environment variables for sensitive data
4. Consider adding role-based access control
5. Implement rate limiting on API endpoints
6. Add audit logging for product changes

## Future Enhancements

- [ ] Image upload via admin form (currently requires manual placement)
- [ ] Bulk product import from CSV
- [ ] Advanced product search and filtering in admin
- [ ] Product performance analytics
- [ ] Inventory management
- [ ] Multi-user support with different roles
- [ ] Automated inventory sync

## Support

For issues or questions about the Admin Portal, refer to the main project README or contact support.
