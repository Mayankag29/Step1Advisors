import Link from "next/link";
import Button from "@/components/Button";
import type { Metadata } from "next";
import { PRODUCT_FIRST_PART, PRODUCT_LAST_PART, PRODUCT_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The requested page could not be found. Visit Step 1 Advisors.",
};

export default function NotFound() {
  return (
    <div className="min-h-dvh flex flex-col justify-between bg-background text-foreground px-6 py-8 sm:px-12 sm:py-10">
      <header className="flex items-center justify-between">
        <Link href="/" className="inline-block group">
          <span className="font-display text-xl sm:text-2xl tracking-tight text-foreground">
            {PRODUCT_FIRST_PART} <span className="text-secondary">{PRODUCT_LAST_PART}</span>
          </span>
        </Link>

        <Link
          href="/"
          className="text-xs font-semibold uppercase tracking-wider text-foreground/60 hover:text-foreground transition-colors"
        >
          Back to Home
        </Link>
      </header>

      <main className="my-auto py-12 flex flex-col items-center justify-center text-center">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-secondary font-semibold">
          Error 404
        </span>

        <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground">
          Page Not Found
        </h1>

        <p className="mt-4 text-sm sm:text-base text-foreground/65 leading-relaxed font-light max-w-md">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
          <Button href="/" variant="dark" size="lg">
            Visit Step 1 Advisors →
          </Button>

          <Button href="/#contact" variant="secondary" size="lg">
            Book Discovery Call
          </Button>
        </div>
      </main>

      <footer className="text-center text-xs text-foreground/70 font-light">
        © 2026 {PRODUCT_NAME}. All rights reserved.
      </footer>
    </div>
  );
}
