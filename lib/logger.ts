import fs from "fs";
import path from "path";
import { sendEmail } from "./email";
import { formatUtcDateTime } from "./date";

export interface ErrorReportContext {
  action: string;
  payload?: Record<string, unknown> | null;
  error: unknown;
}

function writeToLocalLogFile(filename: string, content: string): void {
  const localDir = path.join(process.cwd(), "logs");

  try {
    if (!fs.existsSync(/*turbopackIgnore: true*/ localDir)) {
      fs.mkdirSync(/*turbopackIgnore: true*/ localDir, { recursive: true });
    }
    fs.appendFileSync(
      /*turbopackIgnore: true*/ path.join(localDir, filename),
      content,
      "utf8"
    );
    return;
  } catch {
    try {
      const tmpDir = path.join("/tmp", "logs");
      if (!fs.existsSync(/*turbopackIgnore: true*/ tmpDir)) {
        fs.mkdirSync(/*turbopackIgnore: true*/ tmpDir, { recursive: true });
      }
      fs.appendFileSync(
        /*turbopackIgnore: true*/ path.join(tmpDir, filename),
        content,
        "utf8"
      );
    } catch {
      console.error(`[CRITICAL FALLBACK LOG]: ${content}`);
    }
  }
}

export function logErrorLocally(
  context: ErrorReportContext,
  emailErrorReason?: string
): void {
  const timestamp = new Date().toISOString();
  const errorMessage =
    context.error instanceof Error
      ? context.error.message
      : String(context.error);
  const errorStack =
    context.error instanceof Error ? context.error.stack : undefined;

  const logEntry = {
    timestamp,
    action: context.action,
    error: errorMessage,
    stack: errorStack,
    payload: context.payload || null,
    emailAlertFailure: emailErrorReason || null,
  };

  const line = JSON.stringify(logEntry) + "\n";
  writeToLocalLogFile("errors.log", line);
  console.error(`[Error Logged to Local Directory]:`, errorMessage);
}

export async function reportError(context: ErrorReportContext): Promise<void> {
  const adminEmail = process.env.ADMIN_EMAIL;
  const errorMessage =
    context.error instanceof Error
      ? context.error.message
      : String(context.error);
  const errorStack =
    context.error instanceof Error ? context.error.stack : "";

  if (!adminEmail) {
    logErrorLocally(context, "ADMIN_EMAIL environment variable is not defined");
    return;
  }

  const payloadHtml = context.payload
    ? `<div style="margin-top: 16px; background-color: #FAF8F5; border: 1px solid #E9E1D1; border-radius: 8px; padding: 14px;">
        <strong style="font-size: 11px; text-transform: uppercase; color: #17140F;">Data Payload Context:</strong>
        <pre style="margin: 6px 0 0; font-size: 12px; color: #17140F; white-space: pre-wrap; font-family: monospace;">${escapeHtml(
          JSON.stringify(context.payload, null, 2)
        )}</pre>
      </div>`
    : "";

  const stackHtml = errorStack
    ? `<div style="margin-top: 14px; background-color: #FFF5F5; border: 1px solid #FED7D7; border-radius: 8px; padding: 12px;">
        <strong style="font-size: 11px; text-transform: uppercase; color: #C53030;">Stack Trace:</strong>
        <pre style="margin: 6px 0 0; font-size: 11px; color: #9B2C2C; white-space: pre-wrap; overflow-x: auto; font-family: monospace;">${escapeHtml(
          errorStack
        )}</pre>
      </div>`
    : "";

  const emailHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>System Error Alert</title>
</head>
<body style="margin: 0; padding: 24px; background-color: #FAF8F5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #17140F;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #E9E1D1; border-radius: 12px; padding: 28px; box-shadow: 0 4px 14px rgba(23, 20, 15, 0.05);">
    <div style="border-bottom: 2px solid #E53E3E; padding-bottom: 12px; margin-bottom: 16px;">
      <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #E53E3E; font-weight: 700;">
        System Error Alert
      </span>
      <h2 style="margin: 4px 0 0; font-size: 18px; color: #17140F;">
        Action Failed: ${escapeHtml(context.action)}
      </h2>
      <p style="margin: 4px 0 0; font-size: 12px; color: rgba(23, 20, 15, 0.5);">
        Occurred at ${formatUtcDateTime(new Date())}
      </p>
    </div>

    <div style="background-color: #FFF5F5; border-left: 4px solid #E53E3E; padding: 12px 16px; margin: 16px 0;">
      <p style="margin: 0; font-weight: 600; font-size: 14px; color: #C53030;">Error Message:</p>
      <p style="margin: 4px 0 0; font-size: 13px; color: #17140F; font-family: monospace;">
        ${escapeHtml(errorMessage)}
      </p>
    </div>

    ${payloadHtml}
    ${stackHtml}
  </div>
</body>
</html>`;

  try {
    const emailResult = await sendEmail({
      to: adminEmail,
      subject: `[Error Alert] ${context.action} — ${errorMessage.substring(0, 45)}`,
      html: emailHtml,
    });

    if (!emailResult.success) {
      logErrorLocally(
        context,
        `Email alert failed: ${emailResult.error || "Unknown error"}`
      );
    }
  } catch (sendErr: unknown) {
    const errText = sendErr instanceof Error ? sendErr.message : String(sendErr);
    logErrorLocally(context, `Email sending threw exception: ${errText}`);
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
