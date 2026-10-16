import { NextRequest, NextResponse } from "next/server";
import { getInquiriesForPastDay } from "@/lib/db";
import { generateInquiriesExcelBuffer } from "@/lib/excel";
import { sendEmail } from "@/lib/email";
import { reportError } from "@/lib/logger";
import { getDailyDigestEmailHtml } from "@/lib/email-templates";

export async function GET(req: NextRequest) {
  const expectedSecret = process.env.CRON_SECRET;
  if (!expectedSecret) {
    await reportError({
      action: "Daily Digest Cron Configuration",
      error: "CRON_SECRET environment variable is not configured.",
    });
    return NextResponse.json(
      { error: "CRON_SECRET environment variable is not configured." },
      { status: 500 }
    );
  }

  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${expectedSecret}`) {
    return NextResponse.json(
      { error: "Unauthorized. This endpoint is strictly private." },
      { status: 401 }
    );
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    await reportError({
      action: "Daily Digest Cron Configuration",
      error: "ADMIN_EMAIL environment variable is not configured.",
    });
    return NextResponse.json(
      { error: "ADMIN_EMAIL environment variable is not configured." },
      { status: 500 }
    );
  }

  try {
    const inquiries = await getInquiriesForPastDay();

    const now = new Date();
    const dateFormatted = now.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const fileDate = now.toISOString().split("T")[0];

    const excelBuffer = await generateInquiriesExcelBuffer(inquiries);

    const emailResult = await sendEmail({
      to: adminEmail,
      subject: `Daily Inquiries Digest — ${dateFormatted} (${inquiries.length} leads)`,
      html: getDailyDigestEmailHtml(inquiries, dateFormatted),
      attachments: [
        {
          filename: `Step1_Inquiries_${fileDate}.xlsx`,
          content: excelBuffer,
        },
      ],
    });

    if (!emailResult.success) {
      await reportError({
        action: "Daily Digest Email Delivery",
        payload: { count: inquiries.length, fileDate },
        error: emailResult.error || "Failed to send digest email",
      });
    }

    return NextResponse.json({
      success: true,
      count: inquiries.length,
      emailSent: emailResult.success,
      timestamp: now.toISOString(),
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("[Daily Digest Cron Error]:", errorMsg);

    await reportError({
      action: "Daily Digest Execution Failure",
      error: err,
    });

    return NextResponse.json(
      { success: false, error: errorMsg },
      { status: 500 }
    );
  }
}
