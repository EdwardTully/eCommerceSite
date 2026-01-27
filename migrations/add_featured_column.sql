-- Add featured column to products table if it doesn't exist
ALTER TABLE products 
ADD COLUMN featured BOOLEAN DEFAULT false;
