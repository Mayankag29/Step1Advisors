"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { openCalendly } from "@/lib/calendly";
import Button from "./Button";
import {
  PRODUCT_NAME,
  PRODUCT_SHORT_NAME,
  PRODUCT_FIRST_PART,
  PRODUCT_LAST_PART,
  CONTACT_EMAIL,
} from "@/lib/config";

const PRACTICES = [
  { id: "fractional-cfo", label: "Fractional CFO" },
  { id: "gaap-advisory", label: "GAAP Advisory" },
  { id: "accounting-advisory", label: "Strategic Remote Accounting" },
  { id: "audit-assurance", label: "Audit liaison & readiness" },
];

const RESOURCES = [
  { href: "/portfolio", label: "Case Studies" },
  { href: "/blog", label: "Blog" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
];

const COMPANY_LINKS = [
  { href: "/#how-we-work", label: "How We Work" },
  { href: "/#why-step-1", label: `Why ${PRODUCT_SHORT_NAME}` },
  { href: "/#industries", label: "Industries" },
  { href: "/#leadership", label: "Leadership" },
];

export default function Footer() {
  const router = useRouter();

  const handlePracticeClick = (practiceId: string) => {
    if (typeof window === "undefined") return;

    window.dispatchEvent(
      new CustomEvent("select-practice", { detail: practiceId })
    );

    const el = document.getElementById("services");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/#services");
    }
  };

  return (
    <footer className="relative bg-foreground text-background pt-16 pb-12 sm:pt-20 sm:pb-16 overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-8">
        <div className="pb-12 sm:pb-16 border-b border-background/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <Link href="/" className="inline-block group">
              <span className="font-display font-semibold text-2xl sm:text-3xl tracking-tight text-background transition-colors group-hover:text-primary">
                {PRODUCT_FIRST_PART}{" "}
                <span className="text-primary">{PRODUCT_LAST_PART}</span>
              </span>
            </Link>
            <p className="mt-1.5 text-xs sm:text-sm text-background/75 font-light">
              Audit-grade discipline · CFO-level vision
            </p>
          </div>

          <Button
            type="button"
            onClick={() => openCalendly()}
            variant="outline"
            size="sm"
            className="gap-2 w-fit"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Book Discovery Call
          </Button>
        </div>

        <div className="py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
          <div className="text-left">
            <p className="text-sm font-semibold text-background/50 mb-4 tracking-wide">
              Practices
            </p>
            <ul className="space-y-3">
              {PRACTICES.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => handlePracticeClick(p.id)}
                    className="text-sm font-semibold text-background/90 hover:text-secondary transition-colors block text-left cursor-pointer"
                  >
                    {p.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-left md:mx-auto">
            <p className="text-sm font-semibold text-background/50 mb-4 tracking-wide">
              Resources
            </p>
            <ul className="space-y-3">
              {RESOURCES.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="text-sm font-semibold text-background/90 hover:text-secondary transition-colors block"
                  >
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-left md:ml-auto">
            <p className="text-sm font-semibold text-background/50 mb-4 tracking-wide">
              Company
            </p>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="text-sm font-semibold text-background/90 hover:text-secondary transition-colors block"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-background/10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-background/85">
            <Link href="/privacy" className="hover:text-secondary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-secondary transition-colors">
              Terms of Engagement
            </Link>
          </div>

          <div className="flex flex-col md:items-end gap-3">
            <div className="flex items-center gap-4 text-background/60">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                aria-label={`Email ${PRODUCT_NAME}`}
                className="hover:text-secondary transition-colors"
              >
                <svg
                  className="w-4.5 h-4.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
            </div>

            <p className="text-xs text-background/70 font-light">
              © 2026 All rights reserved. {PRODUCT_NAME} SAS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
