import { NextRequest, NextResponse } from "next/server";

interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  linkedin: string;
  visas: string[];
  resume: string;
  message: string;
  status: "PENDING" | "REACHED_OUT";
}

let leads: LeadData[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

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

    const newLead: LeadData = { ...body, status: "PENDING" };
    leads.push(newLead);

    return NextResponse.json(
      { message: "Lead submitted successfully", lead: newLead },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// Fetch all leads (GET)
export async function GET() {
  return NextResponse.json(leads, { status: 200 });
}

// Handle lead status update (PATCH)
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, status } = body;

    if (!email || !status) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Find lead by email and update status
    const leadIndex = leads.findIndex((lead) => lead.email === email);
    if (leadIndex === -1) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    leads[leadIndex].status = status;

    return NextResponse.json(
      { message: "Lead status updated", lead: leads[leadIndex] },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
