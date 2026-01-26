import { neon } from "@netlify/neon";

const sql = neon();

export default async (req, context) => {
  // Fetch all products
  const products = await sql`SELECT * FROM products ORDER BY id DESC`;
  return new Response(JSON.stringify(products), {
    headers: { "Content-Type": "application/json" }
  });
};

export const config = {
  path: "/api/products"
};
