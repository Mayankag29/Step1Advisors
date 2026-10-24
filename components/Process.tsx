"use client";

import { useEffect, useRef, useState } from "react";
import { PROCESS_STEPS } from "@/data/process";

export default function Process() {
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
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-we-work"
      className="relative bg-background py-24 lg:py-32 text-foreground"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-8">
        <div
          className={`ml-auto max-w-2xl text-left lg:text-right transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="font-display text-xs sm:text-sm uppercase tracking-[0.25em] text-secondary font-medium">
            How we work
          </p>
          <h2 className="mt-4 font-display text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl leading-tight text-foreground">
            Three steps from first call to a close that lands on schedule
          </h2>
        </div>

        <div className="mt-14 sm:mt-18 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12">
          {PROCESS_STEPS.map((step, index) => (
            <div
              key={step.number}
              style={{
                transitionDelay: `${150 + index * 220}ms`,
              }}
              className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isRevealed
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="font-display text-3xl sm:text-4xl text-secondary font-normal select-none">
                  {step.number}
                </span>
                {index < 2 && (
                  <div className="h-px flex-1 bg-border hidden md:block" />
                )}
              </div>

              <p className="font-display text-xl sm:text-2xl font-medium text-foreground tracking-tight mb-3">
                {step.title}
              </p>

              <p className="text-foreground/65 leading-relaxed text-sm sm:text-base">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
