"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScrollProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        element.classList.add("is-revealed");
        element.querySelectorAll("[data-scroll]").forEach((child) => {
          child.classList.add("is-revealed");
        });
        return;
      }
    }

    window.scrollTo(0, 0);

    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }

    const rafId = requestAnimationFrame(() => {
      if (!window.location.hash) {
        window.scrollTo(0, 0);
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { immediate: true });
        }
      }
      document
        .querySelectorAll<HTMLElement>("[data-scroll]:not(.is-revealed)")
        .forEach((el) => {
          el.classList.add("is-revealed");
        });
    });

    return () => cancelAnimationFrame(rafId);
  }, [pathname]);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      document.querySelectorAll("[data-scroll]").forEach((el) => {
        el.classList.add("is-revealed");
      });
      if (window.location.hash) {
        const el = document.querySelector(window.location.hash);
        if (el) {
          el.scrollIntoView();
        }
      }
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;
    if (typeof window !== "undefined") {
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }

    const PRACTICE_IDS = [
      "fractional-cfo",
      "accounting-advisory",
      "gaap-advisory",
      "audit-assurance",
    ];

    const scrollToHash = (hash: string, immediate = false) => {
      try {
        const cleanId = hash.replace("#", "");

        if (cleanId === "services") {
          const servicesEl = document.getElementById("services");
          if (servicesEl) {
            lenis.scrollTo(servicesEl as HTMLElement, {
              offset: 0,
              immediate,
              duration: immediate ? 0 : 1.0,
            });
            return;
          }
        }

        if (PRACTICE_IDS.includes(cleanId)) {
          window.dispatchEvent(
            new CustomEvent("select-practice", { detail: cleanId })
          );
          const isMobile = window.innerWidth < 1024;
          const targetEl = isMobile
            ? (document.getElementById(`service-${cleanId}`) ||
              document.getElementById("services"))
            : document.getElementById("services");
          if (targetEl) {
            lenis.scrollTo(targetEl as HTMLElement, {
              offset: isMobile ? -70 : 0,
              immediate,
              duration: immediate ? 0 : 1.0,
            });
            return;
          }
        }

        if (cleanId === "savings-calculator") {
          const calcEl = document.getElementById("savings-calculator");
          if (calcEl) {
            lenis.scrollTo(calcEl as HTMLElement, {
              offset: 0,
              immediate,
              duration: immediate ? 0 : 1.0,
            });
            return;
          }
        }

        const element = document.querySelector(hash);
        if (element) {
          element.classList.add("is-revealed");
          element.querySelectorAll("[data-scroll]").forEach((child) => {
            child.classList.add("is-revealed");
          });
          lenis.scrollTo(element as HTMLElement, {
            offset: -80,
            immediate,
            duration: immediate ? 0 : 1.2,
          });
        }
      } catch {
        return;
      }
    };

    if (window.location.hash) {
      requestAnimationFrame(() => {
        scrollToHash(window.location.hash, true);
      });
      setTimeout(() => {
        scrollToHash(window.location.hash, true);
      }, 100);
      setTimeout(() => {
        scrollToHash(window.location.hash, false);
      }, 300);
    }

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    const elements = document.querySelectorAll<HTMLElement>("[data-scroll]");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.08,
      }
    );
    elements.forEach((el) => revealObserver.observe(el));

    const onScroll = (e: { scroll: number }) => {
      const shouldShow = e.scroll > 380;
      setShowTopBtn((prev) => (prev !== shouldShow ? shouldShow : prev));
    };

    lenis.on("scroll", onScroll);
    setShowTopBtn(lenis.scroll > 380);

    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (
        href &&
        (href.startsWith("#") ||
          (href.startsWith("/#") && window.location.pathname === "/")) &&
        href.length > 1
      ) {
        const hash = href.startsWith("/#") ? href.substring(1) : href;
        const cleanId = hash.replace("#", "");

        if (cleanId === "services") {
          e.preventDefault();
          window.history.pushState(null, "", hash);
          const servicesEl = document.getElementById("services");
          if (servicesEl) {
            lenis.scrollTo(servicesEl as HTMLElement, {
              offset: 0,
              duration: 1.0,
            });
          }
          return;
        }

        if (PRACTICE_IDS.includes(cleanId)) {
          e.preventDefault();
          window.history.pushState(null, "", hash);
          window.dispatchEvent(
            new CustomEvent("select-practice", { detail: cleanId })
          );
          const isMobile = window.innerWidth < 1024;
          const targetEl = isMobile
            ? (document.getElementById(`service-${cleanId}`) ||
              document.getElementById("services"))
            : document.getElementById("services");
          if (targetEl) {
            lenis.scrollTo(targetEl as HTMLElement, {
              offset: isMobile ? -70 : 0,
              duration: 1.0,
            });
          }
          return;
        }

        if (cleanId === "savings-calculator") {
          e.preventDefault();
          window.history.pushState(null, "", hash);
          const calcEl = document.getElementById("savings-calculator");
          if (calcEl) {
            lenis.scrollTo(calcEl as HTMLElement, {
              offset: 0,
              duration: 1.0,
            });
          }
          return;
        }

        const element = document.querySelector(hash);
        if (element) {
          element.classList.add("is-revealed");
          element.querySelectorAll("[data-scroll]").forEach((child) => {
            child.classList.add("is-revealed");
          });
          e.preventDefault();
          window.history.pushState(null, "", hash);
          lenis.scrollTo(element as HTMLElement, {
            offset: -80,
            duration: 1.2,
          });
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);

    const handleHashChange = () => {
      if (window.location.hash) {
        scrollToHash(window.location.hash, false);
      }
    };
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      if (typeof window !== "undefined") {
        delete (window as unknown as { __lenis?: unknown }).__lenis;
      }
      revealObserver.disconnect();
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {children}

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        className={`fixed bottom-36 sm:bottom-40 right-7 sm:right-8 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-secondary/40 bg-foreground/90 text-primary shadow-lg backdrop-blur-md transition duration-300 hover:scale-105 hover:border-primary hover:bg-secondary hover:text-background active:scale-95 ${
          showTopBtn
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
        title="Back to top"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </>
  );
}
