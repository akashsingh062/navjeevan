import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

// Configure Cloudinary SDK credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ success: false, message: "No photograph file provided." }, { status: 400 });
    }

    // Convert file object to a Node.js binary Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Verify if Cloudinary is fully configured in the environment
    const isCloudinaryConfigured = 
      process.env.CLOUDINARY_CLOUD_NAME && 
      process.env.CLOUDINARY_CLOUD_NAME !== "your_cloud_name" &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_KEY !== "your_api_key" &&
      process.env.CLOUDINARY_API_SECRET &&
      process.env.CLOUDINARY_API_SECRET !== "your_api_secret";

    if (!isCloudinaryConfigured) {
      console.warn("Cloudinary keys not set up. Saving file locally to public/uploads.");
      
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Extract and sanitize filename to prevent path traversal or invalid URL characters
      const originalName = file.name || "upload";
      const ext = path.extname(originalName) || ".jpg";
      const baseName = path.basename(originalName, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
      const uniqueName = `${baseName}-${Date.now()}${ext}`;
      const filePath = path.join(uploadDir, uniqueName);

      // Write the buffer to public/uploads
      await fs.promises.writeFile(filePath, buffer);
      const localUrl = `/uploads/${uniqueName}`;

      return NextResponse.json({ 
        success: true, 
        url: localUrl,
        isDemo: true,
        message: "Cloudinary keys are missing. Saved file to public local storage."
      });
    }

    // Determine if the file is an image
    const isImage = file.type?.startsWith("image/") || /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(file.name || "");
    const resourceType = isImage ? "image" : "raw";

    const originalName = file.name || "upload";
    const ext = path.extname(originalName) || "";
    const baseName = path.basename(originalName, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
    const uniqueId = `${baseName}-${Date.now()}`;
    // Raw assets require the extension in the public ID to download with it
    const publicId = resourceType === "raw" ? `${uniqueId}${ext}` : uniqueId;

    // Upload binary stream directly to Cloudinary using a Promise wrapper
    const uploadResult = await new Promise<{ secure_url?: string } | undefined>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "navjeevan_faculty",
          resource_type: resourceType,
          public_id: publicId
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    return NextResponse.json({
      success: true,
      url: uploadResult?.secure_url || ""
    });

  } catch (error: unknown) {
    const err = error as Error;
    console.error("Cloudinary/Local Upload API Error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to process and upload image." },
      { status: 500 }
    );
  }
}
