import { neon } from "@netlify/neon";

const sql = neon();

export default async (req, context) => {
  const { id } = context.params;

  // Handle GET request - fetch all products OR fetch specific product
  if (req.method === "GET") {
    try {
      if (id) {
        // Get specific product by ID
        const product = await sql`SELECT * FROM products WHERE id = ${id}`;
        if (product.length === 0) {
          return new Response(JSON.stringify({ error: "Product not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
          });
        }
        return new Response(JSON.stringify(product[0]), {
          headers: { "Content-Type": "application/json" }
        });
      } else {
        // Get all products
        const products = await sql`SELECT * FROM products ORDER BY id DESC`;
        return new Response(JSON.stringify(products), {
          headers: { "Content-Type": "application/json" }
        });
      }
    } catch (error) {
      console.error("Database error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  // Handle POST request - create new product (only on /api/products, not with :id)
  if (req.method === "POST") {
    if (id) {
      return new Response(JSON.stringify({ error: "POST requests must be sent to /api/products without an ID" }), {
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

    const { title, description, price, category, image, image_urls, featured } = data;
    if (!title || !description || price === undefined || !category || (!image && (!image_urls || image_urls.length === 0))) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: title, description, price, category, image (or image_urls)" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    try {
      const imageUrls = image_urls && image_urls.length > 0 ? image_urls : (image ? [image] : []);
      const result = await sql`
        INSERT INTO products (title, description, price, category, image, image_urls, sold, featured) 
        VALUES (${title}, ${description}, ${parseFloat(price)}, ${category}, ${image || imageUrls[0]}, ${JSON.stringify(imageUrls)}, false, ${featured || false}) 
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

  // Handle PUT request - update product (only with :id)
  if (req.method === "PUT") {
    if (!id) {
      return new Response(JSON.stringify({ error: "Product ID required for PUT requests" }), {
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
      const { title, description, price, category, image, image_urls, sold, featured } = data;
      
      // Build the update object with only provided fields
      const updates = {};
      if (title !== undefined) updates.title = title;
      if (description !== undefined) updates.description = description;
      if (price !== undefined) updates.price = parseFloat(price);
      if (category !== undefined) updates.category = category;
      if (image !== undefined) updates.image = image;
      if (image_urls !== undefined) updates.image_urls = image_urls;
      if (sold !== undefined) updates.sold = sold;
      if (featured !== undefined) updates.featured = featured;

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
            image_urls = COALESCE(${updates.image_urls ? JSON.stringify(updates.image_urls) : null}, image_urls),
            sold = COALESCE(${updates.sold !== undefined ? updates.sold : null}, sold),
            featured = COALESCE(${updates.featured !== undefined ? updates.featured : null}, featured)
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
  }

  // Handle DELETE request (only with :id)
  if (req.method === "DELETE") {
    if (!id) {
      return new Response(JSON.stringify({ error: "Product ID required for DELETE requests" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      const result = await sql`DELETE FROM products WHERE id = ${id} RETURNING id`;
      
      if (result.length === 0) {
        return new Response(JSON.stringify({ error: "Product not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ success: true, deletedId: result[0].id }), {
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
  path: "/api/products/:id?"
};
