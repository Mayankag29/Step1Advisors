import ExcelJS from "exceljs";
import type { InquiryRecord } from "./db";
import { formatUtcDateTime } from "./date";

export async function generateInquiriesExcelBuffer(
  inquiries: InquiryRecord[]
): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Step 1 Advisors";
  workbook.created = new Date();

  const worksheet = workbook.addWorksheet("Inquiries", {
    views: [{ state: "frozen", ySplit: 1 }],
  });

  worksheet.columns = [
    { header: "ID", key: "id", width: 10 },
    { header: "Submission Date (UTC)", key: "created_at", width: 24 },
    { header: "Full Name", key: "full_name", width: 25 },
    { header: "Company Name", key: "company_name", width: 28 },
    { header: "Work Email", key: "work_email", width: 32 },
    { header: "Service of Interest", key: "service_of_interest", width: 34 },
    { header: "Message / Notes", key: "message", width: 50 },
  ];

  const headerRow = worksheet.getRow(1);
  headerRow.height = 28;
  headerRow.eachCell((cell) => {
    cell.font = {
      name: "Calibri",
      size: 11,
      bold: true,
      color: { argb: "FFFFFFFF" },
    };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFC79A5C" },
    };
    cell.alignment = {
      vertical: "middle",
      horizontal: "left",
      wrapText: false,
    };
    cell.border = {
      bottom: { style: "medium", color: { argb: "FFA9814A" } },
    };
  });

  inquiries.forEach((item, index) => {
    const row = worksheet.addRow({
      id: item.id,
      created_at: formatUtcDateTime(item.created_at),
      full_name: item.full_name,
      company_name: item.company_name,
      work_email: item.work_email,
      service_of_interest: item.service_of_interest,
      message: item.message || "",
    });

    row.height = 22;
    row.eachCell((cell) => {
      cell.font = { name: "Calibri", size: 10, color: { argb: "FF17140F" } };
      cell.alignment = { vertical: "middle", wrapText: false };
      if (index % 2 === 1) {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFFAF8F5" },
        };
      }
      cell.border = {
        bottom: { style: "thin", color: { argb: "FFE9E1D1" } },
      };
    });
  });

  const arrayBuffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(arrayBuffer);
}
