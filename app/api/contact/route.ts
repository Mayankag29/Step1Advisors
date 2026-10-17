import { NextRequest, NextResponse } from "next/server";
import { saveInquiry } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { reportError } from "@/lib/logger";
import {
  getConfirmationEmailHtml,
  getAdminAlertEmailHtml,
} from "@/lib/email-templates";

export async function POST(req: NextRequest) {
  let requestPayload: Record<string, unknown> | null = null;

  try {
    const body = await req.json();
    requestPayload = body;
    const { name, email, company, service, message, honeypot } = body;

    if (honeypot) {
      return NextResponse.json({ success: true, message: "Received" });
    }

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Full Name is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "A valid work email address is required." },
        { status: 400 }
      );
    }

    if (!company || typeof company !== "string" || !company.trim()) {
      return NextResponse.json(
        { success: false, error: "Company name is required." },
        { status: 400 }
      );
    }

    const cleanService =
      service && typeof service === "string" && service.trim()
        ? service.trim()
        : "Not Sure Yet";

    const cleanMessage =
      message && typeof message === "string" && message.trim()
        ? message.trim()
        : null;

    let savedRecord: import("@/lib/db").InquiryRecord;

    try {
      savedRecord = await saveInquiry({
        full_name: name.trim(),
        work_email: email.trim().toLowerCase(),
        company_name: company.trim(),
        service_of_interest: cleanService,
        message: cleanMessage,
      });
    } catch (dbErr) {
      console.error("[Database Save Warning, proceeding to email dispatch]:", dbErr);
      savedRecord = {
        id: 0,
        full_name: name.trim(),
        work_email: email.trim().toLowerCase(),
        company_name: company.trim(),
        service_of_interest: cleanService,
        message: cleanMessage,
        created_at: new Date().toISOString(),
      };
    }

    const clientEmailPromise = sendEmail({
      to: savedRecord.work_email,
      subject: `We received your diagnostic inquiry — Step 1 Advisors`,
      html: getConfirmationEmailHtml({
        full_name: savedRecord.full_name,
        company_name: savedRecord.company_name,
        service_of_interest: savedRecord.service_of_interest,
      }),
    }).then(async (result) => {
      if (!result.success) {
        await reportError({
          action: "Client Confirmation Email Failed",
          payload: { work_email: savedRecord.work_email, company: savedRecord.company_name },
          error: result.error || "Failed to send client confirmation email",
        });
      }
    });

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminEmailPromise = adminEmail
      ? sendEmail({
          to: adminEmail,
          subject: `[New Inquiry] ${savedRecord.company_name} — ${savedRecord.service_of_interest}`,
          html: getAdminAlertEmailHtml(savedRecord),
          replyTo: savedRecord.work_email,
        }).then(async (result) => {
          if (!result.success) {
            await reportError({
              action: "Admin Alert Email Delivery Failed",
              payload: { lead_id: savedRecord.id, company: savedRecord.company_name },
              error: result.error || "Failed to send admin alert email",
            });
          }
        })
      : reportError({
          action: "Admin Alert Email Configuration Missing",
          payload: { lead_id: savedRecord.id },
          error: "ADMIN_EMAIL environment variable is not defined",
        });

    await Promise.allSettled([clientEmailPromise, adminEmailPromise]);

    return NextResponse.json({
      success: true,
      message: "Thank you. Your inquiry has been received.",
      id: savedRecord.id,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("[Contact API Error]:", errorMsg);

    await reportError({
      action: "Contact Form Submission Failure",
      payload: requestPayload,
      error: err,
    });

    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again or email us directly.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Data cannot be queried publicly." },
    { status: 405 }
  );
}
