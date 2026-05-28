import { NextResponse } from "next/server";
import { getNotices, createNotice, deleteNotice, updateNotice } from "@/lib/dataManager";
import { z } from "zod";


const noticeSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  category: z.enum(["General", "Exam", "Holiday", "Admission", "Others"]),
  isImportant: z.boolean().optional(),
  importanceColor: z.enum(["red", "amber", "green", "blue", "purple"]).optional(),
  attachmentUrl: z.string().optional().or(z.literal(""))
});

export async function GET() {
  try {
    const list = await getNotices();
    return NextResponse.json({ success: true, notices: list });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch notices." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = noticeSchema.parse(body);

    const newNotice = await createNotice({
      title: validatedData.title,
      description: validatedData.description,
      category: validatedData.category,
      isImportant: !!validatedData.isImportant,
      importanceColor: validatedData.importanceColor || "blue",
      attachmentUrl: validatedData.attachmentUrl || "",
      date: new Date().toISOString()
    });

    return NextResponse.json({ success: true, notice: newNotice }, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: error.issues[0]?.message || "Invalid input data." },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create notice." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, message: "Missing notice ID parameter." }, { status: 400 });
    }

    const success = await deleteNotice(id);
    if (success) {
      return NextResponse.json({ success: true, message: "Notice deleted successfully." });
    }
    return NextResponse.json({ success: false, message: "Notice item not found or failed to delete." }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete notice." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, message: "Missing notice ID parameter." }, { status: 400 });
    }

    const body = await request.json();
    const validatedData = noticeSchema.parse(body);

    const updatedNotice = await updateNotice(id, {
      title: validatedData.title,
      description: validatedData.description,
      category: validatedData.category,
      isImportant: !!validatedData.isImportant,
      importanceColor: validatedData.importanceColor || "blue",
      attachmentUrl: validatedData.attachmentUrl || "",
      date: new Date().toISOString()
    });

    if (updatedNotice) {
      return NextResponse.json({ success: true, notice: updatedNotice });
    }
    return NextResponse.json({ success: false, message: "Notice item not found or failed to update." }, { status: 404 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: error.issues[0]?.message || "Invalid input data." },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update notice." },
      { status: 500 }
    );
  }
}
