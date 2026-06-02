import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const TOKEN = process.env.AIRTABLE_TOKEN;
const BASE_ID = process.env.AIRTABLE_BASE_ID;
const CLIENTS_TABLE = process.env.AIRTABLE_CLIENTS_TABLE ?? "Clients";
const CASES_TABLE = process.env.AIRTABLE_CASES_TABLE ?? "Cases";
const DOCS_FIELD_ID = process.env.AIRTABLE_DOCS_FIELD ?? "";

function safeFilename(name: string): string {
  const ext = name.match(/\.[^.]+$/)?.[0] ?? "";
  const base = name
    .replace(/\.[^.]+$/, "")        // strip extension
    .replace(/[^\x20-\x7E]/g, "")   // strip non-ASCII (™, ©, emoji, etc.)
    .replace(/\s+/g, " ")
    .trim() || "document";
  return base + ext;
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

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

// Returns true on success, false on failure (caller decides fallback).
// Tries both known URL formats for the Content Upload API.
async function uploadToAirtable(recordId: string, file: File): Promise<boolean> {
  if (!DOCS_FIELD_ID) return false;

  // Airtable Content Upload API has two documented URL formats — try both.
  const candidates = [
    // Format 1: without table ID (most common in recent docs)
    `https://content.airtable.com/v0/${BASE_ID}/${recordId}/${DOCS_FIELD_ID}/uploadAttachment`,
    // Format 2: with table ID (older docs)
    `https://content.airtable.com/v0/${BASE_ID}/${CASES_TABLE}/${recordId}/${DOCS_FIELD_ID}/uploadAttachment`,
  ];

  for (const url of candidates) {
    const fd = new FormData();
    fd.append("file", file, safeFilename(file.name));

    const res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${TOKEN}` },
      body: fd,
    });

    if (res.ok) {
      console.log(`[intake] uploaded "${file.name}" via ${url}`);
      return true;
    }

    const text = await res.text();
    console.log(`[intake] "${file.name}" failed (${res.status}) at ${url}: ${text}`);
  }

  return false;
}

async function emailFiles(
  files: File[],
  clientName: string,
  company: string,
  email: string,
  phone: string,
  caseId: string,
  clientId: string,
) {
  const attachments = await Promise.all(
    files.map(async (f) => ({
      filename: f.name,
      content: Buffer.from(await f.arrayBuffer()),
      contentType: f.type || "application/octet-stream",
    })),
  );

  await transporter.sendMail({
    from: `"HSII Intake" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    subject: `[INTAKE DOCS] ${clientName} — ${company} | Case: ${caseId}`,
    text: [
      `Intake documents received (Airtable upload unavailable — files attached here).`,
      ``,
      `Client:   ${clientName}`,
      `Company:  ${company}`,
      `Email:    ${email}`,
      `Phone:    ${phone}`,
      ``,
      `Airtable Case ID:   ${caseId}`,
      `Airtable Client ID: ${clientId}`,
      ``,
      `Files: ${files.map((f) => f.name).join(", ")}`,
    ].join("\n"),
    attachments,
  });
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
    const files = formData
      .getAll("docs")
      .filter((f): f is File => f instanceof File && f.size > 0);

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

    // 3. Upload files — try Airtable direct upload first, fall back to email
    if (files.length > 0) {
      const results = await Promise.all(
        files.map((f) => uploadToAirtable(caseRecord.id, f)),
      );

      const failedFiles = files.filter((_, i) => !results[i]);

      if (failedFiles.length > 0) {
        console.log(
          `[intake] ${failedFiles.length} file(s) failed Airtable upload — sending by email`,
        );
        await emailFiles(
          failedFiles,
          clientName,
          company,
          email,
          phone,
          caseRecord.id,
          client.id,
        );
      }
    }

    return NextResponse.json({ success: true, caseId: caseRecord.id });
  } catch (err) {
    console.error("[intake] submission error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Submission failed. Please try again." },
      { status: 500 },
    );
  }
}
