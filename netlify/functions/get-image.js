export default async (req, context) => {
  const { key } = context.params;

  if (!key) {
    return new Response(JSON.stringify({ error: "Image key required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    // Read the blob from Netlify Blobs
    const blob = await context.blobs.images.get(key);
    
    if (!blob) {
      return new Response(JSON.stringify({ error: "Image not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Determine content type based on file extension
    let contentType = "image/jpeg";
    if (key.endsWith(".png")) contentType = "image/png";
    else if (key.endsWith(".gif")) contentType = "image/gif";
    else if (key.endsWith(".webp")) contentType = "image/webp";

    return new Response(blob, {
      headers: { "Content-Type": contentType }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

export const config = {
  path: "/api/images/:key"
};
