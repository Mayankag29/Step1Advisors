"use client";

import { useEffect, useRef, useState } from "react";
import { SERVICES, type ServicePractice } from "@/data/services";

function DesktopFeatureView({
  practices,
  selectedIndex,
  setSelectedIndex,
  isRevealed,
}: {
  practices: ServicePractice[];
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  isRevealed: boolean;
}) {
  const activePractice = practices[selectedIndex];

  return (
    <div className="hidden lg:block">
      <div className="mt-8 lg:mt-10 grid grid-cols-12 items-stretch gap-x-0">
        <div className="col-span-5 flex flex-col justify-between gap-y-1">
          {practices.map((practice, practiceIndex) => {
            const isActive = selectedIndex === practiceIndex;
            return (
              <button
                key={practice.id}
                type="button"
                onClick={() => setSelectedIndex(practiceIndex)}
                style={{
                  transitionDelay: isRevealed
                    ? `${250 + practiceIndex * 110}ms`
                    : "0ms",
                }}
                className={`group relative cursor-pointer text-left w-full rounded-l-2xl rounded-r-none p-3.5 lg:p-4 outline-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isRevealed
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                  } ${isActive ? "bg-card/40" : "hover:bg-card/20"}`}
              >
                <span
                  className={`font-display text-xl sm:text-2xl font-medium tracking-tight transition-colors block ${isActive
                      ? "text-foreground font-semibold"
                      : "text-foreground/60 group-hover:text-foreground"
                    }`}
                >
                  {practice.title}
                </span>
                <p
                  className={`mt-2 text-sm sm:text-base leading-relaxed transition-colors ${isActive
                      ? "text-foreground/75"
                      : "text-foreground/50 group-hover:text-foreground/70"
                    }`}
                >
                  {practice.outcome}
                </p>
              </button>
            );
          })}
        </div>

        <div
          style={{
            transitionDelay: isRevealed ? "320ms" : "0ms",
          }}
          className={`col-span-7 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isRevealed
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
            }`}
        >
          <div className="w-full overflow-hidden rounded-2xl bg-card/40 border border-border/80 px-7 py-7 xl:px-10 xl:py-8 shadow-card-elevated min-h-110 lg:min-h-115 flex flex-col justify-between">
            <div
              key={activePractice.id}
              className="animate-card-fade-in flex flex-col justify-between h-full"
            >
              <div
                style={{
                  transitionDelay: isRevealed ? "450ms" : "0ms",
                }}
                className={`pb-4 border-b border-border/50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isRevealed
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                  }`}
              >
                <p className="text-base sm:text-lg text-foreground/90 leading-relaxed font-normal">
                  {activePractice.pitch}
                </p>
              </div>

              <div className="mt-5">
                <p
                  style={{
                    transitionDelay: isRevealed ? "560ms" : "0ms",
                  }}
                  className={`text-xs font-mono uppercase tracking-[0.2em] text-secondary font-medium mb-3 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isRevealed
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-3"
                    }`}
                >
                  What&apos;s included
                </p>
                <ul className="space-y-2.5">
                  {activePractice.deliverables.map((item, itemIdx) => (
                    <li
                      key={item}
                      style={{
                        transitionDelay: isRevealed
                          ? `${640 + itemIdx * 70}ms`
                          : "0ms",
                      }}
                      className={`flex items-start gap-2.5 text-sm sm:text-base text-foreground/85 leading-snug transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${isRevealed
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-3"
                        }`}
                    >
                      <svg
                        aria-hidden="true"
                        className="mt-0.5 h-4 w-4 shrink-0 text-secondary"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.2}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  transitionDelay: isRevealed ? "1050ms" : "0ms",
                }}
                className={`mt-5 pt-4 border-t border-border/50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isRevealed
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                  }`}
              >
                <p className="text-sm sm:text-base text-foreground/85 leading-relaxed">
                  <span className="font-semibold text-accent">
                    Who it fits —{" "}
                  </span>
                  <span>{activePractice.whoItFits}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileFeatureView({
  practices,
  isRevealed,
}: {
  practices: ServicePractice[];
  isRevealed: boolean;
}) {
  return (
    <div className="lg:hidden">
      <div className="mt-10 sm:mt-14 grid grid-cols-1 items-center gap-y-10">
        {practices.map((practice, pIdx) => (
          <div
            key={practice.title}
            id={`service-${practice.id}`}
            style={{
              transitionDelay: isRevealed ? `${200 + pIdx * 150}ms` : "0ms",
            }}
            className={`relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isRevealed
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
              }`}
          >
            <h3 className="mb-1.5 text-lg sm:text-xl font-display font-semibold text-foreground tracking-tight">
              {practice.title}
            </h3>
            <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed mb-4">
              {practice.outcome}
            </p>
            <div className="w-full overflow-hidden rounded-2xl bg-card/40 border border-border/80 p-6 sm:p-8 shadow-sm">
              <div className="pb-5 border-b border-border/40">
                <p className="text-base text-foreground/90 leading-relaxed font-normal">
                  {practice.pitch}
                </p>
              </div>

              <div className="mt-6">
                <p className="text-xs font-mono uppercase tracking-wider text-secondary mb-3 font-medium">
                  What&apos;s included
                </p>
                <ul className="space-y-2.5">
                  {practice.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-foreground/80 leading-snug"
                    >
                      <svg
                        aria-hidden="true"
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.2}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-5 border-t border-border/40">
                <p className="text-sm text-foreground/80 leading-relaxed">
                  <span className="font-semibold text-accent">
                    Who it fits —{" "}
                  </span>
                  <span>{practice.whoItFits}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleSelectPractice = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const practiceId = customEvent.detail;
      const foundIndex = SERVICES.findIndex((p) => p.id === practiceId);
      if (foundIndex !== -1) setSelectedIndex(foundIndex);
    };

    window.addEventListener("select-practice", handleSelectPractice);

    const checkHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        const foundIndex = SERVICES.findIndex(
          (p) => p.id === hash || hash.includes(p.id) || (hash.includes("audit") && p.id.includes("audit"))
        );
        if (foundIndex !== -1) setSelectedIndex(foundIndex);
      }
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    window.addEventListener("popstate", checkHash);

    return () => {
      window.removeEventListener("select-practice", handleSelectPractice);
      window.removeEventListener("hashchange", checkHash);
      window.removeEventListener("popstate", checkHash);
    };
  }, []);

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
      id="services"
      className="relative bg-card pt-12 pb-16 lg:pt-14 lg:pb-20 text-foreground overflow-hidden scroll-mt-0"
    >
      <span id="fractional-cfo" className="absolute top-0 pointer-events-none" />
      <span id="accounting-advisory" className="absolute top-0 pointer-events-none" />
      <span id="gaap-advisory" className="absolute top-0 pointer-events-none" />
      <span id="audit-assurance" className="absolute top-0 pointer-events-none" />
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-8">
        <div className="max-w-2xl">
          <p
            className={`font-display text-xs sm:text-sm uppercase tracking-[0.25em] text-secondary transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isRevealed
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
              }`}
          >
            Services
          </p>
          <h2
            style={{
              transitionDelay: isRevealed ? "120ms" : "0ms",
            }}
            className={`mt-4 font-display text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl leading-tight text-foreground transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isRevealed
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
              }`}
          >
            Four practices, one team that already talks to each other
          </h2>
        </div>

        <div className="relative">
          <DesktopFeatureView
            practices={SERVICES}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            isRevealed={isRevealed}
          />
          <MobileFeatureView
            practices={SERVICES}
            isRevealed={isRevealed}
          />
        </div>
      </div>
    </section>
  );
}
