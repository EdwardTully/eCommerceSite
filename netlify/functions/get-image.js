import { getStore } from "@netlify/blobs";

export default async (req, context) => {
  const { key } = context.params;

  if (!key) {
    return new Response("Image key required", { status: 400 });
  }

  try {
    // Get the images store from Netlify Blobs
    const imageStore = getStore("images");
    const blob = await imageStore.get(key);
    
    if (!blob) {
      return new Response("Image not found", { status: 404 });
    }

    // Determine content type based on file extension
    let contentType = "image/jpeg";
    if (key.endsWith(".png")) contentType = "image/png";
    else if (key.endsWith(".gif")) contentType = "image/gif";
    else if (key.endsWith(".webp")) contentType = "image/webp";

    return new Response(blob, {
      status: 200,
      headers: { 
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000"
      }
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
};

export const config = {
  path: "/api/images/:key"
};
