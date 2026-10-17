import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL or POSTGRES_URL environment variable is not defined.");
}

export const sql = neon(databaseUrl);

export interface InquiryRecord {
  id: number;
  full_name: string;
  work_email: string;
  company_name: string;
  service_of_interest: string;
  message: string | null;
  created_at: string;
}

export async function initDatabase(): Promise<void> {
  await sql`
    CREATE TABLE IF NOT EXISTS inquiries (
      id SERIAL PRIMARY KEY,
      full_name VARCHAR(255) NOT NULL,
      work_email VARCHAR(255) NOT NULL,
      company_name VARCHAR(255) NOT NULL,
      service_of_interest VARCHAR(255) NOT NULL,
      message TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
    );
  `;
}

export async function saveInquiry(
  data: {
    full_name: string;
    work_email: string;
    company_name: string;
    service_of_interest: string;
    message: string | null;
  },
  maxRetries = 3
): Promise<InquiryRecord> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const rows = (await sql`
        INSERT INTO inquiries (
          full_name,
          work_email,
          company_name,
          service_of_interest,
          message
        )
        VALUES (
          ${data.full_name},
          ${data.work_email},
          ${data.company_name},
          ${data.service_of_interest},
          ${data.message}
        )
        RETURNING
          id,
          full_name,
          work_email,
          company_name,
          service_of_interest,
          message,
          created_at;
      `) as InquiryRecord[];

      return rows[0];
    } catch (err: unknown) {
      lastError = err;
      const errMsg = err instanceof Error ? err.message : String(err);
      if (
        errMsg.includes("does not exist") ||
        errMsg.includes("inquiries") ||
        errMsg.includes("relation")
      ) {
        try {
          await initDatabase();
        } catch {
          // ignore concurrent creation collision
        }
      }
      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 300));
      }
    }
  }

  throw lastError;
}

export async function getInquiriesForPastDay(
  maxRetries = 3
): Promise<InquiryRecord[]> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const rows = (await sql`
        SELECT
          id,
          full_name,
          work_email,
          company_name,
          service_of_interest,
          message,
          created_at
        FROM inquiries
        WHERE created_at >= NOW() - INTERVAL '24 HOURS'
        ORDER BY created_at DESC;
      `) as InquiryRecord[];

      return rows;
    } catch (err) {
      lastError = err;
      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 300));
      }
    }
  }

  throw lastError;
}
