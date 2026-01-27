import { neon } from "@netlify/neon";

const sql = neon();

export default async (req, context) => {
  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const featured = await sql`
      SELECT * FROM products 
      WHERE featured = true AND sold = false 
      ORDER BY id DESC 
      LIMIT 6
    `;
    
    return new Response(JSON.stringify(featured), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Database error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const config = {
  path: "/api/featured"
};
