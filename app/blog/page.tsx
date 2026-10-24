import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BLOG_POSTS } from "@/data/blogs";
import { SITE_URL, PRODUCT_NAME } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights & Perspectives",
  description:
    "Technical guidance on Companies House ID verification, FRS 102 lease and revenue rules, UK audit thresholds, fractional CFO pricing, and IFRS vs US GAAP.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: `Insights & Perspectives | ${PRODUCT_NAME}`,
    description:
      "Technical guidance on Companies House ID verification, FRS 102 lease and revenue rules, UK audit thresholds, fractional CFO pricing, and IFRS vs US GAAP.",
    type: "website",
    url: `${SITE_URL}/blog`,
    siteName: PRODUCT_NAME,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: `Insights & Perspectives | ${PRODUCT_NAME}`,
    description:
      "Technical guidance on Companies House ID verification, FRS 102 lease and revenue rules, UK audit thresholds, fractional CFO pricing, and IFRS vs US GAAP.",
  },
};

export default function BlogPage() {
  const posts = BLOG_POSTS;

  return (
    <>
      <Header />
      <main className="bg-background px-4 sm:px-8 pt-32 pb-16 sm:pt-36 lg:pt-40 lg:pb-24">
        <div className="mx-auto w-full max-w-4xl">
          <div className="border-b border-border pb-12">
            <p className="font-display text-xs sm:text-sm uppercase tracking-[0.25em] text-secondary font-medium">
              Knowledge &amp; Advisory
            </p>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl font-medium tracking-tight text-foreground">
              Insights &amp; Perspectives
            </h1>
            <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-foreground/65 font-light">
              Technical guidance, regulatory updates, and CFO perspectives for growing businesses.
            </p>
          </div>

          <div className="mt-12 divide-y divide-border">
            {posts.map((post) => (
              <article key={post.slug} className="group py-10 transition-colors">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-foreground/45">
                    <span className="font-semibold uppercase tracking-wider text-accent">
                      {post.category}
                    </span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                    <span>·</span>
                    <span>{post.date}</span>
                  </div>

                  <h2 className="mt-3 font-display text-2xl sm:text-3xl tracking-tight text-foreground transition-colors group-hover:text-secondary">
                    {post.title}
                  </h2>

                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-foreground/65 font-light">
                    {post.excerpt}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-secondary transition-colors group-hover:text-foreground">
                    <span>Read briefing</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
