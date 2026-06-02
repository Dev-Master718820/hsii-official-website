import { NextRequest, NextResponse } from "next/server";

const TOKEN = process.env.AIRTABLE_TOKEN;
const BASE_ID = process.env.AIRTABLE_BASE_ID;
const CLIENTS_TABLE = process.env.AIRTABLE_CLIENTS_TABLE ?? "Clients";
const CASES_TABLE = process.env.AIRTABLE_CASES_TABLE ?? "Cases";

function airtableUrl(table: string) {
  return `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(table)}`;
}

async function createRecord(table: string, fields: Record<string, unknown>) {
  const res = await fetch(airtableUrl(table), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Airtable [${table}] error: ${text}`);
  }
  return (await res.json()) as { id: string };
}

export async function POST(req: NextRequest) {
  if (!TOKEN || !BASE_ID) {
    return NextResponse.json(
      { error: "Intake system is not configured. Contact us at hello@hsii.systems." },
      { status: 500 },
    );
  }

  try {
    const formData = await req.formData();

    const clientName = (formData.get("clientName") as string) ?? "";
    const company = (formData.get("company") as string) ?? "";
    const email = (formData.get("email") as string) ?? "";
    const phone = (formData.get("phone") as string) ?? "";
    const keyMetrics = (formData.get("keyMetrics") as string) ?? "";
    const frictionPoints = (formData.get("frictionPoints") as string) ?? "";

    // 1. Create Client record
    const client = await createRecord(CLIENTS_TABLE, {
      "Client Name": clientName,
      "Company": company,
      "Contact Email": email,
      "Phone Number": phone,
      "Client Status": "Prospect",
      "Source": "Website",
      "Date Added": new Date().toISOString().split("T")[0],
    });

    // 2. Create Case record
    const caseRecord = await createRecord(CASES_TABLE, {
      "Case Name": `${clientName}'s case`,
      "Linked Client": [client.id],
      "Request Type": "Website",
      "Status": "New Intake",
      "Date Received": new Date().toISOString().split("T")[0],
      "Key Metrics": keyMetrics || undefined,
      "Top Complaints / Friction Points": frictionPoints,
      "Review Status": "Awaiting Review",
    });

    return NextResponse.json({ success: true, caseId: caseRecord.id });
  } catch (err) {
    console.error("[intake] submission error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Submission failed. Please try again." },
      { status: 500 },
    );
  }
}
