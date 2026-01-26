import { neon } from "@netlify/neon";

const sql = neon();

export default async (req, context) => {
  // Handle GET request - fetch all products
  if (req.method === "GET") {
    try {
      const products = await sql`SELECT * FROM products ORDER BY id DESC`;
      return new Response(JSON.stringify(products), {
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      console.error("Database error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  // Handle POST request - create new product
  if (req.method === "POST") {
    let data;
    try {
      data = await req.json();
    } catch (e) {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { title, description, price, category, image } = data;
    if (!title || !description || price === undefined || !category || !image) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: title, description, price, category, image" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    try {
      const result = await sql`
        INSERT INTO products (title, description, price, category, image, sold) 
        VALUES (${title}, ${description}, ${parseFloat(price)}, ${category}, ${image}, false) 
        RETURNING *
      `;

      return new Response(JSON.stringify(result[0]), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Database error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  // Handle other methods
  return new Response(JSON.stringify({ error: "Method not allowed" }), {
    status: 405,
    headers: { "Content-Type": "application/json" },
  });
};

export const config = {
  path: "/api/products"
};
