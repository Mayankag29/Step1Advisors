import { Resend } from "resend";

export async function sendEmail(
  {
    to,
    subject,
    html,
    replyTo,
    attachments,
  }: {
    to: string | string[];
    subject: string;
    html: string;
    replyTo?: string;
    attachments?: Array<{
      filename: string;
      content: Buffer;
    }>;
  },
  maxRetries = 3
): Promise<{ success: boolean; id?: string; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey === "re_test_placeholder") {
    return {
      success: false,
      error: "RESEND_API_KEY is not configured in environment variables.",
    };
  }

  const sender = process.env.SENDER_EMAIL;
  if (!sender) {
    return {
      success: false,
      error: "SENDER_EMAIL is not configured in environment variables.",
    };
  }

  const resend = new Resend(apiKey);
  let lastErrorMsg = "";

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const { data, error } = await resend.emails.send({
        from: sender,
        to,
        subject,
        html,
        replyTo,
        attachments,
      });

      if (!error && data?.id) {
        return { success: true, id: data.id };
      }

      lastErrorMsg = error?.message || "Unknown email delivery failure";
    } catch (err: unknown) {
      lastErrorMsg = err instanceof Error ? err.message : String(err);
    }

    if (attempt < maxRetries) {
      await new Promise((resolve) => setTimeout(resolve, attempt * 400));
    }
  }

  console.error("[Resend Delivery Failed after Retries]:", lastErrorMsg);
  return { success: false, error: lastErrorMsg };
}
