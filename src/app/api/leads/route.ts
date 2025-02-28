import { NextRequest, NextResponse } from "next/server";

interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  linkedin: string;
  visas: string[];
  resume: string;
  message: string;
}

const leads: LeadData[] = []; // Temporary in-memory storage

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Basic validation
    if (
      !body.firstName ||
      !body.lastName ||
      !body.email ||
      !body.linkedin ||
      !body.message
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save lead
    leads.push(body);

    return NextResponse.json(
      { message: "Lead submitted successfully", lead: body },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(leads, { status: 200 });
}
