"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/data/navigation";
import { PRODUCT_FIRST_PART, PRODUCT_LAST_PART } from "@/lib/config";
import MobileNav from "./MobileNav";
import Button from "./Button";

const SECTION_IDS = [
  "how-we-work",
  "services",
  "industries",
  "leadership",
  "faq",
  "contact",
];

export default function Header() {
  const pathname = usePathname();
  const isSubPage = pathname !== "/";
  const [activeHref, setActiveHref] = useState<string>(isSubPage ? pathname : "");
  const [isPastHero, setIsPastHero] = useState<boolean>(isSubPage);

  const isPastHeroOrSubpage = isSubPage || isPastHero;
  const isTickerStuck = !isSubPage && isPastHero;

  useEffect(() => {
    if (isSubPage) return;

    let ticking = false;

    const updateScrollState = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const heroEl = document.getElementById("top");

      const pastHero = heroEl
        ? heroEl.getBoundingClientRect().bottom <= 80
        : scrollY > 550;

      setIsPastHero((prev) => (prev !== pastHero ? pastHero : prev));

      if (scrollY < 420) {
        setActiveHref((prev) => (prev !== "" ? "" : prev));
        ticking = false;
        return;
      }

      const threshold = scrollY + 240;
      let currentHref = "";

      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const id = SECTION_IDS[i];
        const el = document.getElementById(id);
        if (el && threshold >= el.getBoundingClientRect().top + scrollY) {
          currentHref = `/#${id}`;
          break;
        }
      }

      setActiveHref((prev) => (prev !== currentHref ? currentHref : prev));
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateScrollState);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateScrollState();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSubPage]);

  return (
    <>
      <header
        className={`lg:hidden fixed ${
          isTickerStuck ? "top-12" : "top-0"
        } inset-x-0 w-full max-w-full z-40 flex items-center justify-between px-4 sm:px-8 py-3.5 transition-all duration-300 bg-foreground border-b border-background/10 shadow-md`}
      >
        <Link
          href="/"
          className="group flex items-center shrink-0 py-0.5 transition-transform duration-200 active:scale-95"
        >
          <span className="font-display font-semibold text-xl sm:text-2xl tracking-tight text-background transition-colors group-hover:text-primary">
            {PRODUCT_FIRST_PART}{" "}
            <span className="text-primary">{PRODUCT_LAST_PART}</span>
          </span>
        </Link>

        <div className="flex items-center gap-2.5">
          <Button
            href="/#contact"
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex"
          >
            Book Discovery Call
          </Button>
          <MobileNav />
        </div>
      </header>

      <div
        className={`hidden lg:flex absolute ${
          isTickerStuck ? "top-18" : "top-6"
        } inset-x-0 z-40 mx-auto max-w-7xl px-6 xl:px-8 h-14 items-center justify-between pointer-events-none transition-all duration-300`}
      >
        <div className="pointer-events-auto flex items-center h-full">
          <Link
            href="/"
            className="group flex items-center transition-transform duration-300 hover:scale-[1.02]"
          >
            <span
              className={`font-display font-semibold text-2xl tracking-tight transition-colors duration-300 ${
                isSubPage
                  ? "text-foreground group-hover:text-secondary"
                  : "text-background group-hover:text-primary"
              }`}
            >
              {PRODUCT_FIRST_PART}{" "}
              <span className={isSubPage ? "text-secondary" : "text-primary"}>
                {PRODUCT_LAST_PART}
              </span>
            </span>
          </Link>
        </div>

        <div className="pointer-events-auto flex items-center justify-end h-full">
          <Button
            href="/#contact"
            variant={isSubPage ? "dark" : "outline"}
            size="md"
            className="h-11 px-5 xl:px-6"
          >
            Book Discovery Call
          </Button>
        </div>
      </div>

      <header
        className={`hidden lg:flex fixed ${
          isTickerStuck ? "top-18" : "top-6"
        } inset-x-0 z-50 pointer-events-none items-center justify-center px-4 h-14 transition-all duration-300`}
      >
        <nav
          aria-label="Main Navigation"
          className={`pointer-events-auto relative flex items-center gap-1 rounded-full p-2 h-14 transition duration-300 ${
            isPastHeroOrSubpage
              ? "border border-foreground/10 bg-popover/95 text-foreground shadow-nav-float backdrop-blur-md hover:border-foreground/20"
              : "border border-background/15 bg-foreground/90 text-background shadow-2xl backdrop-blur-xl hover:border-secondary/40"
          }`}
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeHref === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3.5 xl:px-4 py-2 text-sm font-medium transition duration-200 active:scale-95 border ${isPastHeroOrSubpage
                    ? isActive
                      ? "border-secondary/30 bg-secondary/15 text-secondary font-semibold shadow-sm"
                      : "border-transparent text-foreground/75 hover:bg-muted/80 hover:text-secondary"
                    : isActive
                      ? "border-transparent bg-background/20 text-background font-semibold shadow-inner"
                      : "border-transparent text-background/75 hover:bg-background/10 hover:text-background"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </header>
    </>
  );
}
