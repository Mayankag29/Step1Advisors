import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getBlogPost, getAllBlogSlugs } from "@/data/blogs";
import { PRODUCT_NAME, SITE_URL } from "@/lib/config";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  const postUrl = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: `${post.title} — ${PRODUCT_NAME}`,
    description: post.metaDescription,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.publishedAt,
      url: postUrl,
      siteName: PRODUCT_NAME,
      locale: "en_GB",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const postUrl = `${SITE_URL}/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    url: postUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    publisher: {
      "@type": "Organization",
      name: PRODUCT_NAME,
      url: SITE_URL,
    },
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="bg-background text-foreground px-4 sm:px-8 pt-32 pb-20 sm:pt-36 lg:pt-40 lg:pb-28">
        <article className="mx-auto w-full max-w-3xl">
          {/* Breadcrumb / Back Navigation */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-foreground/60 hover:text-secondary transition-colors"
            >
              <span>←</span>
              <span>Back to all briefings</span>
            </Link>
          </div>

          {/* Article Header */}
          <header className="border-b border-border pb-10">
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-foreground/50 mb-4">
              <span className="font-semibold uppercase tracking-wider text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
                {post.category}
              </span>
              <span>·</span>
              <span>{post.readTime}</span>
              <span>·</span>
              <span>{post.date}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.15]">
              {post.title}
            </h1>
          </header>

          {/* Article Content */}
          <div className="mt-10 space-y-10">
            {post.sections.map((section, idx) => (
              <section key={idx} className="space-y-5">
                {section.heading && (
                  <h2 className="font-display text-2xl sm:text-3xl font-semibold text-foreground tracking-tight pt-2">
                    {section.heading}
                  </h2>
                )}

                {section.paragraphs && (
                  <div className="space-y-4">
                    {section.paragraphs.map((p, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-base sm:text-lg leading-relaxed text-foreground/80 font-light"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                )}

                {/* Table Rendering */}
                {section.table && (
                  <div className="my-6 overflow-hidden rounded-xl border border-border/80 bg-card/70 shadow-xs">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-125 border-collapse text-left text-sm">
                        <thead>
                          <tr className="border-b border-border bg-muted/60">
                            {section.table.headers.map((h, i) => (
                              <th
                                key={i}
                                className="px-4 py-3.5 font-semibold text-foreground text-xs sm:text-sm tracking-wide"
                              >
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/60">
                          {section.table.rows.map((row, rIdx) => (
                            <tr
                              key={rIdx}
                              className="hover:bg-muted/30 transition-colors"
                            >
                              {row.map((cell, cIdx) => (
                                <td
                                  key={cIdx}
                                  className={`px-4 py-3.5 text-xs sm:text-sm leading-relaxed ${
                                    cIdx === 0
                                      ? "font-medium text-foreground"
                                      : "text-foreground/80 font-light"
                                  } align-top`}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {section.table.footnote && (
                      <div className="border-t border-border/60 bg-muted/20 px-4 py-2.5 text-xs text-foreground/60 italic">
                        {section.table.footnote}
                      </div>
                    )}
                  </div>
                )}

                {/* Bullet Points */}
                {section.bulletPoints && (
                  <ul className="space-y-3 my-4">
                    {section.bulletPoints.map((bp, bpIdx) => (
                      <li
                        key={bpIdx}
                        className="flex items-start gap-3 text-base sm:text-lg leading-relaxed text-foreground/80 font-light"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2.5 shrink-0" />
                        <div>
                          {bp.label && (
                            <strong className="font-semibold text-foreground">
                              {bp.label}{" "}
                            </strong>
                          )}
                          <span>{bp.text}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Paragraphs after bullets/table if any */}
                {section.afterParagraphs && (
                  <div className="space-y-4 my-4">
                    {section.afterParagraphs.map((p, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-base sm:text-lg leading-relaxed text-foreground/80 font-light"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                )}

                {/* Numbered List */}
                {section.numberedList && (
                  <ol className="my-6 space-y-4">
                    {section.numberedList.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3.5 text-base sm:text-lg leading-relaxed text-foreground/85 font-light"
                      >
                        <span className="font-mono text-sm font-semibold text-secondary shrink-0 pt-0.5 select-none">
                          {i + 1}.
                        </span>
                        <div className="flex-1">
                          {item}
                        </div>
                      </li>
                    ))}
                  </ol>
                )}

                {/* Editorial Closing Callout (Option 1 - Clean Inline Link) */}
                {section.callout && (
                  <p className="my-6 text-base sm:text-lg italic text-foreground/85 font-light leading-relaxed">
                    <span>{section.callout.prompt} </span>
                    <Link
                      href={section.callout.actionHref || "/#contact"}
                      className="font-medium text-secondary underline decoration-secondary/40 underline-offset-4 hover:decoration-secondary hover:text-foreground transition-colors not-italic inline-flex items-center gap-1"
                    >
                      <span>[{section.callout.actionText}]</span>
                      <span className="text-xs transition-transform group-hover:translate-x-0.5">→</span>
                    </Link>
                  </p>
                )}
              </section>
            ))}

            {/* Disclaimer */}
            {post.disclaimer && (
              <div className="pt-8 border-t border-border/50 text-xs sm:text-sm text-foreground/50 font-light italic">
                {post.disclaimer}
              </div>
            )}
          </div>

          {/* Back Navigation */}
          <div className="mt-16 pt-8 border-t border-border flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-secondary hover:text-foreground transition-colors"
            >
              <span>←</span>
              <span>Back to all briefings</span>
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
