import ContactForm from "./ContactForm";
import { CONTACT_EMAIL } from "@/lib/config";

export default function Contact() {
  return (
    <section
      id="contact"
      aria-label="Discovery Call & Contact"
      className="relative bg-background text-foreground py-24 lg:py-32 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-8">
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-[0.95fr_1.05fr] items-start">
          <div className="space-y-8">
            <div>
              <p className="font-display text-xs sm:text-sm uppercase tracking-[0.25em] text-secondary">
                Get started
              </p>
              <h2 className="mt-4 font-display text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl leading-tight text-foreground">
                Book a Discovery Call
              </h2>
              <p className="mt-4 max-w-lg leading-relaxed text-sm sm:text-base text-foreground/70 font-light">
                Tell us where your finance function is straining. We&apos;ll reply
                within one business day to schedule the 45-minute diagnostic call — no
                pitch deck, just your books and our read on them.
              </p>
            </div>

            <div className="space-y-6 pt-4 border-t border-border/50 text-sm">
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-foreground/70 mb-1">
                  Email
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-medium text-foreground hover:text-secondary transition-colors block text-base"
                >
                  {CONTACT_EMAIL}
                </a>
                <p className="text-xs text-foreground/70 mt-0.5">
                  Replies within 1 business day
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-foreground/70 mb-1">
                  Direct Line
                </p>
                <a
                  href="tel:+447405499593"
                  className="font-medium text-foreground hover:text-secondary transition-colors block text-base"
                >
                  +44 (0) 7405-499-593
                </a>
                <p className="text-xs text-foreground/70 mt-0.5">
                  Mon – Fri, 9am – 6pm GMT
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-foreground/70 mb-1">
                  Advisory Headquarters
                </p>
                <p className="text-foreground/80 font-medium leading-relaxed">
                  Gurugram (Delhi NCR), India — engagements delivered globally under US GAAP, UK GAAP, IFRS &amp; Ind AS
                </p>
              </div>
            </div>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
