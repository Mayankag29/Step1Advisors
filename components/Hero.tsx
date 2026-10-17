"use client";

import HeroCanvas from "./HeroCanvas";
import Button from "./Button";
import { HERO_SERVICES } from "@/data/services";
import { PRODUCT_NAME } from "@/lib/config";

export default function Hero() {
  const handleServiceClick = (e: React.MouseEvent, serviceId: string) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", `#${serviceId}`);
      window.dispatchEvent(
        new CustomEvent("select-practice", { detail: serviceId })
      );
      const isMobile = window.innerWidth < 1024;
      const targetEl = isMobile
        ? (document.getElementById(`service-${serviceId}`) ||
          document.getElementById("services"))
        : document.getElementById("services");

      if (targetEl) {
        const lenis = (window as unknown as {
          __lenis?: {
            scrollTo: (
              el: HTMLElement,
              opts?: { offset?: number; duration?: number }
            ) => void;
          };
        }).__lenis;
        if (lenis) {
          lenis.scrollTo(targetEl, {
            offset: isMobile ? -70 : 0,
            duration: 1.0,
          });
        } else {
          targetEl.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  const handleCalculatorClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", "#savings-calculator");
      const calcEl = document.getElementById("savings-calculator");
      if (calcEl) {
        const lenis = (window as unknown as {
          __lenis?: {
            scrollTo: (
              el: HTMLElement,
              opts?: { offset?: number; duration?: number }
            ) => void;
          };
        }).__lenis;
        if (lenis) {
          lenis.scrollTo(calcEl, { offset: 0, duration: 1.0 });
        } else {
          calcEl.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <section
      id="top"
      className="grain relative flex min-h-[88vh] lg:min-h-[calc(100vh-4rem)] flex-col justify-center overflow-hidden bg-foreground text-background pt-28 pb-20 sm:pt-36 sm:pb-24"
    >
      <HeroCanvas />

      <div className="relative z-10 mx-auto grid w-full max-w-full sm:max-w-7xl gap-12 sm:gap-14 lg:gap-16 px-4 sm:px-8 lg:grid-cols-2 lg:items-center">
        <div className="w-full max-w-2xl lg:max-w-none">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-background">
            The finance team you&apos;d <br />
            otherwise{" "}
            <span className="text-primary font-semibold">
              assemble <br />
              <span className="whitespace-nowrap">one hire at a time.</span>
            </span>
          </h1>

          <p className="mt-4 sm:mt-5 max-w-lg text-xs sm:text-sm md:text-base leading-relaxed text-background/75 font-light">
            {PRODUCT_NAME} runs the fractional CFO, technical GAAP advisory,
            controller, and audit work of a full finance department — under US GAAP,
            IFRS, UK GAAP (FRS 101/102/105), or Ind AS.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <Button
              href="#contact"
              variant="primary"
              size="lg"
            >
              Book Discovery Call
            </Button>
            <a
              href="#how-we-work"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-background/85 transition-colors hover:text-primary py-1"
            >
              <span>See how an engagement works</span>
              <span className="text-primary">→</span>
            </a>
          </div>
        </div>

        <div className="lg:pl-4 flex flex-col justify-center">
          <p className="pb-3 text-xs sm:text-sm font-medium text-background/80">
            Take one service, a few, or all four:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 lg:gap-5">
            {HERO_SERVICES.map((service) => (
              <a
                key={service.id}
                href={`#${service.id}`}
                onClick={(e) => handleServiceClick(e, service.id)}
                className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-background/10 bg-foreground/50 backdrop-blur-md p-4 sm:p-5 lg:p-6 transition duration-300 hover:border-primary/40 hover:bg-foreground/80 hover:-translate-y-0.5 hover:shadow-glow-primary-sm min-h-30 sm:min-h-35 lg:min-h-40 cursor-pointer"
              >
                <div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-radial-[at_top_right] from-primary/12 via-transparent to-transparent" />

                <div className="relative z-10">
                  <h2 className="font-display text-base sm:text-lg lg:text-xl font-medium text-background transition-colors group-hover:text-primary">
                    {service.title}
                  </h2>
                  <p className="mt-1.5 text-xs sm:text-sm text-background/75 font-light leading-relaxed">
                    {service.subtitle}
                  </p>
                </div>

                <div className="relative z-10 mt-4 sm:mt-5 lg:mt-6 flex items-center justify-between pt-3 border-t border-background/10 text-xs">
                  <span className="font-display font-medium text-primary text-xs sm:text-sm">
                    {service.status}
                  </span>
                  <span className="text-background/70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary text-sm">
                    ↗
                  </span>
                </div>
              </a>
            ))}
          </div>

          <p className="mt-4 sm:mt-5 text-xs text-background/75 leading-relaxed">
            Nothing here is a required bundle — engage one function on its own,
            or combine them into a single retainer. Curious about the numbers?{" "}
            <a
              href="#savings-calculator"
              onClick={handleCalculatorClick}
              className="text-primary underline decoration-secondary/40 underline-offset-4 transition-colors hover:text-background hover:decoration-background font-medium cursor-pointer"
            >
              Calculate your savings today.
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
