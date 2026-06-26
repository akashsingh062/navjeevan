/**
 * Utility to optimize image URLs.
 * Especially handles Cloudinary URLs to append optimization parameters (f_auto, q_auto, width, height)
 * and bypasses Next.js image optimization by serving optimized files directly from Cloudinary CDN.
 */
export function getOptimizedImageUrl(
  url: string | undefined | null,
  width?: number,
  height?: number
): string {
  if (!url) return "";

  // If it's a relative/local URL, just return it as is
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return url;
  }

  // Only optimize Cloudinary images
  if (!url.includes("cloudinary.com")) {
    return url;
  }

  // Skip video files or raw files that shouldn't be optimized as images
  const lowerUrl = url.toLowerCase();
  const isVideo =
    lowerUrl.includes(".mp4") ||
    lowerUrl.includes(".webm") ||
    lowerUrl.includes(".ogg") ||
    lowerUrl.includes("/video/upload/");
  
  if (isVideo) {
    return url;
  }

  try {
    // Standard Cloudinary URL structure: https://res.cloudinary.com/<cloud_name>/image/upload/<version>/<public_id>
    // We want to insert transformations right after "/upload/"
    const uploadIndex = url.indexOf("/upload/");
    if (uploadIndex === -1) {
      return url;
    }

    const prefix = url.substring(0, uploadIndex + 8); // includes "/upload/"
    const suffix = url.substring(uploadIndex + 8);

    // Build transformation options
    const transforms: string[] = ["f_auto", "q_auto"];
    
    if (width) {
      transforms.push(`w_${width}`);
    }
    if (height) {
      transforms.push(`h_${height}`);
    }

    // Apply appropriate cropping behavior
    if (width && height) {
      transforms.push("c_fill"); // crop to fill dimensions
    } else if (width || height) {
      transforms.push("c_limit"); // scale down to fit within dimensions
    }

    const transformString = transforms.join(",");

    // Check if the suffix already contains a transformation segment (e.g. "w_400,q_auto/")
    const parts = suffix.split("/");
    const firstPart = parts[0];

    // If firstPart is a version tag (starts with v followed by numbers) or public ID (no transforms),
    // we can just insert our transformations.
    const isVersion = /^v\d+$/.test(firstPart);
    const isTransformation = firstPart.includes("_") || firstPart.includes(",");

    if (isTransformation) {
      // Replace existing transformation
      parts[0] = transformString;
      return prefix + parts.join("/");
    } else {
      // Insert new transformation
      return prefix + transformString + "/" + suffix;
    }
  } catch (error) {
    console.error("Error optimizing Cloudinary URL:", error);
    return url;
  }
}
