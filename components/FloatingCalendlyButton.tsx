"use client";

import { useEffect } from "react";
import Script from "next/script";
import { openCalendly } from "@/lib/calendly";

export default function FloatingCalendlyButton() {
  useEffect(() => {
    // Remove default inline badge injected by Calendly widget if any
    const cleanupBadges = () => {
      const badges = document.querySelectorAll(".calendly-badge-widget");
      badges.forEach((b) => b.remove());
    };
    cleanupBadges();
    const timer = setTimeout(cleanupBadges, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <link
        id="calendly-widget-css"
        href="https://assets.calendly.com/assets/external/widget.css"
        rel="stylesheet"
      />
      <Script
        id="calendly-widget-js"
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />

      <button
        type="button"
        onClick={() => openCalendly()}
        aria-label="Schedule a call"
        title="Schedule a call"
        className="group fixed bottom-6 right-6 z-50 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-primary/50 bg-foreground/95 text-primary shadow-card-elevated backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-primary hover:bg-foreground hover:shadow-glow-primary active:scale-95 cursor-pointer"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:scale-110"
          aria-hidden="true"
        >
          <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>
    </>
  );
}
