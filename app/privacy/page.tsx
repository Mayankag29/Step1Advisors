import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PRODUCT_NAME, CONTACT_EMAIL, SITE_URL } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    `Privacy policy and data protection standards governing ${PRODUCT_NAME} advisory engagements, client financial records, and website usage.`,
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="bg-background px-4 sm:px-8 pt-32 pb-16 sm:pt-36 lg:pt-40 lg:pb-24 text-foreground">
        <div className="mx-auto w-full max-w-4xl">
          <div className="border-b border-border pb-10">
            <p className="font-display text-xs sm:text-sm uppercase tracking-[0.25em] text-secondary font-medium">
              Legal &amp; Compliance
            </p>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl font-medium tracking-tight text-foreground">
              Privacy Policy
            </h1>
            <p className="mt-3 text-sm text-foreground/50">
              Effective date: January 1, 2026 · Last updated: January 2026
            </p>
          </div>

          <div className="mt-12 space-y-10 text-sm sm:text-base leading-relaxed text-foreground/80 font-light">
            <section>
              <h2 className="font-display text-2xl font-medium text-foreground mb-3 tracking-tight">
                1. Overview and Commitment to Confidentiality
              </h2>
              <p>
                {PRODUCT_NAME} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) provides fractional CFO, technical GAAP advisory, remote accounting, and audit readiness services to corporate entities and founders globally. We recognize that our engagements involve access to non-public financial records, cap tables, tax returns, and strategic operational data. Protecting this information is foundational to our professional duty.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-medium text-foreground mb-3 tracking-tight">
                2. Information We Collect
              </h2>
              <p className="mb-3">
                In the course of providing advisory and accounting services, we may collect and process:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/75">
                <li>
                  <strong className="text-foreground font-medium">Business Contact Details:</strong> Names, corporate email addresses, phone numbers, and job titles of your executive team and accounting personnel.
                </li>
                <li>
                  <strong className="text-foreground font-medium">Engagement Financial Records:</strong> General ledgers, trial balances, bank feeds, customer contracts, equity capitalization tables, debt agreements, and tax filings provided for advisory analysis.
                </li>
                <li>
                  <strong className="text-foreground font-medium">Diagnostic Information:</strong> Information submitted via our website discovery form to scope diagnostic calls and advisory proposals.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-medium text-foreground mb-3 tracking-tight">
                3. Purpose of Processing
              </h2>
              <p className="mb-3">
                We strictly use client information to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/75">
                <li>Perform scoped accounting, controller, and CFO engagements agreed upon under executed engagement letters.</li>
                <li>Draft technical accounting memos under US GAAP, IFRS, or Ind AS (such as ASC 606 revenue recognition and ASC 842 lease evaluations).</li>
                <li>Coordinate external audit schedules and auditor Provided-by-Client (PBC) request lists.</li>
                <li>Maintain engagement records required by professional regulatory bodies.</li>
              </ul>
              <p className="mt-3">
                We never monetize, license, or sell client data to third parties or advertising brokers.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-medium text-foreground mb-3 tracking-tight">
                4. Data Protection and Information Security
              </h2>
              <p>
                All electronic financial data is processed in enterprise-grade cloud accounting environments (e.g., QuickBooks Online, Xero, NetSuite) or encrypted cloud file vaults. We enforce strict role-based access controls, multi-factor authentication (MFA) across all staff accounts, and TLS/SSL encryption for data in transit and AES-256 for data at rest.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-medium text-foreground mb-3 tracking-tight">
                5. Third-Party Disclosures
              </h2>
              <p>
                We do not disclose confidential financial information to external parties except:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/75 mt-3">
                <li>To external audit firms and tax authorities explicitly designated by you in writing as part of audit liaison services.</li>
                <li>To secure cloud infrastructure providers who assist in hosting our encrypted workpaper systems under binding non-disclosure agreements.</li>
                <li>Where required by enforceable legal process, statutory audit mandate, or court order.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-medium text-foreground mb-3 tracking-tight">
                6. Data Retention
              </h2>
              <p>
                Working papers, reconciliations, and advisory deliverables are retained for the statutory period required by governing accounting and tax regulations (generally 7 years following engagement close), after which electronic archives are permanently deleted or returned upon client request.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-medium text-foreground mb-3 tracking-tight">
                7. Inquiries and Contact Information
              </h2>
              <p>
                If you have questions regarding this Privacy Policy or our information security protocols, please reach out to our engagement leadership directly:
              </p>
              <div className="mt-4 rounded-xl border border-border bg-popover p-5 text-sm">
                <p className="font-medium text-foreground">{PRODUCT_NAME} Compliance</p>
                <p className="text-foreground/65 mt-1">Email: <a href={`mailto:${CONTACT_EMAIL}`} className="text-secondary underline underline-offset-4">{CONTACT_EMAIL}</a></p>
                <p className="text-foreground/65 mt-0.5">Telephone: +44 7405 499 593</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
