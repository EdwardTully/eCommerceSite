import { neon } from "@netlify/neon";

const sql = neon();


export default async (req, context) => {
  // Fetch all products and join the first image (display_order = 1) if available
  const products = await sql`
    SELECT p.*, i.blob_key
    FROM products p
    LEFT JOIN images i ON i.product_id = p.id AND i.display_order = 1
    ORDER BY p.id DESC
  `;
  return new Response(JSON.stringify(products), {
    headers: { "Content-Type": "application/json" }
  });
};

export const config = {
  path: "/api/products"
};
