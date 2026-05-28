import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

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

    // Verify if Cloudinary is fully configured in the environment
    const isCloudinaryConfigured = 
      process.env.CLOUDINARY_CLOUD_NAME && 
      process.env.CLOUDINARY_CLOUD_NAME !== "your_cloud_name" &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_KEY !== "your_api_key" &&
      process.env.CLOUDINARY_API_SECRET &&
      process.env.CLOUDINARY_API_SECRET !== "your_api_secret";

    if (!isCloudinaryConfigured) {
      // Graceful fallback for dev environment to ensure no crash
      console.warn("Cloudinary keys not set up. Falling back to local preview mode.");
      const mockUrl = `/images/faculty/custom-uploaded-${Date.now()}.jpg`;
      return NextResponse.json({ 
        success: true, 
        url: mockUrl,
        isDemo: true,
        message: "Cloudinary keys are missing from .env. Gracefully fell back to mock profile path."
      });
    }

    // Convert file object to a Node.js binary Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload binary stream directly to Cloudinary using a Promise wrapper
    const uploadResult = await new Promise<{ secure_url?: string } | undefined>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "navjeevan_faculty",
          resource_type: "image"
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
    console.error("Cloudinary Upload API Error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to process and upload image." },
      { status: 500 }
    );
  }
}
