"use client";

import { useEffect, useRef, useState } from "react";
import { INDUSTRIES } from "@/data/industries";

const mid = Math.ceil(INDUSTRIES.length / 2);
const COLUMNS = [INDUSTRIES.slice(0, mid), INDUSTRIES.slice(mid)];

export default function Industries() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="industries"
      aria-label="Industries"
      className="relative bg-card py-24 lg:py-32 text-foreground overflow-hidden"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-8">
        <div className="ml-auto max-w-3xl lg:max-w-4xl text-left lg:text-right">
          <p
            className={`font-display text-xs sm:text-sm uppercase tracking-[0.25em] text-secondary transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Industries
          </p>
          <h2
            style={{
              transitionDelay: isRevealed ? "120ms" : "0ms",
            }}
            className={`mt-4 font-display text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl leading-tight text-foreground transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Deepest where the accounting gets specific
          </h2>
        </div>

        <div className="mt-14 sm:mt-18 grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16">
          {COLUMNS.map((col, colIdx) => (
            <div
              key={colIdx}
              className={`divide-y divide-border/50 ${
                colIdx > 0 ? "border-t border-border/50 md:border-t-0" : ""
              }`}
            >
              {col.map((industry, index) => (
                <div
                  key={industry}
                  style={{
                    transitionDelay: isRevealed
                      ? `${300 + (index + colIdx * mid) * 90}ms`
                      : "0ms",
                  }}
                  className={`group py-6 sm:py-7 flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isRevealed
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                >
                  <span className="font-display text-xl sm:text-2xl font-medium text-foreground tracking-tight group-hover:text-secondary group-hover:translate-x-2.5 transition-all duration-300 inline-block">
                    {industry}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div
          style={{
            transitionDelay: isRevealed ? "750ms" : "0ms",
          }}
          className={`mt-4 sm:mt-5 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <a
            href="#contact"
            className="group inline-flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
          >
            <span className="inline-flex items-center text-xs font-mono font-medium text-secondary bg-background px-3 py-1 rounded-full border border-border/80 group-hover:border-secondary transition-colors shadow-xs">
              + Many more
            </span>
            <span className="font-light">
              Don&apos;t see your industry?
            </span>
            <span className="font-medium text-secondary group-hover:text-primary transition-colors inline-flex items-center gap-1">
              <span>Inquire here</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
