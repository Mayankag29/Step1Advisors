"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/data/navigation";
import Button from "./Button";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-background/20 bg-foreground/95 shadow-md transition-all duration-200 hover:border-primary hover:bg-foreground text-background focus:outline-none cursor-pointer"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-primary transition-transform duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-background transition-transform duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      <div
        aria-hidden="true"
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-foreground/75 transition-opacity duration-300 ease-out ${
          isOpen ? "opacity-100 pointer-events-auto visible" : "opacity-0 pointer-events-none invisible"
        }`}
      />

      <nav
        id="mobile-navigation"
        aria-label="Mobile Navigation"
        aria-hidden={!isOpen}
        className={`fixed inset-x-4 top-18 z-50 flex max-h-[calc(100vh-5.5rem)] flex-col gap-1 overflow-y-auto rounded-2xl border border-secondary/25 bg-foreground p-5 shadow-drawer text-background transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto scale-100 visible"
            : "opacity-0 -translate-y-3 pointer-events-none scale-[0.98] invisible"
        }`}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="rounded-lg px-3.5 py-2.5 text-sm font-medium text-background/85 transition-colors hover:bg-background/10 hover:text-background"
          >
            {link.label}
          </Link>
        ))}
        <Button
          href="/#contact"
          variant="primary"
          size="md"
          onClick={() => setIsOpen(false)}
          className="mt-3 w-full"
        >
          Book Discovery Call
        </Button>
      </nav>
    </div>
  );
}
