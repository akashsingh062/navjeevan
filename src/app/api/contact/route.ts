import { NextResponse } from "next/server";
import { saveContactInquiry } from "@/lib/dataManager";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10).max(12),
  message: z.string().min(10, "Message must be at least 10 characters long")
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    const saved = await saveContactInquiry({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      message: validatedData.message
    });

    if (saved) {
      
      console.log(`[EMAIL SEND SIMULATION] Sending notification email to navjeevanschool2011@gmail.com for new inquiry from ${validatedData.name}.`);
      return NextResponse.json({ success: true, message: "Inquiry saved and notification queued." });
    } else {
      return NextResponse.json(
        { success: false, message: "Could not save inquiry details. Please try again." },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: error.issues[0]?.message || "Invalid input data." },
        { status: 400 }
      );
    }
    const errMsg = error instanceof Error ? error.message : "Failed to process contact submission.";
    return NextResponse.json(
      { success: false, message: errMsg },
      { status: 500 }
    );
  }
}
