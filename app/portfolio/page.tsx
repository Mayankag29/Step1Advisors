import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import { PRODUCT_NAME, PRODUCT_SHORT_NAME } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies & Representative Engagements",
  description:
    `Representative client engagements, technical accounting memorandums, and pro-forma finance operations delivered by ${PRODUCT_NAME}.`,
};

interface Engagement {
  id: string;
  clientType: string;
  scope: string;
  challenge: string;
  solution: string;
  result: string;
}

const ENGAGEMENTS: Engagement[] = [
  {
    id: "b2b-saas-series-b",
    clientType: "Enterprise B2B SaaS",
    scope: "ASC 606 Revenue Recognition",
    challenge:
      "Enterprise multi-year contracts with bespoke SLA terms and hardware add-ons were being booked on invoicing rather than delivered performance obligations, stalling Series B investor due diligence.",
    solution:
      "Built contract-by-contract revenue recognition schedules under ASC 606, drafted the technical accounting memo for external auditors, and deployed a rolling 13-week cash model.",
    result:
      "Passed Big 4 technical audit with zero restatements; Series B round closed on schedule with full board visibility.",
  },
  {
    id: "professional-services-accruals",
    clientType: "Multi-Site Professional Services Firm",
    scope: "Accrual Testing & Period-End Cut-Off Review",
    challenge:
      "Year-end accruals were being estimated top-down by the finance lead from prior-year balances, with no supporting schedules. Unbilled WIP, bonus provisions and subcontractor costs were all materially misstated, and the incoming auditors flagged cut-off as a key audit risk.",
    solution:
      "Rebuilt the accruals listing bottom-up from contracts, timesheets and post-period invoices; designed a standard accrual template with owner, basis and reversal date for every line; and performed subsequent-receipts and cut-off testing on both sides of year-end before fieldwork began.",
    result:
      "Identified and corrected £620k of over- and under-accruals before the audit started; year-end file passed first-year audit with no cut-off adjustments and a standing monthly accruals process now owned by the client’s own team.",
  },
  {
    id: "tech-scaleup-share-based-payment",
    clientType: "Venture-Backed Technology Scale-Up",
    scope: "Share-Based Payment Valuation (IFRS 2 / ASC 718)",
    challenge:
      "Three years of option grants, a growth-share scheme and an investor warrant had never been valued or expensed. Grants carried mixed vesting conditions — time-based, performance milestones and exit-linked — and the board needed audit-ready numbers ahead of a US investor’s diligence.",
    solution:
      "Built a grant-by-grant register; determined fair value at each grant date using Black-Scholes and Monte Carlo models for the market-condition awards; separated service, performance and market conditions for recognition; and drafted the technical memo covering valuation inputs, modifications and the deferred tax position.",
    result:
      "Cumulative share-based payment charge of £2.1M booked and reconciled to the cap table; valuation memo accepted by the auditors without challenge, and investor diligence closed with no accounting findings.",
  },
  {
    id: "cross-border-group-consolidation",
    clientType: "Cross-Border Group with Five Subsidiaries",
    scope: "Consolidation Testing & Intercompany Elimination Review",
    challenge:
      "Group accounts were consolidated in spreadsheets with manual eliminations. Intercompany balances disagreed by £1.8M across entities, translation reserves had not been reconciled for two years, and a 60%-owned joint venture was being fully consolidated with no non-controlling interest.",
    solution:
      "Re-performed the consolidation from entity trial balances; agreed and eliminated every intercompany balance and transaction with a matched confirmation pack; recalculated FX translation under IAS 21 and rebuilt the CTA reserve; and corrected the JV treatment with NCI measured at acquisition.",
    result:
      "Consolidation tied out to the penny across all entities; £1.8M of intercompany differences resolved and the restated translation reserve agreed by the auditors; group now closes consolidated accounts within 12 business days using a controlled elimination template.",
  },
];

const WORKING_PAPERS = [
  {
    title: "ASC 606 Revenue Recognition Cut-off Working Paper",
    category: "Technical Accounting Memo",
    fileUrl: "/Templates/Revenue_Cutoff_Audit_Testing_and_Manager_Review.xlsx",
    fileName: "Revenue_Cutoff_Audit_Testing_and_Manager_Review.xlsx",
  },
  {
    title: "IFRS 16 Lease Accounting Model",
    category: "CFO Pro-Forma Model",
    fileUrl: "/Templates/Lease_Accounting_IFRS16_Audit_Workpaper.xlsx",
    fileName: "Lease_Accounting_IFRS16_Audit_Workpaper.xlsx",
  },
  {
    title: "Lease calculator",
    category: "Audit Readiness Tool",
    fileUrl: "/Templates/IFRS16_Lease_Calculator.xlsx",
    fileName: "IFRS16_Lease_Calculator.xlsx",
  },
  {
    title: "Impairment Testing Model",
    category: "Strategic Accounting and Advisory",
    fileUrl: "/Templates/Impairment_Testing_Audit_Workpaper.xlsx",
    fileName: "Impairment_Testing_Audit_Workpaper.xlsx",
  },
];

export default function PortfolioPage() {
  return (
    <>
      <Header />
      <main className="bg-background px-4 sm:px-8 pt-32 pb-16 sm:pt-36 lg:pt-40 lg:pb-24">
        <div className="mx-auto w-full max-w-5xl">
          <div className="border-b border-border pb-12">
            <p className="font-display text-xs sm:text-sm uppercase tracking-[0.25em] text-secondary font-medium">
              Track Record &amp; Case Dossiers
            </p>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl font-medium tracking-tight text-foreground">
              Representative Engagements.
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground/65">
              A selection of financial leadership, technical GAAP advisory, and audit-readiness engagements delivered for founder-led and cross-border companies.
            </p>
          </div>

          <div className="mt-12 grid gap-10">
            {ENGAGEMENTS.map((eng, idx) => (
              <div
                key={eng.id}
                className="rounded-2xl border border-foreground/10 bg-muted/40 p-8 transition-all hover:border-secondary/40 hover:bg-muted/70 sm:p-10"
              >
                <div className="flex flex-col justify-between gap-3 border-b border-border pb-6 sm:flex-row sm:items-center">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
                      Case Study 0{idx + 1}
                    </span>
                    <h2 className="mt-1 font-display text-2xl text-foreground">
                      {eng.scope}
                    </h2>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-sm font-medium text-accent">{eng.clientType}</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-foreground/40">
                      The Challenge
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                      {eng.challenge}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                      {PRODUCT_SHORT_NAME} Solution
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                      {eng.solution}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-secondary">
                      The Outcome
                    </p>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-foreground">
                      {eng.result}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 border-t border-border pt-16">
            <p className="font-display text-sm uppercase tracking-[0.25em] text-secondary">
              Working Papers &amp; Deliverables
            </p>
            <h2 className="mt-3 font-display text-3xl tracking-tight text-foreground">
              Pro-Forma Workpapers &amp; Models.
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-foreground/60">
              Representative examples of the documentation and models delivered during an engagement.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {WORKING_PAPERS.map((wp) => (
                <div
                  key={wp.title}
                  className="flex flex-col justify-between rounded-xl border border-foreground/10 bg-background p-6 transition-all hover:border-secondary/50 hover:shadow-xs"
                >
                  <div>
                    <span className="text-xs font-medium uppercase tracking-wider text-accent">
                      {wp.category}
                    </span>
                    <h3 className="mt-2 font-display text-lg text-foreground">
                      {wp.title}
                    </h3>
                  </div>
                  <div className="mt-6">
                    <a
                      href={wp.fileUrl}
                      download={wp.fileName}
                      className="inline-flex items-center text-xs font-semibold text-secondary transition-colors hover:underline"
                    >
                      Download Template →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 rounded-2xl border border-secondary/40 bg-foreground p-8 text-center text-background">
            <h3 className="font-display text-2xl text-background">
              Scope an engagement for your business.
            </h3>
            <p className="mx-auto mt-2 max-w-lg text-sm text-background/65">
              Whether you need fractional CFO guidance, audit readiness, or full-cycle controller services, we scope fixed retainers before work starts.
            </p>
            <Button href="/#contact" variant="primary" size="md" className="mt-6">
              Book Discovery Call
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
