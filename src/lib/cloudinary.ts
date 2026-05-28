import { v2 as cloudinary } from "cloudinary";
import path from "path";


export async function deleteCloudinaryAsset(url: string): Promise<boolean> {
  if (!url || !url.includes("cloudinary.com")) {
    return false;
  }

  try {
    
    
    const match = url.match(/cloudinary\.com\/[^/]+\/([^/]+)\/upload\/(?:v\d+\/)?(.+)/);
    if (!match) {
      return false;
    }

    const resourceType = match[1]; 
    const publicIdWithExt = match[2];

    let publicId = publicIdWithExt;

    
    
    if (resourceType === "image") {
      const ext = path.extname(publicIdWithExt);
      if (ext) {
        publicId = publicIdWithExt.substring(0, publicIdWithExt.length - ext.length);
      }
    }

    
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
