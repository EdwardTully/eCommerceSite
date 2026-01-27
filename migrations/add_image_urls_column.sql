-- Add image_urls JSON column to products table to store multiple image filenames
ALTER TABLE products ADD COLUMN image_urls JSON DEFAULT '[]';

-- Migrate existing single image to the new image_urls array (if image column has data)
UPDATE products 
SET image_urls = CASE 
  WHEN image IS NOT NULL AND image != '' 
  THEN json_build_array(image)
  ELSE '[]'
END
WHERE image_urls = '[]' OR image_urls IS NULL;
