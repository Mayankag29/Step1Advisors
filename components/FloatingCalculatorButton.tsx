"use client";

import { usePathname } from "next/navigation";

export default function FloatingCalculatorButton() {
  const pathname = usePathname();

  const handleCalculatorClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (pathname === "/") {
      const calcEl = document.getElementById("savings-calculator");
      if (calcEl) {
        window.history.pushState(null, "", "#savings-calculator");
        const lenis = (window as unknown as {
          __lenis?: {
            scrollTo: (
              el: HTMLElement,
              opts?: { offset?: number; duration?: number }
            ) => void;
          };
        }).__lenis;

        if (lenis) {
          lenis.scrollTo(calcEl, { offset: 0, duration: 1.0 });
        } else {
          calcEl.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      window.location.href = "/#savings-calculator";
    }
  };

  return (
    <button
      type="button"
      onClick={handleCalculatorClick}
      aria-label="Open savings calculator"
      title="Calculate your savings"
      className="group fixed bottom-21 sm:bottom-23 right-6 z-50 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-primary/50 bg-foreground/95 text-primary shadow-card-elevated backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-primary hover:bg-foreground hover:shadow-glow-primary active:scale-95 cursor-pointer"
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
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <line x1="8" y1="6" x2="16" y2="6" />
        <line x1="16" y1="14" x2="16" y2="18" />
        <path d="M16 10h.01" />
        <path d="M12 10h.01" />
        <path d="M8 10h.01" />
        <path d="M12 14h.01" />
        <path d="M8 14h.01" />
        <path d="M12 18h.01" />
        <path d="M8 18h.01" />
      </svg>
    </button>
  );
}
