import { CREDENTIALS } from "@/data/credentials";

export default function CredentialsTicker() {
  const items = CREDENTIALS.concat(CREDENTIALS, CREDENTIALS, CREDENTIALS);

  return (
    <section
      aria-label="Trust and Credentials Ticker"
      className="relative z-20 w-full max-w-full overflow-hidden border-y border-background/10 bg-foreground/95"
    >
      <div className="flex w-full items-center">
        <div className="relative z-20 flex shrink-0 items-center bg-foreground py-3.5 pl-4 pr-3.5 sm:py-4 sm:pl-8 sm:pr-6 border-r border-background/10 shadow-md">
          <span className="font-display font-semibold tracking-tight text-primary text-sm sm:text-base whitespace-nowrap select-none">
            Built for —
          </span>
        </div>

        <div
          className="relative flex-1 overflow-hidden py-3.5 sm:py-4"
          style={{ contain: "paint layout" }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 sm:w-12 z-10 bg-linear-to-r from-foreground to-transparent"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 z-10 bg-linear-to-l from-foreground to-transparent"
          />

          <div className="animate-marquee flex items-center">
            {items.map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="inline-flex items-center text-xs sm:text-sm font-semibold uppercase tracking-wide text-background/75 transition-colors hover:text-primary"
              >
                <span className="whitespace-nowrap px-3 sm:px-5">{item}</span>
                <span className="text-secondary/40 font-light select-none">|</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
