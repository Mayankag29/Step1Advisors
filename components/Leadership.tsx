"use client";

import { useEffect, useRef, useState } from "react";
import { LEADERSHIP_TEAM } from "@/data/leadership";

export default function Leadership() {
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
      id="leadership"
      aria-label="Leadership"
      className="relative bg-background py-24 lg:py-32 text-foreground overflow-hidden"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p
            className={`font-display text-xs sm:text-sm uppercase tracking-[0.25em] text-secondary transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Leadership
          </p>
          <h2
            style={{
              transitionDelay: isRevealed ? "120ms" : "0ms",
            }}
            className={`mt-4 font-display text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl leading-tight text-foreground transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Two partners, one point of accountability
          </h2>
        </div>

        <div className="mt-14 sm:mt-18 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {LEADERSHIP_TEAM.map((partner, index) => (
            <div
              key={partner.name}
              style={{
                transitionDelay: isRevealed
                  ? `${260 + index * 160}ms`
                  : "0ms",
              }}
              className={`flex flex-col rounded-3xl border border-border/70 bg-card p-7 sm:p-8 shadow-xs transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isRevealed
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-display text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
                  {partner.name}
                </p>
                <span className="inline-flex items-center text-xs font-mono font-medium text-secondary bg-background px-2.5 py-0.5 rounded-full border border-border/60 shrink-0">
                  {partner.credential}
                </span>
              </div>

              <p className="mt-1 text-xs sm:text-sm font-medium text-accent">
                {partner.role}
              </p>

              <p className="mt-4 text-xs sm:text-sm leading-relaxed text-foreground/80 font-light">
                {partner.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
