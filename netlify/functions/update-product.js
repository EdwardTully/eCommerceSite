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

  try {
    const { title, description, price, category, image, sold } = data;
    
    // Build the update object with only provided fields
    const updates = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (price !== undefined) updates.price = parseFloat(price);
    if (category !== undefined) updates.category = category;
    if (image !== undefined) updates.image = image;
    if (sold !== undefined) updates.sold = sold;

    if (Object.keys(updates).length === 0) {
      return new Response(JSON.stringify({ error: "No fields to update" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // For simplicity with tagged templates, we'll handle common update cases
    let result;
    
    if (Object.keys(updates).length === 1 && updates.sold !== undefined) {
      // Just updating sold status (common case during checkout)
      result = await sql`UPDATE products SET sold = ${updates.sold} WHERE id = ${id} RETURNING *`;
    } else {
      // Full product update
      result = await sql`
        UPDATE products SET 
          title = COALESCE(${updates.title || null}, title),
          description = COALESCE(${updates.description || null}, description),
          price = COALESCE(${updates.price || null}, price),
          category = COALESCE(${updates.category || null}, category),
          image = COALESCE(${updates.image || null}, image),
          sold = COALESCE(${updates.sold !== undefined ? updates.sold : null}, sold)
        WHERE id = ${id} 
        RETURNING *
      `;
    }
    
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
    console.error("Database error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const config = {
  path: "/api/products/:id",
};
