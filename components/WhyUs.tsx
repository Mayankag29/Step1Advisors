"use client";

import { useEffect, useRef, useState } from "react";
import { WHY_US_PILLARS } from "@/data/whyUs";
import { PRODUCT_SHORT_NAME } from "@/lib/config";

export default function WhyUs() {
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
      id="why-step-1"
      aria-label={`Why ${PRODUCT_SHORT_NAME}`}
      className="relative bg-background py-24 lg:py-32 text-foreground overflow-hidden"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-8">
        <div className="ml-auto max-w-4xl lg:max-w-5xl text-left lg:text-right">
          <p
            className={`font-display text-xs sm:text-sm uppercase tracking-[0.25em] text-secondary transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Why {PRODUCT_SHORT_NAME}
          </p>
          <h2
            style={{
              transitionDelay: isRevealed ? "140ms" : "0ms",
            }}
            className={`mt-4 font-display text-2xl font-medium tracking-tight sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-foreground whitespace-normal sm:whitespace-nowrap transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            The firm that stays after the audit ends
          </h2>
        </div>

        <div className="mt-14 sm:mt-18 divide-y divide-border/50">
          {WHY_US_PILLARS.map((pillar, index) => (
            <div
              key={pillar.title}
              style={{
                transitionDelay: isRevealed ? `${260 + index * 120}ms` : "0ms",
              }}
              className={`group py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 items-baseline transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isRevealed
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="lg:col-span-5">
                <h3 className="font-display text-xl sm:text-2xl font-medium text-foreground tracking-tight group-hover:text-secondary group-hover:translate-x-1.5 transition-all duration-300 inline-block">
                  {pillar.title}
                </h3>
              </div>

              <div className="lg:col-span-7">
                <p className="text-base sm:text-lg text-foreground/75 leading-relaxed font-light">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
