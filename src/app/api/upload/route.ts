import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

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

    const categoryParam = (formData.get("category") as string || "general").trim();
    const cleanCategory = categoryParam.replace(/[^a-zA-Z0-9_-]/g, "_") || "general";

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const isCloudinaryConfigured =
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_CLOUD_NAME !== "your_cloud_name" &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_KEY !== "your_api_key" &&
      process.env.CLOUDINARY_API_SECRET &&
      process.env.CLOUDINARY_API_SECRET !== "your_api_secret";

    if (!isCloudinaryConfigured) {
      console.warn("Cloudinary keys not set up. Saving file locally to public/uploads.");

      const uploadDir = path.join(process.cwd(), "public", "uploads", cleanCategory);
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const originalName = file.name || "upload";
      const ext = path.extname(originalName) || ".jpg";
      const baseName = path.basename(originalName, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
      const uniqueName = `${baseName}-${Date.now()}${ext}`;
      const filePath = path.join(uploadDir, uniqueName);

      await fs.promises.writeFile(filePath, buffer);
      const localUrl = `/uploads/${cleanCategory}/${uniqueName}`;

      return NextResponse.json({
        success: true,
        url: localUrl,
        isDemo: true,
        message: "Cloudinary keys are missing. Saved file to public local storage."
      });
    }

    const isImage = file.type?.startsWith("image/") || /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(file.name || "");
    const resourceType = isImage ? "image" : "raw";

    const originalName = file.name || "upload";
    const ext = path.extname(originalName) || "";
    const baseName = path.basename(originalName, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
    const uniqueId = `${baseName}-${Date.now()}`;

    const publicId = resourceType === "raw" ? `${uniqueId}${ext}` : uniqueId;

    const uploadResult = await new Promise<{ secure_url?: string } | undefined>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: `navjeevan_${cleanCategory}`,
          resource_type: resourceType,
          public_id: publicId,

          ...(isImage && {
            transformation: [
              { width: 1200, height: 1200, crop: "limit", quality: "auto", fetch_format: "auto" }
            ]
          })
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
