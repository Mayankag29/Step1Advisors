import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import { PRODUCT_SHORT_NAME } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Technical Insights",
  description:
    "Audit-grade technical accounting memos, CFO perspectives, and regulatory insights across US GAAP, UK GAAP (FRS 102), and IFRS.",
};

interface BlogPost {
  slug: string;
  category: string;
  readTime: string;
  date: string;
  title: string;
  excerpt: string;
}

const POSTS: BlogPost[] = [
  {
    slug: "uk-to-us-gaap-flip",
    category: "Technical Accounting",
    readTime: "6 min read",
    date: "October 2026",
    title: "Transitioning from FRS 102 to US GAAP: What UK Companies Miss During US Flips",
    excerpt:
      "When a UK group sets up a Delaware parent ahead of a US venture round, the financial statements undergo a significant accounting shift. Here is how ASC 606, ASC 842, and share-based compensation diverge from UK GAAP.",
  },
  {
    slug: "audit-readiness-pbc-guide",
    category: "Audit Liaison",
    readTime: "5 min read",
    date: "September 2026",
    title: "The Friction-Free First Audit: How to Manage PBC Requests Without Stopping Operations",
    excerpt:
      "Statutory and non-statutory audits fail on schedule because finance teams treat auditor questions as interruptions. A structured look at pre-closing workpapers, sample selections, and milestone management.",
  },
  {
    slug: "day-10-monthly-close",
    category: "Finance Operations",
    readTime: "4 min read",
    date: "August 2026",
    title: "The Mechanics of a Reliable Day 10 Monthly Close",
    excerpt:
      "Closing books past the 20th business day deprives leadership of operational clarity. How we structure cutoffs, automated AP clearing, and balance sheet reconciliations to deliver predictable board decks.",
  },
  {
    slug: "cross-border-transfer-pricing",
    category: "Cross-Border & Tax",
    readTime: "7 min read",
    date: "July 2026",
    title: "Intercompany Service Agreements: Managing Transfer Pricing Across US, UK, and India",
    excerpt:
      "Operating subsidiaries across borders introduces permanent establishment risks and transfer pricing friction. What auditors and tax authorities expect to see in cost-plus intercompany agreements.",
  },
];

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="bg-background px-4 sm:px-8 pt-32 pb-16 sm:pt-36 lg:pt-40 lg:pb-24">
        <div className="mx-auto w-full max-w-4xl">
          <div className="border-b border-border pb-12">
            <p className="font-display text-xs sm:text-sm uppercase tracking-[0.25em] text-secondary font-medium">
              Insights &amp; Perspectives
            </p>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl font-medium tracking-tight text-foreground">
              The {PRODUCT_SHORT_NAME} Ledger.
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground/65">
              Technical accounting memos, fractional CFO guidance, and operational insights for growing businesses operating under US GAAP, UK GAAP, and IFRS.
            </p>
          </div>

          <div className="mt-12 divide-y divide-border">
            {POSTS.map((post) => (
              <article key={post.slug} className="group py-10 transition-colors">
                <div className="flex flex-wrap items-center gap-3 text-xs text-foreground/45">
                  <span className="font-semibold uppercase tracking-wider text-accent">
                    {post.category}
                  </span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                  <span>·</span>
                  <span>{post.date}</span>
                </div>

                <h2 className="mt-3 font-display text-2xl tracking-tight text-foreground transition-colors group-hover:text-secondary">
                  {post.title}
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-foreground/65">
                  {post.excerpt}
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-secondary transition-colors group-hover:text-foreground">
                  <span>Read briefing</span>
                  <span>→</span>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 rounded-2xl border border-secondary/40 bg-muted p-8 text-center">
            <h3 className="font-display text-xl text-foreground">
              Need a technical memo or audit readiness review?
            </h3>
            <p className="mx-auto mt-2 max-w-lg text-sm text-foreground/65">
              Tell us about your upcoming audit, transaction, or standard conversion. We will reply within one business day.
            </p>
            <Button href="/#contact" variant="dark" size="md" className="mt-6">
              Book Diagnostic Call
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
