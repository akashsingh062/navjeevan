import { NextResponse } from "next/server";
import { getFaculty, createFacultyMember, deleteFacultyMember, updateFacultyMember } from "@/lib/dataManager";
import { z } from "zod";

const facultySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  subject: z.any().optional(),
  qualification: z.any().optional(),
  experience: z.any().optional(),
  imageUrl: z.any().optional()
});

export async function GET() {
  try {
    const list = await getFaculty();
    return NextResponse.json({ success: true, faculty: list });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to fetch faculty list." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = facultySchema.parse(body);

    const newMember = await createFacultyMember({
      name: validatedData.name,
      subject: validatedData.subject,
      qualification: validatedData.qualification ? String(validatedData.qualification) : "",
      experience: validatedData.experience ? String(validatedData.experience) : "",
      imageUrl: validatedData.imageUrl ? String(validatedData.imageUrl) : "",
      order: 99
    });

    return NextResponse.json({ success: true, member: newMember }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: error.issues[0]?.message || "Invalid input data." },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to add faculty member." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, message: "Missing faculty ID parameter." }, { status: 400 });
    }

    const success = await deleteFacultyMember(id);
    if (success) {
      return NextResponse.json({ success: true, message: "Faculty member deleted successfully." });
    }
    return NextResponse.json({ success: false, message: "Faculty member not found or failed to delete." }, { status: 404 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to delete faculty member." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, message: "Missing faculty ID parameter." }, { status: 400 });
    }

    const body = await request.json();
    const validatedData = facultySchema.parse(body);

    const updatedMember = await updateFacultyMember(id, {
      name: validatedData.name,
      subject: validatedData.subject,
      qualification: validatedData.qualification ? String(validatedData.qualification) : "",
      experience: validatedData.experience ? String(validatedData.experience) : "",
      imageUrl: validatedData.imageUrl ? String(validatedData.imageUrl) : "",
      order: 99
    });

    if (updatedMember) {
      return NextResponse.json({ success: true, member: updatedMember });
    }
    return NextResponse.json({ success: false, message: "Faculty member not found or failed to update." }, { status: 404 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: error.issues[0]?.message || "Invalid input data." },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to update faculty member." },
      { status: 500 }
    );
  }
}
