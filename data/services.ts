export interface ServicePractice {
  id: string;
  number: string;
  title: string;
  heroTitle: string;
  heroSubtitle: string;
  pitch: string;
  whoItFits: string;
  deliverables: string[];
  outcome: string;
  independenceDisclaimer?: string;
}

export const SERVICES: ServicePractice[] = [
  {
    id: "fractional-cfo",
    number: "01",
    title: "Fractional CFO",
    heroTitle: "Fractional CFO",
    heroSubtitle: "Strategy & Board Reporting",
    pitch: "A finance lead who sits in your leadership meetings, not a report you skim once a month.",
    whoItFits:
      "Companies past $1.5M ARR $0M ARR that need high-conviction financial leadership to scale sustainably—without the $300k+ commitment of a full-time executive.",
    deliverables: [
      "Monthly board & investor reporting packages",
      "13-week cash flow and runway modeling",
      "Budget vs. actuals and departmental variance reviews",
      "Fundraise support — data room, cap table hygiene, diligence answers",
      "Pricing, unit economics, and margin analysis",
    ],
    outcome: "A CFO-grade decision partner for the cost of one senior hire's benefits package.",
  },
  {
    id: "gaap-advisory",
    number: "02",
    title: "GAAP Advisory",
    heroTitle: "Technical GAAP Accounting",
    heroSubtitle: "Revenue Recognition & Memos",
    pitch: "Technical accounting for US GAAP, IFRS, and Ind AS — written so your auditors stop asking follow-up questions.",
    whoItFits: "Companies converting standards, or hitting technical transactions their bookkeeper has never seen.",
    deliverables: [
      "Revenue recognition memos (ASC 606 / IFRS 15)",
      "Lease accounting under ASC 842 / IFRS 16 / Ind AS 116",
      "Stock compensation and Share Based Payments (IFRS 2/ASC 718)",
      "Business combination and purchase price allocation support",
      "Policy documentation for first-time audits or standard conversions",
    ],
    outcome: "A defensible accounting position, documented before your auditor has to ask for it.",
  },
  {
    id: "accounting-advisory",
    number: "03",
    title: "Strategic Remote Accounting & Advisory",
    heroTitle: "Controller & Bookkeeping",
    heroSubtitle: "Monthly Close & AP/AR",
    pitch: "The monthly close, run by people who also read the numbers once they're closed.",
    whoItFits: "Teams who aren't ready to build an in-house accounting department.",
    deliverables: [
      "Full-cycle bookkeeping and monthly close, done inside your existing stack",
      "AP, AR, and payroll coordination with existing vendors",
      "KPI dashboards tied to the metrics your board actually asks about",
      "Systems and process design as headcount and entities multiply",
      "Multi-entity and multi-currency consolidation",
    ],
    outcome: "A close that lands by the 10th business day, with someone who can explain every line to your board.",
  },
  {
    id: "audit-assurance",
    number: "04",
    title: "Audit liaison & readiness",
    heroTitle: "Audit liaison & readiness",
    heroSubtitle: "GAAS Audits & SOC Readiness",
    pitch: "Financial statement audits and reviews performed under standards your investors already trust.",
    whoItFits: "Companies with a lender, investor, or board covenant requiring audited or reviewed financials.",
    deliverables: [
      "Financial statement audits and reviews under GAAS",
      "SOC readiness assessments",
      "Employee benefit plan audits",
      "Agreed-upon procedures for lenders and acquirers",
      "Going-concern and internal control evaluations",
    ],
    outcome: "An opinion delivered on schedule, from a team that scoped the engagement instead of discovering it mid-fieldwork.",
  },
];

export interface HeroServiceItem {
  id: string;
  title: string;
  subtitle: string;
  status: string;
}

export const HERO_SERVICES: HeroServiceItem[] = [
  {
    id: "fractional-cfo",
    title: "Fractional CFO",
    subtitle: "Strategy & Board Reporting",
    status: "Available",
  },
  {
    id: "accounting-advisory",
    title: "Controller & Bookkeeping",
    subtitle: "Monthly Close & AP/AR",
    status: "Available",
  },
  {
    id: "gaap-advisory",
    title: "Technical GAAP Advisory",
    subtitle: "Revenue Recognition & Memos",
    status: "Available",
  },
  {
    id: "audit-assurance",
    title: "Audit liaison & readiness",
    subtitle: "Audits & SOC Readiness",
    status: "Available",
  },
];
