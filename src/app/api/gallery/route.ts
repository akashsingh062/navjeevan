import { NextResponse } from "next/server";
import { getGallery, createGalleryItem, deleteGalleryItem } from "@/lib/dataManager";
import { z } from "zod";

const gallerySchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters long"),
  category: z.string().min(1, "Category is required"),
  imageUrl: z.string().url("Please provide a valid image URL link")
});

export async function GET() {
  try {
    const list = await getGallery();
    return NextResponse.json({ success: true, gallery: list });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Failed to fetch gallery.";
    return NextResponse.json(
      { success: false, message: errMsg },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = gallerySchema.parse(body);

    const newItem = await createGalleryItem({
      title: validatedData.title,
      category: validatedData.category,
      imageUrl: validatedData.imageUrl,
      uploadedAt: new Date().toISOString()
    });

    return NextResponse.json({ success: true, item: newItem }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: error.issues[0]?.message || "Invalid input data." },
        { status: 400 }
      );
    }
    const errMsg = error instanceof Error ? error.message : "Failed to create gallery item.";
    return NextResponse.json(
      { success: false, message: errMsg },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, message: "Missing item ID parameter." }, { status: 400 });
    }

    const success = await deleteGalleryItem(id);
    if (success) {
      return NextResponse.json({ success: true, message: "Gallery photo deleted successfully." });
    }
    return NextResponse.json({ success: false, message: "Gallery item not found or failed to delete." }, { status: 404 });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Failed to delete gallery item.";
    return NextResponse.json(
      { success: false, message: errMsg },
      { status: 500 }
    );
  }
}
