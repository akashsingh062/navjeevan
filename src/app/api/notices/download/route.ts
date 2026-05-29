import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const urlParam = searchParams.get("url");

    if (!urlParam) {
      return NextResponse.json({ success: false, message: "Missing URL parameter." }, { status: 400 });
    }

    if (!urlParam.startsWith("http://") && !urlParam.startsWith("https://")) {
      return NextResponse.redirect(new URL(urlParam, request.url));
    }

    if (!urlParam.includes("cloudinary.com")) {
      return NextResponse.redirect(urlParam);
    }

    const match = urlParam.match(/cloudinary\.com\/[^/]+\/([^/]+)\/upload\/(?:v\d+\/)?(.+)/);
    if (!match) {
      return NextResponse.redirect(urlParam);
    }

    const resourceType = match[1];
    const publicId = match[2];
    const ext = path.extname(publicId) || "";

    const format = ext.replace(".", "");
    const downloadUrl = cloudinary.utils.private_download_url(publicId, format, {
      resource_type: resourceType,
      type: "upload",
      expires_at: Math.floor(Date.now() / 1000) + 600
    });

    const cloudinaryResponse = await fetch(downloadUrl);
    if (!cloudinaryResponse.ok) {
      console.error(`Cloudinary API returned ${cloudinaryResponse.status} for ${downloadUrl}`);

      return NextResponse.redirect(urlParam);
    }

    const buffer = await cloudinaryResponse.arrayBuffer();
    const contentType = cloudinaryResponse.headers.get("content-type") || "application/pdf";
    const filename = path.basename(publicId);
    const contentDisposition = `inline; filename="${filename}"`;

    return new NextResponse(Buffer.from(buffer), {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": contentDisposition,
        "Cache-Control": "public, max-age=3600"
      }
    });

  } catch (error) {
    console.error("PDF download proxy error:", error);
    return NextResponse.json({ success: false, message: "Failed to process and serve download link." }, { status: 500 });
  }
}
