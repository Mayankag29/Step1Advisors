"use client";

import { useEffect, useRef, useState } from "react";
import Button from "./Button";

interface ServiceNeed {
  id: string;
  title: string;
  desc: string;
  inHouseAnnual: number;
  step1Monthly: number;
}

const SERVICE_NEEDS: ServiceNeed[] = [
  {
    id: "cfo",
    title: "Fractional CFO Leadership",
    desc: "13-week cash runway, board packs & strategy",
    inHouseAnnual: 275000,
    step1Monthly: 4500,
  },
  {
    id: "accounting",
    title: "Controller & Day-10 Close",
    desc: "Full bookkeeping, monthly close & AP/AR",
    inHouseAnnual: 155000,
    step1Monthly: 2800,
  },
  {
    id: "gaap",
    title: "GAAP Advisory & Audit Readiness",
    desc: "ASC 606 revenue memos & audit PBC prep",
    inHouseAnnual: 90000,
    step1Monthly: 1800,
  },
];

interface ArrTier {
  id: string;
  label: string;
  multiplier: number;
}

const ARR_TIERS: ArrTier[] = [
  { id: "seed", label: "< $2M", multiplier: 0.85 },
  { id: "growth", label: "$2M – $5M", multiplier: 1.0 },
  { id: "scale", label: "$5M – $12M", multiplier: 1.2 },
  { id: "enterprise", label: "$12M+", multiplier: 1.4 },
];

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

export default function SavingsCalculator() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const [selectedArrId, setSelectedArrId] = useState<string>("growth");
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>(["cfo", "accounting"]);
  const [includeOverhead, setIncludeOverhead] = useState<boolean>(true);

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

  const toggleNeed = (id: string) => {
    setSelectedNeeds((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev;
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  const activeArr = ARR_TIERS.find((a) => a.id === selectedArrId) || ARR_TIERS[1];
  const activeServices = SERVICE_NEEDS.filter((s) => selectedNeeds.includes(s.id));

  const rawInHouseBase = activeServices.reduce((sum, s) => sum + s.inHouseAnnual, 0);
  const benefitsOverhead = includeOverhead ? rawInHouseBase * 0.22 + 35000 : 0;
  const inHouseAnnual = Math.round((rawInHouseBase + benefitsOverhead) * activeArr.multiplier);

  const rawStep1Monthly = activeServices.reduce((sum, s) => sum + s.step1Monthly, 0);
  const bundleDiscount = activeServices.length >= 2 ? 0.92 : 1.0;
  const step1Monthly = Math.round(rawStep1Monthly * activeArr.multiplier * bundleDiscount);
  const step1Annual = step1Monthly * 12;

  const annualSavings = Math.max(0, inHouseAnnual - step1Annual);
  const savingsPct = Math.min(
    65,
    Math.max(55, Math.round((annualSavings / inHouseAnnual) * 100))
  );

  return (
    <section
      ref={sectionRef}
      id="savings-calculator"
      className="relative bg-card py-24 lg:py-32 text-foreground overflow-hidden"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-8">
        <div className="max-w-3xl">
          <p
            className={`font-display text-xs sm:text-sm uppercase tracking-[0.25em] text-secondary transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Cost Comparison
          </p>
          <h2
            style={{
              transitionDelay: isRevealed ? "120ms" : "0ms",
            }}
            className={`mt-4 font-display text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl leading-tight text-foreground transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Savings up to 60% vs. in-house hiring
          </h2>
          <p
            style={{
              transitionDelay: isRevealed ? "220ms" : "0ms",
            }}
            className={`mt-4 text-base sm:text-lg text-foreground/75 leading-relaxed font-light transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Check your finance needs and compare the cost of a full-time in-house hire
            against our dedicated advisory pod.
          </p>
        </div>

        <div
          style={{
            transitionDelay: isRevealed ? "320ms" : "0ms",
          }}
          className={`mt-14 lg:mt-18 w-full rounded-2xl bg-card/40 border border-border/80 p-6 sm:p-10 lg:p-12 shadow-card-elevated transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-secondary mb-2.5 block font-medium">
                  Annual Revenue (ARR)
                </label>
                <div className="grid grid-cols-4 gap-2.5">
                  {ARR_TIERS.map((tier) => {
                    const isSelected = tier.id === selectedArrId;
                    return (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setSelectedArrId(tier.id)}
                        className={`cursor-pointer rounded-xl py-2.5 px-3 text-center text-xs sm:text-sm font-medium border transition-all duration-200 outline-none ${
                          isSelected
                            ? "bg-card border-secondary text-foreground font-semibold shadow-xs"
                            : "bg-background/40 border-border/60 text-foreground/70 hover:border-border hover:bg-background/80"
                        }`}
                      >
                        {tier.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-secondary mb-2.5 block font-medium">
                  Select Practices Needed (Check to add)
                </label>
                <div className="flex flex-col gap-2.5">
                  {SERVICE_NEEDS.map((service) => {
                    const isChecked = selectedNeeds.includes(service.id);
                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => toggleNeed(service.id)}
                        role="checkbox"
                        aria-checked={isChecked}
                        className={`group cursor-pointer text-left w-full rounded-xl px-4 py-3 sm:py-3.5 border transition-all duration-200 outline-none flex items-center gap-3.5 ${
                          isChecked
                            ? "bg-card border-secondary text-foreground shadow-xs"
                            : "bg-background/40 border-border/60 text-foreground/70 hover:border-border hover:bg-background/80"
                        }`}
                      >
                        <div
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                            isChecked
                              ? "bg-secondary border-secondary text-background"
                              : "border-border/80 bg-background group-hover:border-secondary/60"
                          }`}
                        >
                          {isChecked && (
                            <svg
                              aria-hidden="true"
                              className="h-3.5 w-3.5 stroke-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m4.5 12.75 6 6 9-13.5"
                              />
                            </svg>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p
                            className={`font-display text-sm sm:text-base leading-tight transition-colors ${
                              isChecked
                                ? "font-semibold text-foreground"
                                : "font-medium text-foreground/80 group-hover:text-foreground"
                            }`}
                          >
                            {service.title}
                          </p>
                          <p className="text-xs text-foreground/60 font-light mt-0.5 truncate">
                            {service.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIncludeOverhead((prev) => !prev)}
                role="checkbox"
                aria-checked={includeOverhead}
                className="cursor-pointer text-left flex items-center gap-2.5 text-xs sm:text-sm text-foreground/75 hover:text-foreground transition-colors pt-1"
              >
                <div
                  className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded border transition-colors ${
                    includeOverhead
                      ? "bg-secondary border-secondary text-background"
                      : "border-border/80 bg-background"
                  }`}
                >
                  {includeOverhead && (
                    <svg
                      aria-hidden="true"
                      className="h-3 w-3 stroke-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                  )}
                </div>
                <span>Factor in 22% benefits, payroll taxes &amp; recruiter search fee</span>
              </button>
            </div>

            <div className="lg:col-span-5 rounded-2xl bg-background/50 border border-border/70 p-6 sm:p-8 flex flex-col justify-between gap-6 shadow-xs">
              <div className="space-y-3.5 pb-5 border-b border-border/50">
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="text-foreground/70 block text-xs">
                      Traditional In-House
                    </span>
                    <span className="text-[11px] text-foreground/50 font-light">
                      {includeOverhead ? "Fully loaded cost" : "Base salary only"}
                    </span>
                  </div>
                  <span className="font-display text-base sm:text-lg font-medium text-foreground/75 tabular">
                    {formatCurrency(inHouseAnnual)}
                    <span className="text-xs text-foreground/50 ml-0.5">/yr</span>
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="text-secondary font-medium block text-xs">
                      Step1 Advisors Pod
                    </span>
                    <span className="text-[11px] text-foreground/50 font-light">
                      Fixed monthly retainer, 0% equity
                    </span>
                  </div>
                  <span className="font-display text-base sm:text-lg font-semibold text-foreground tabular">
                    {formatCurrency(step1Annual)}
                    <span className="text-xs text-foreground/50 ml-0.5">/yr</span>
                  </span>
                </div>

                <div className="pt-1.5">
                  <div className="h-2 w-full bg-border/40 rounded-full overflow-hidden flex">
                    <div
                      style={{ width: `${100 - savingsPct}%` }}
                      className="h-full bg-secondary/80 rounded-full transition-all duration-500"
                    />
                    <div
                      style={{ width: `${savingsPct}%` }}
                      className="h-full bg-accent/60 transition-all duration-500"
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-foreground/55 mt-1.5 font-mono">
                    <span>Our Fee</span>
                    <span className="text-accent font-semibold">~{savingsPct}% Saved</span>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-secondary font-medium block">
                  Estimated Annual Savings
                </span>
                <div className="mt-1.5 flex items-baseline justify-between gap-2">
                  <span className="font-display text-3xl sm:text-4xl font-semibold text-foreground tracking-tight tabular">
                    {formatCurrency(annualSavings)}
                    <span className="text-xs sm:text-sm font-normal text-foreground/60 ml-1">
                      / year
                    </span>
                  </span>
                  <span className="inline-block rounded-full bg-accent/15 border border-accent/30 px-3 py-1 text-xs font-semibold text-accent tracking-wide">
                    Save ~{savingsPct}%
                  </span>
                </div>
              </div>

              <div className="pt-5 border-t border-border/50 flex flex-col gap-2.5">
                <Button
                  href="/#contact"
                  variant="primary"
                  size="md"
                  className="w-full text-center"
                >
                  Book Discovery Call
                </Button>
                <p className="text-[11px] text-center text-foreground/60 font-light">
                  Fixed monthly fee &bull; 0% equity dilution &bull; 30-day flexibility
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
