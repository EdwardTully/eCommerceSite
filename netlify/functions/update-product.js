import { neon } from "@netlify/neon";

const sql = neon();

export default async (req, context) => {
  if (req.method !== "PUT") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { id } = context.params;
  if (!id) {
    return new Response(JSON.stringify({ error: "Product ID required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  let data;
  try {
    data = await req.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Only allow updating the 'sold' field for now
  if (typeof data.sold !== "boolean") {
    return new Response(JSON.stringify({ error: "'sold' field required and must be boolean" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const result = await sql(
      "UPDATE products SET sold = $1 WHERE id = $2 RETURNING *",
      [data.sold, id]
    );
    if (result.length === 0) {
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify(result[0]), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const config = {
  path: "/api/products/:id",
};
