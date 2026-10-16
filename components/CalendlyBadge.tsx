"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function CalendlyBadge() {
  useEffect(() => {
    const badges = document.querySelectorAll(".calendly-badge-widget");
    badges.forEach((b) => b.remove());
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
    </>
  );
}
