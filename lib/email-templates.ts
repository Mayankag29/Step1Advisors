import { PRODUCT_NAME, CONTACT_EMAIL, SITE_URL } from "./config";
import type { InquiryRecord } from "./db";
import { formatUtcDateTime } from "./date";

export function getConfirmationEmailHtml(data: {
  full_name: string;
  company_name: string;
  service_of_interest: string;
}): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Diagnostic Inquiry Confirmation</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FAF8F5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #17140F; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #FAF8F5; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #FFFFFF; border-radius: 16px; border: 1px solid #E9E1D1; box-shadow: 0 4px 16px rgba(23, 20, 15, 0.04); overflow: hidden;" cellspacing="0" cellpadding="0">
          <tr>
            <td style="background-color: #17140F; padding: 32px 36px; text-align: left;">
              <span style="font-family: Georgia, 'Times New Roman', serif; font-size: 24px; color: #FAF8F5; letter-spacing: -0.5px; font-weight: 600;">
                Step 1 <span style="color: #C79A5C;">Advisors</span>
              </span>
              <p style="margin: 6px 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: rgba(244, 239, 228, 0.55);">
                Audit-Grade Discipline · CFO-Level Vision
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 36px 36px 28px;">
              <h1 style="margin: 0 0 16px; font-family: Georgia, 'Times New Roman', serif; font-size: 24px; font-weight: 500; color: #17140F; line-height: 1.3;">
                Thank you, ${escapeHtml(data.full_name)}.
              </h1>
              <p style="margin: 0 0 20px; font-size: 15px; line-height: 1.6; color: rgba(23, 20, 15, 0.78);">
                We have received your diagnostic inquiry for <strong>${escapeHtml(data.company_name)}</strong> regarding <strong>${escapeHtml(data.service_of_interest)}</strong>.
              </p>
              <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.6; color: rgba(23, 20, 15, 0.78);">
                One of our managing partners (CA Kshitij or CA Mayank) will personally review your details and reach out within <strong>one business day</strong> with technical feedback and calendar coordination — no sales pitch deck, just your books and our read on them.
              </p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 24px 0; background-color: #FAF8F5; border: 1px solid #E9E1D1; border-radius: 12px; padding: 18px 20px;">
                <tr>
                  <td>
                    <p style="margin: 0 0 10px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: #C79A5C; font-weight: 700;">
                      Inquiry Summary
                    </p>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size: 14px; line-height: 1.6;">
                      <tr>
                        <td width="30%" style="color: rgba(23, 20, 15, 0.5); padding: 4px 0;">Company:</td>
                        <td width="70%" style="color: #17140F; font-weight: 600; padding: 4px 0;">${escapeHtml(data.company_name)}</td>
                      </tr>
                      <tr>
                        <td width="30%" style="color: rgba(23, 20, 15, 0.5); padding: 4px 0;">Service:</td>
                        <td width="70%" style="color: #17140F; font-weight: 600; padding: 4px 0;">${escapeHtml(data.service_of_interest)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <p style="margin: 28px 0 0; font-size: 14px; line-height: 1.6; color: rgba(23, 20, 15, 0.7);">
                In the meantime, feel free to reply directly to this email if you have specific deadlines or time-sensitive documentation.
              </p>
              <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #E9E1D1;">
                <p style="margin: 0; font-weight: 600; font-size: 14px; color: #17140F;">The Partner Office</p>
                <p style="margin: 3px 0 0; font-size: 13px; color: rgba(23, 20, 15, 0.6);">${PRODUCT_NAME}</p>
                <p style="margin: 2px 0 0; font-size: 12px; color: #C79A5C;">Gurugram · London · Global Deliveries</p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background-color: #FAF8F5; padding: 20px 36px; border-top: 1px solid #E9E1D1; font-size: 12px; color: rgba(23, 20, 15, 0.45); text-align: center;">
              © 2026 ${PRODUCT_NAME} · <a href="${SITE_URL}" style="color: #C79A5C; text-decoration: none;">step1advisors.com</a> · <a href="mailto:${CONTACT_EMAIL}" style="color: #C79A5C; text-decoration: none;">${CONTACT_EMAIL}</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function getAdminAlertEmailHtml(inquiry: InquiryRecord): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>New Diagnostic Lead</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FAF8F5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #17140F;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding: 30px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 580px; background-color: #FFFFFF; border-radius: 14px; border: 1px solid #E9E1D1; overflow: hidden;" cellspacing="0" cellpadding="0">
          <tr>
            <td style="background-color: #17140F; padding: 22px 28px;">
              <span style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; color: #C79A5C; font-weight: 700;">
                New Lead Alert
              </span>
              <h2 style="margin: 6px 0 0; font-size: 20px; color: #FFFFFF; font-weight: 600;">
                ${escapeHtml(inquiry.company_name)} — ${escapeHtml(inquiry.service_of_interest)}
              </h2>
            </td>
          </tr>
          <tr>
            <td style="padding: 28px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size: 14px; line-height: 1.8;">
                <tr>
                  <td width="35%" style="color: rgba(23, 20, 15, 0.5); font-weight: 500;">Contact Name:</td>
                  <td width="65%" style="color: #17140F; font-weight: 600;">${escapeHtml(inquiry.full_name)}</td>
                </tr>
                <tr>
                  <td style="color: rgba(23, 20, 15, 0.5); font-weight: 500;">Company:</td>
                  <td style="color: #17140F; font-weight: 600;">${escapeHtml(inquiry.company_name)}</td>
                </tr>
                <tr>
                  <td style="color: rgba(23, 20, 15, 0.5); font-weight: 500;">Work Email:</td>
                  <td>
                    <a href="mailto:${escapeHtml(inquiry.work_email)}" style="color: #C79A5C; font-weight: 600; text-decoration: none;">
                      ${escapeHtml(inquiry.work_email)}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="color: rgba(23, 20, 15, 0.5); font-weight: 500;">Service:</td>
                  <td style="color: #17140F; font-weight: 600;">${escapeHtml(inquiry.service_of_interest)}</td>
                </tr>
                <tr>
                  <td style="color: rgba(23, 20, 15, 0.5); font-weight: 500;">Received:</td>
                  <td style="color: rgba(23, 20, 15, 0.7);">${formatUtcDateTime(inquiry.created_at)}</td>
                </tr>
              </table>

              <div style="margin-top: 20px; padding: 16px; background-color: #FAF8F5; border-radius: 10px; border: 1px solid #E9E1D1;">
                <p style="margin: 0 0 6px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(23, 20, 15, 0.5); font-weight: 700;">
                  Message / Context:
                </p>
                <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #17140F; white-space: pre-wrap;">
                  ${inquiry.message ? escapeHtml(inquiry.message) : "(No message provided)"}
                </p>
              </div>

              <div style="margin-top: 24px; text-align: center;">
                <a href="mailto:${escapeHtml(inquiry.work_email)}?subject=${encodeURIComponent(`Re: Step 1 Advisors — Discovery Call for ${inquiry.company_name}`)}" style="display: inline-block; background-color: #C79A5C; color: #17140F; font-weight: 600; font-size: 13px; padding: 12px 24px; border-radius: 9999px; text-decoration: none;">
                  Reply Directly to Lead →
                </a>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function getDailyDigestEmailHtml(
  inquiries: InquiryRecord[],
  dateStr: string
): string {
  const count = inquiries.length;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Daily Inquiries Digest</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FAF8F5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #17140F;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding: 30px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 640px; background-color: #FFFFFF; border-radius: 14px; border: 1px solid #E9E1D1; overflow: hidden;" cellspacing="0" cellpadding="0">
          <tr>
            <td style="background-color: #17140F; padding: 24px 30px;">
              <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #C79A5C; font-weight: 700;">
                Automated Daily Digest
              </span>
              <h2 style="margin: 6px 0 0; font-size: 20px; color: #FFFFFF; font-weight: 600;">
                Daily Leads Report — ${escapeHtml(dateStr)}
              </h2>
            </td>
          </tr>
          <tr>
            <td style="padding: 28px;">
              <p style="margin: 0 0 18px; font-size: 15px; color: #17140F;">
                <strong>${count}</strong> new ${count === 1 ? "inquiry was" : "inquiries were"} recorded over the past 24 hours.
              </p>

              <p style="margin: 0 0 20px; font-size: 13px; color: rgba(23, 20, 15, 0.65);">
                The complete formatted <strong>.xlsx spreadsheet</strong> is attached to this email.
              </p>

              ${
                count > 0
                  ? `<table role="presentation" width="100%" cellspacing="0" cellpadding="8" style="font-size: 12px; border-collapse: collapse; margin-top: 14px;">
                      <thead>
                        <tr style="background-color: #FAF8F5; border-bottom: 2px solid #E9E1D1; text-align: left;">
                          <th style="padding: 8px 10px; color: rgba(23, 20, 15, 0.6);">Name</th>
                          <th style="padding: 8px 10px; color: rgba(23, 20, 15, 0.6);">Company</th>
                          <th style="padding: 8px 10px; color: rgba(23, 20, 15, 0.6);">Service</th>
                          <th style="padding: 8px 10px; color: rgba(23, 20, 15, 0.6);">Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${inquiries
                          .map(
                            (inq) => `
                          <tr style="border-bottom: 1px solid #E9E1D1;">
                            <td style="padding: 8px 10px; font-weight: 600; color: #17140F;">${escapeHtml(inq.full_name)}</td>
                            <td style="padding: 8px 10px; color: #17140F;">${escapeHtml(inq.company_name)}</td>
                            <td style="padding: 8px 10px; color: #C79A5C; font-weight: 500;">${escapeHtml(inq.service_of_interest)}</td>
                            <td style="padding: 8px 10px;"><a href="mailto:${escapeHtml(inq.work_email)}" style="color: #17140F; text-decoration: none;">${escapeHtml(inq.work_email)}</a></td>
                          </tr>
                        `
                          )
                          .join("")}
                      </tbody>
                    </table>`
                  : `<div style="padding: 20px; background-color: #FAF8F5; border-radius: 8px; text-align: center; color: rgba(23, 20, 15, 0.5);">
                      No new inquiries received in the last 24 hours.
                    </div>`
              }

              <div style="margin-top: 28px; padding-top: 18px; border-top: 1px solid #E9E1D1; font-size: 11px; color: rgba(23, 20, 15, 0.45);">
                Automated report generated by ${PRODUCT_NAME} system.
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
