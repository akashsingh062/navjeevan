import { v2 as cloudinary } from "cloudinary";
import path from "path";

/**
 * Deletes an asset from Cloudinary given its secure_url or public URL.
 * Supports both raw assets (documents like PDFs) and image assets.
 */
export async function deleteCloudinaryAsset(url: string): Promise<boolean> {
  if (!url || !url.includes("cloudinary.com")) {
    return false;
  }

  try {
    // Extract resource type and public ID from Cloudinary URL
    // Format: https://res.cloudinary.com/<cloud_name>/<resource_type>/upload/v<version>/<public_id>
    const match = url.match(/cloudinary\.com\/[^/]+\/([^/]+)\/upload\/(?:v\d+\/)?(.+)/);
    if (!match) {
      return false;
    }

    const resourceType = match[1]; // "image", "raw", etc.
    const publicIdWithExt = match[2];

    let publicId = publicIdWithExt;

    // For images, the public ID passed to destroy must NOT contain the extension.
    // For raw files, it MUST contain the extension.
    if (resourceType === "image") {
      const ext = path.extname(publicIdWithExt);
      if (ext) {
        publicId = publicIdWithExt.substring(0, publicIdWithExt.length - ext.length);
      }
    }

    // Configure credentials
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType
    });

    console.log(`Cloudinary destroy call for ${publicId} (${resourceType}) result:`, result);
    return result.result === "ok";
  } catch (error) {
    console.error(`Error deleting Cloudinary asset ${url}:`, error);
    return false;
  }
}
