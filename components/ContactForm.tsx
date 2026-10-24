"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";
import { CONTACT_EMAIL } from "@/lib/config";
import { trackClarityEvent } from "@/lib/clarity";
import { trackGAEvent } from "@/lib/gtag";

const SERVICES = [
  "Not Sure Yet",
  "Fractional CFO",
  "GAAP Advisory",
  "Strategic Remote Accounting & Advisory",
  "Audit Liaison & Readiness",
];

interface CountryCodeOption {
  name: string;
  code: string;
  flag: string;
  placeholder: string;
}

const COUNTRY_CODES: CountryCodeOption[] = [
  { name: "United Kingdom", code: "+44", flag: "🇬🇧", placeholder: "7911 123456" },
  { name: "United States", code: "+1", flag: "🇺🇸", placeholder: "(555) 000-0000" },
  { name: "India", code: "+91", flag: "🇮🇳", placeholder: "98765 43210" },
  { name: "United Arab Emirates", code: "+971", flag: "🇦🇪", placeholder: "50 123 4567" },
  { name: "Singapore", code: "+65", flag: "🇸🇬", placeholder: "8123 4567" },
  { name: "Canada", code: "+1", flag: "🇨🇦", placeholder: "(555) 000-0000" },
  { name: "Australia", code: "+61", flag: "🇦🇺", placeholder: "412 345 678" },
  { name: "Saudi Arabia", code: "+966", flag: "🇸🇦", placeholder: "50 123 4567" },
  { name: "Germany", code: "+49", flag: "🇩🇪", placeholder: "151 2345678" },
  { name: "France", code: "+33", flag: "🇫🇷", placeholder: "6 12 34 56 78" },
  { name: "Switzerland", code: "+41", flag: "🇨🇭", placeholder: "78 123 45 67" },
  { name: "Netherlands", code: "+31", flag: "🇳🇱", placeholder: "6 12345678" },
  { name: "Ireland", code: "+353", flag: "🇮🇪", placeholder: "83 123 4567" },
  { name: "Hong Kong", code: "+852", flag: "🇭🇰", placeholder: "9123 4567" },
  { name: "Japan", code: "+81", flag: "🇯🇵", placeholder: "90 1234 5678" },
  { name: "Other", code: "+", flag: "🌐", placeholder: "Phone number" },
];

export default function ContactForm() {
  const [isSent, setIsSent] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryCodeOption>(COUNTRY_CODES[0]);
  const [isPhoneCodeOpen, setIsPhoneCodeOpen] = useState(false);
  const phoneCodeRef = useRef<HTMLDivElement>(null);

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    company?: string;
  }>({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "Not Sure Yet",
    message: "",
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsSelectOpen(false);
      }
      if (phoneCodeRef.current && !phoneCodeRef.current.contains(e.target as Node)) {
        setIsPhoneCodeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCloseToast = () => {
    setIsToastVisible(false);
    setTimeout(() => {
      setIsSent(false);
    }, 400);
  };

  useEffect(() => {
    if (!isSent) {
      setIsToastVisible(false);
      return;
    }

    const enterTimer = setTimeout(() => {
      setIsToastVisible(true);
    }, 20);

    const autoCloseTimer = setTimeout(() => {
      handleCloseToast();
    }, 5500);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(autoCloseTimer);
    };
  }, [isSent]);

  const validate = () => {
    const nextErrors: { name?: string; email?: string; company?: string } = {};
    if (!formData.name.trim()) {
      nextErrors.name = "Full name is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!formData.email.trim()) {
      nextErrors.email = "Work email is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      nextErrors.email = "Please enter a valid work email address";
    }
    if (!formData.company.trim()) {
      nextErrors.company = "Company name is required";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    setIsSubmitting(true);
    setErrorMessage(null);

    const formattedPhone = formData.phone.trim()
      ? formData.phone.trim().startsWith("+")
        ? formData.phone.trim()
        : `${selectedCountry.code} ${formData.phone.trim()}`
      : "";

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formattedPhone,
          service: formData.service,
          message: formData.message,
          honeypot,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit inquiry. Please try again.");
      }

      setIsToastVisible(false);
      setIsSent(true);
      trackClarityEvent("contact_inquiry_submitted");
      trackGAEvent("generate_lead", {
        event_category: "Contact Form",
        event_label: formData.service,
      });
      setErrors({});
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        service: "Not Sure Yet",
        message: "",
      });
      setSelectedCountry(COUNTRY_CODES[0]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="rounded-2xl sm:rounded-3xl border border-border/70 bg-card p-6 sm:p-8 md:p-9 shadow-sm">
      <div className="mb-6">
        <p className="font-display font-semibold text-2xl sm:text-3xl text-foreground">
          Send a Diagnostic Inquiry
        </p>
        <p className="mt-1 text-xs sm:text-sm text-foreground/60 font-light">
          We review every submission personally and reply with technical feedback within one business day.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
        <input
          type="text"
          name="website_verify"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <label htmlFor="contact-name" className="flex flex-col gap-1.5 text-xs sm:text-sm">
            <span className="font-semibold text-foreground/75">Full Name *</span>
            <input
              id="contact-name"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              className={`rounded-xl border bg-popover px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/35 outline-none transition-colors ${
                errors.name
                  ? "border-destructive focus:border-destructive focus:ring-1 focus:ring-destructive/25"
                  : "border-border/80 focus:border-secondary focus:ring-1 focus:ring-secondary/30"
              }`}
              placeholder="Alex Smith"
            />
            {errors.name && (
              <span className="text-xs text-destructive font-medium flex items-center gap-1.5 mt-0.5">
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 16 16" fill="currentColor">
                  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0-10a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 5zm0 6.5a.875.875 0 1 0 0-1.75.875.875 0 0 0 0 1.75z" clipRule="evenodd" />
                </svg>
                {errors.name}
              </span>
            )}
          </label>

          <label htmlFor="contact-email" className="flex flex-col gap-1.5 text-xs sm:text-sm">
            <span className="font-semibold text-foreground/75">Work Email *</span>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              className={`rounded-xl border bg-popover px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/35 outline-none transition-colors ${
                errors.email
                  ? "border-destructive focus:border-destructive focus:ring-1 focus:ring-destructive/25"
                  : "border-border/80 focus:border-secondary focus:ring-1 focus:ring-secondary/30"
              }`}
              placeholder="alex@company.com"
            />
            {errors.email && (
              <span className="text-xs text-destructive font-medium flex items-center gap-1.5 mt-0.5">
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 16 16" fill="currentColor">
                  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0-10a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 5zm0 6.5a.875.875 0 1 0 0-1.75.875.875 0 0 0 0 1.75z" clipRule="evenodd" />
                </svg>
                {errors.email}
              </span>
            )}
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label htmlFor="contact-company" className="flex flex-col gap-1.5 text-xs sm:text-sm">
            <span className="font-semibold text-foreground/75">Company *</span>
            <input
              id="contact-company"
              name="company"
              autoComplete="organization"
              value={formData.company}
              onChange={(e) => updateField("company", e.target.value)}
              className={`rounded-xl border bg-popover px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/35 outline-none transition-colors ${
                errors.company
                  ? "border-destructive focus:border-destructive focus:ring-1 focus:ring-destructive/25"
                  : "border-border/80 focus:border-secondary focus:ring-1 focus:ring-secondary/30"
              }`}
              placeholder="Company, Inc."
            />
            {errors.company && (
              <span className="text-xs text-destructive font-medium flex items-center gap-1.5 mt-0.5">
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 16 16" fill="currentColor">
                  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0-10a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 5zm0 6.5a.875.875 0 1 0 0-1.75.875.875 0 0 0 0 1.75z" clipRule="evenodd" />
                </svg>
                {errors.company}
              </span>
            )}
          </label>

          <div className="flex flex-col gap-1.5 text-xs sm:text-sm">
            <label htmlFor="contact-phone" className="font-semibold text-foreground/75">
              Contact Number
            </label>
            <div className="relative flex rounded-xl border border-border/80 bg-popover transition-colors focus-within:border-secondary focus-within:ring-1 focus-within:ring-secondary/30">
              <div ref={phoneCodeRef} className="relative">
                <button
                  type="button"
                  id="contact-phone-code-button"
                  onClick={() => setIsPhoneCodeOpen((prev) => !prev)}
                  className="h-full flex items-center gap-1.5 px-3 py-2.5 border-r border-border/70 hover:bg-muted/50 rounded-l-xl text-sm font-medium text-foreground transition-colors cursor-pointer shrink-0"
                  aria-label="Select country phone code"
                  aria-haspopup="listbox"
                  aria-expanded={isPhoneCodeOpen}
                >
                  <span className="text-base leading-none">{selectedCountry.flag}</span>
                  <span className="text-xs font-mono text-foreground/85 font-medium">{selectedCountry.code}</span>
                  <svg
                    className={`w-3.5 h-3.5 text-foreground/40 transition-transform duration-200 ${
                      isPhoneCodeOpen ? "rotate-180 text-secondary" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {isPhoneCodeOpen && (
                  <ul
                    role="listbox"
                    className="absolute top-full left-0 mt-1.5 w-64 rounded-xl border border-border/80 bg-popover shadow-xl p-1.5 space-y-0.5 z-50 max-h-56 overflow-y-auto thin-scrollbar animate-card-fade-in text-xs"
                  >
                    {COUNTRY_CODES.map((c) => {
                      const isSelected = c.code === selectedCountry.code && c.name === selectedCountry.name;
                      return (
                        <li
                          key={`${c.name}-${c.code}`}
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => {
                            setSelectedCountry(c);
                            setIsPhoneCodeOpen(false);
                          }}
                          className={`rounded-lg px-2.5 py-2 flex items-center justify-between cursor-pointer transition-colors ${
                            isSelected
                              ? "bg-primary/15 text-primary font-semibold"
                              : "text-foreground/85 hover:bg-muted/80 hover:text-foreground"
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className="text-base leading-none">{c.flag}</span>
                            <span className="truncate">{c.name}</span>
                          </div>
                          <span className="font-mono text-foreground/50 ml-2 shrink-0 font-medium">{c.code}</span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              <input
                id="contact-phone"
                name="phone"
                type="tel"
                autoComplete="tel-national"
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className="w-full bg-transparent px-3 py-2.5 text-sm text-foreground placeholder:text-foreground/35 outline-none"
                placeholder={selectedCountry.placeholder}
              />
            </div>
          </div>
        </div>

        <div ref={selectRef} className="flex flex-col gap-1.5 text-xs sm:text-sm relative">
          <span className="font-semibold text-foreground/75">Service of Interest</span>
          <button
            type="button"
            id="contact-service-button"
            onClick={() => setIsSelectOpen((prev) => !prev)}
            className={`w-full flex items-center justify-between rounded-xl border bg-popover px-4 py-2.5 text-sm text-foreground outline-none transition-colors cursor-pointer text-left ${
              isSelectOpen
                ? "border-primary ring-1 ring-primary/30 shadow-xs"
                : "border-border/80 hover:border-border"
            }`}
            aria-haspopup="listbox"
            aria-expanded={isSelectOpen}
          >
            <span className="font-medium text-foreground truncate">
              {formData.service}
            </span>
            <svg
              className={`w-4 h-4 ml-2 shrink-0 text-foreground/50 transition-transform duration-200 ${
                isSelectOpen ? "rotate-180 text-primary" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {isSelectOpen && (
            <ul
              role="listbox"
              className="absolute top-full left-0 right-0 mt-1.5 rounded-2xl border border-border/80 bg-popover shadow-xl p-1.5 space-y-1 z-40 max-h-60 overflow-y-auto thin-scrollbar animate-card-fade-in"
            >
              {SERVICES.map((srv) => {
                const isSelected = formData.service === srv;
                return (
                  <li
                    key={srv}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      updateField("service", srv);
                      setIsSelectOpen(false);
                    }}
                    className={`rounded-xl px-3.5 py-2.5 text-sm flex items-center justify-between cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-primary/15 text-primary font-semibold"
                        : "text-foreground/80 hover:bg-muted/80 hover:text-foreground"
                    }`}
                  >
                    <span>{srv}</span>
                    {isSelected && (
                      <svg
                        className="w-4 h-4 text-primary shrink-0 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        aria-hidden="true"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <label htmlFor="contact-message" className="flex flex-col gap-1.5 text-xs sm:text-sm">
          <span className="font-semibold text-foreground/75">What&apos;s going on with your books?</span>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={(e) => updateField("message", e.target.value)}
            className="rounded-xl border border-border/80 bg-popover px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/35 outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors resize-none"
            placeholder="We're closing our first priced round and need audited financials by Q1."
          />
        </label>

        <Button
          type="submit"
          variant="dark"
          size="md"
          className="w-full py-3.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting Inquiry..." : "Submit Diagnostic Request"}
        </Button>

        {isMounted &&
          isSent &&
          createPortal(
            <div
              role="status"
              aria-live="polite"
              className={`fixed top-6 right-6 z-9999 max-w-[calc(100vw-3rem)] sm:max-w-md w-full bg-foreground text-background border border-primary/35 rounded-2xl p-4 sm:p-5 shadow-2xl flex items-start gap-3.5 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isToastVisible
                  ? "opacity-100 translate-y-0 translate-x-0 scale-100"
                  : "opacity-0 -translate-y-4 translate-x-4 scale-95 pointer-events-none"
              }`}
            >
              <div className="rounded-full bg-primary/20 p-1.5 shrink-0 text-primary mt-0.5">
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
              </div>
              <div className="flex-1 pr-1">
                <p className="font-semibold text-background text-sm">
                  Thank You for Contacting
                </p>
                <p className="mt-0.5 text-xs text-background/70 font-light">
                  Our team will reach out to you soon.
                </p>
              </div>
              <button
                type="button"
                onClick={handleCloseToast}
                className="text-background/40 hover:text-background p-1 rounded-lg transition-colors cursor-pointer shrink-0"
                aria-label="Close notification"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>,
            document.body
          )}

        {errorMessage && (
          <div className="mt-3 text-center text-xs text-destructive bg-destructive/10 border border-destructive/25 rounded-xl py-2.5 px-3">
            <p>{errorMessage}</p>
            <p className="mt-1 text-foreground/60">
              You can also write to us directly at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="underline font-semibold text-foreground">
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
