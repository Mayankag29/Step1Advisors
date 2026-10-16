import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import { PRODUCT_NAME, PRODUCT_SHORT_NAME } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio & Representative Engagements",
  description:
    `Representative client engagements, technical accounting memorandums, and pro-forma finance operations delivered by ${PRODUCT_NAME}.`,
};

interface Engagement {
  id: string;
  clientType: string;
  scope: string;
  scale: string;
  challenge: string;
  solution: string;
  result: string;
}

const ENGAGEMENTS: Engagement[] = [
  {
    id: "b2b-saas-series-b",
    clientType: "Enterprise B2B SaaS",
    scale: "$18M ARR · 85 Headcount",
    scope: "Fractional CFO & ASC 606 Revenue Recognition",
    challenge:
      "Enterprise multi-year contracts with bespoke SLA terms and hardware add-ons were being booked on invoicing rather than delivered performance obligations, stalling Series B investor due diligence.",
    solution:
      "Built contract-by-contract revenue recognition schedules under ASC 606, drafted the technical accounting memo for external auditors, and deployed a rolling 13-week cash model.",
    result:
      "Passed Big 4 technical audit with zero restatements; Series B round closed on schedule with full board visibility.",
  },
  {
    id: "cross-border-uk-us",
    clientType: "Cross-Border Healthtech Group",
    scale: "Dual Entities: UK Parent + US Operating Subsidiary",
    scope: "Multi-Entity Controller & FRS 102 ↔ US GAAP Conversion",
    challenge:
      "Monthly close took 28 business days due to fragmented bookkeepers in London and New York. Intercompany balances and currency translations had not been reconciled for 9 months.",
    solution:
      "Unified the chart of accounts inside existing software, established standard transfer pricing reconciliations, and instituted a synchronized Day 9 close calendar.",
    result:
      "Close cycle reduced from 28 days to 9 business days; reconciled $4.2M in intercompany balances without tax exposure.",
  },
  {
    id: "fintech-audit-liaison",
    clientType: "Fintech & Payments Platform",
    scale: "$120M Annual Transaction Volume",
    scope: "Audit Liaison & Readiness (GAAS & SOC 1)",
    challenge:
      "Facing their first statutory financial statement audit alongside a SOC 1 Type II readiness assessment for enterprise banking partners.",
    solution:
      "Managed the entire PBC (Provided by Client) list, prepared safeguarding reserve reconciliations, and held weekly technical liaison calls with the audit partner.",
    result:
      "Audit concluded within 6 weeks of fieldwork; SOC 1 readiness achieved with zero material weaknesses identified.",
  },
  {
    id: "dtc-brand-inventory",
    clientType: "Omnichannel Consumer Brand",
    scale: "$35M Annual GMV · Multi-Warehouse",
    scope: "Strategic Controller & ASC 330 Inventory Advisory",
    challenge:
      "Merchant reserve balances on Shopify and Amazon were out of sync with general ledger cash, leading to frequent inventory write-down surprises at year-end.",
    solution:
      "Engineered automated clearing accounts for payment processors, instituted standard landed cost calculations, and built SKU-level gross margin dashboards.",
    result:
      "Eliminated $380k in unaccounted merchant reserve variances; improved inventory turnover forecasting by 40%.",
  },
];

const WORKING_PAPERS = [
  {
    title: "ASC 606 Revenue Recognition Working Paper",
    category: "Technical Accounting Memo",
    description:
      "Multi-element SaaS contract evaluation framework, performance obligation identification, and transaction price allocation.",
  },
  {
    title: "13-Week Direct Cash Flow & Runway Model",
    category: "CFO Pro-Forma Model",
    description:
      "Operational cash forecasting model tracking payroll, tax provisions, customer collections, and covenant thresholds.",
  },
  {
    title: "Audit PBC Master Tracker & Workpaper Index",
    category: "Audit Readiness Tool",
    description:
      "Institutional schedule tracker mapping client schedules to standard auditor workpaper references.",
  },
  {
    title: "Cross-Border Intercompany Reconciliation Schedule",
    category: "Multi-Entity Consolidation",
    description:
      "Dual-currency ledger reconciliation model eliminating intercompany imbalances across UK, US, and Indian entities.",
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
                      {eng.clientType}
                    </h2>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-sm font-medium text-accent">{eng.scope}</p>
                    <p className="text-xs text-foreground/50">{eng.scale}</p>
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
                  className="rounded-xl border border-foreground/10 bg-background p-6 transition-all hover:border-secondary/50 hover:shadow-xs"
                >
                  <span className="text-xs font-medium uppercase tracking-wider text-accent">
                    {wp.category}
                  </span>
                  <h3 className="mt-2 font-display text-lg text-foreground">
                    {wp.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-foreground/60">
                    {wp.description}
                  </p>
                  <p className="mt-4 text-xs font-semibold text-secondary">
                    Included with scoped retainer engagements →
                  </p>
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
