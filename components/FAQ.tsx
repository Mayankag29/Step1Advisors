"use client";

import { useEffect, useRef, useState } from "react";
import { FAQ_ITEMS } from "@/data/faq";

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [openIndices, setOpenIndices] = useState<number[]>([]);

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

  const toggle = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      aria-label="Frequently Asked Questions"
      className="relative bg-card py-24 lg:py-32 text-foreground overflow-hidden"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-8">
        <div className="mx-auto max-w-4xl lg:max-w-5xl text-center">
          <p
            className={`font-display text-xs sm:text-sm uppercase tracking-[0.25em] text-secondary transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            FAQ
          </p>
          <h2
            style={{
              transitionDelay: isRevealed ? "120ms" : "0ms",
            }}
            className={`mt-4 font-display text-2xl font-medium tracking-tight sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-foreground whitespace-normal sm:whitespace-nowrap transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Questions before the diagnostic call
          </h2>
        </div>

        <div className="mx-auto mt-14 sm:mt-18 space-y-1.5 sm:space-y-2 max-w-3xl">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndices.includes(index);
            return (
              <div
                key={item.question}
                style={{
                  transitionDelay: isRevealed
                    ? `${220 + index * 60}ms`
                    : "0ms",
                }}
                className={`rounded-[20px] border border-border/60 bg-popover px-5 py-3.5 sm:px-6 sm:py-4 shadow-card-subtle transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isRevealed
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between text-left cursor-pointer outline-none group"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-sm leading-normal transition-all duration-200 ${
                      isOpen
                        ? "font-bold text-foreground"
                        : "font-medium text-foreground/75 group-hover:text-foreground"
                    }`}
                  >
                    {item.question}
                  </span>
                  <span
                    className={`ml-4 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen
                        ? "rotate-180 text-foreground"
                        : "rotate-0 text-foreground/40 group-hover:text-foreground/70"
                    }`}
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-foreground/70 font-light">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
