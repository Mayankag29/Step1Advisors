import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PRODUCT_NAME, CONTACT_EMAIL, SITE_URL } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Engagement",
  description:
    `Standard terms of engagement, advisory scope, professional independence, and client responsibilities governing ${PRODUCT_NAME} engagements.`,
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="bg-background px-4 sm:px-8 pt-32 pb-16 sm:pt-36 lg:pt-40 lg:pb-24 text-foreground">
        <div className="mx-auto w-full max-w-4xl">
          <div className="border-b border-border pb-10">
            <p className="font-display text-xs sm:text-sm uppercase tracking-[0.25em] text-secondary font-medium">
              Legal &amp; Governance
            </p>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl font-medium tracking-tight text-foreground">
              Terms of Engagement
            </h1>
            <p className="mt-3 text-sm text-foreground/50">
              Effective date: January 1, 2026 · Last updated: January 2026
            </p>
          </div>

          <div className="mt-12 space-y-10 text-sm sm:text-base leading-relaxed text-foreground/80 font-light">
            <section>
              <h2 className="font-display text-2xl font-medium text-foreground mb-3 tracking-tight">
                1. Scope of Engagement
              </h2>
              <p>
                These Terms of Engagement (&quot;Terms&quot;) govern the advisory, fractional CFO, technical accounting, and audit readiness services provided by {PRODUCT_NAME} (&quot;Advisor&quot;) to the client entity (&quot;Client&quot;). Each specific engagement is detailed in a written Engagement Letter or Statement of Work (&quot;SOW&quot;) describing deliverables, reporting deadlines, and monthly fee retainers.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-medium text-foreground mb-3 tracking-tight">
                2. Professional Independence Standards
              </h2>
              <p>
                In accordance with international accounting ethics and professional auditor independence standards (including AICPA, ICAI, and FRC guidelines), {PRODUCT_NAME} cannot perform statutory financial statement audits for any client whose books or financial ledgers we actively maintain during the same fiscal reporting period. We will plainly disclose our independence posture during scoping.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-medium text-foreground mb-3 tracking-tight">
                3. Client Responsibilities &amp; Source Documentation
              </h2>
              <p className="mb-3">
                To enable our team to deliver audit-grade reporting on schedule (such as our standard Day 10 monthly close commitment), the Client agrees to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/75">
                <li>Provide prompt, unhindered access to corporate accounting software, bank accounts (view-only), payroll records, and billing platforms.</li>
                <li>Supply executing contracts, equity grant agreements, debt covenants, and material transaction notices without undue delay.</li>
                <li>Designate an authorized officer (CEO, COO, or Founder) responsible for final management review and approval of tax returns and financial statements.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-medium text-foreground mb-3 tracking-tight">
                4. Technical Accounting Memorandums &amp; Audit Support
              </h2>
              <p>
                Technical accounting memos prepared under US GAAP (ASC 606, ASC 842, ASC 718), IFRS, or Ind AS represent our professional technical judgement based on documentation provided by the Client. While drafted to auditor-grade standards, the Client&apos;s independent external auditor retains final authority over statutory audit opinions. We will actively interface with external audit teams to defend documented positions.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-medium text-foreground mb-3 tracking-tight">
                5. Fees, Invoicing &amp; Retainer Terms
              </h2>
              <p>
                Recurring advisory engagements operate on a fixed monthly retainer payable on the first day of each service month via Wire, ACH, or credit card. One-off technical conversion projects or audit readiness engagements are invoiced according to the milestone schedule agreed in the engagement letter.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-medium text-foreground mb-3 tracking-tight">
                6. Confidentiality &amp; Proprietary Information
              </h2>
              <p>
                Both parties agree that all trade secrets, financial models, cap table structures, business forecasts, and proprietary software disclosed during an engagement shall remain strictly confidential and will not be disclosed to any outside party without prior written consent.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-medium text-foreground mb-3 tracking-tight">
                7. Term &amp; Termination
              </h2>
              <p>
                Either party may terminate an ongoing monthly advisory retainer by providing 30 days&apos; advance written notice. Upon termination, {PRODUCT_NAME} will complete the final closed accounting period and deliver all working papers, reconciliation workbooks, and ledgers in clean order to the Client or successor controller.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-medium text-foreground mb-3 tracking-tight">
                8. Contact for Engagement Matters
              </h2>
              <p>
                Questions concerning these Terms of Engagement should be addressed to our managing partners:
              </p>
              <div className="mt-4 rounded-xl border border-border bg-popover p-5 text-sm">
                <p className="font-medium text-foreground">{PRODUCT_NAME} — Partner Office</p>
                <p className="text-foreground/65 mt-1">Email: <a href={`mailto:${CONTACT_EMAIL}`} className="text-secondary underline underline-offset-4">{CONTACT_EMAIL}</a></p>
                <p className="text-foreground/65 mt-0.5">Global Deliveries: Gurugram · London · New York</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
