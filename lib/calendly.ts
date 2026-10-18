declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: {
        url: string;
        prefill?: Record<string, unknown>;
        utm?: Record<string, unknown>;
      }) => void;
      closePopupWidget?: () => void;
    };
  }
}

export const BRAND_CALENDLY_COLORS = {
  background: "faf8f5",
  text: "17140f",
  primary: "c79a5c",
} as const;

export const DEFAULT_CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/welcome-step1advisors/30min";

export function buildBrandedCalendlyUrl(baseUrl: string): string {
  try {
    const parsed = new URL(baseUrl);
    if (!parsed.searchParams.has("background_color")) {
      parsed.searchParams.set("background_color", BRAND_CALENDLY_COLORS.background);
    }
    if (!parsed.searchParams.has("text_color")) {
      parsed.searchParams.set("text_color", BRAND_CALENDLY_COLORS.text);
    }
    if (!parsed.searchParams.has("primary_color")) {
      parsed.searchParams.set("primary_color", BRAND_CALENDLY_COLORS.primary);
    }
    return parsed.toString();
  } catch {
    const sep = baseUrl.includes("?") ? "&" : "?";
    return `${baseUrl}${sep}background_color=${BRAND_CALENDLY_COLORS.background}&text_color=${BRAND_CALENDLY_COLORS.text}&primary_color=${BRAND_CALENDLY_COLORS.primary}`;
  }
}

export function openCalendly(url: string = DEFAULT_CALENDLY_URL) {
  if (typeof window === "undefined") return;

  const brandedUrl = buildBrandedCalendlyUrl(url);

  if (!document.getElementById("calendly-widget-css")) {
    const link = document.createElement("link");
    link.id = "calendly-widget-css";
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }

  if (window.Calendly && typeof window.Calendly.initPopupWidget === "function") {
    window.Calendly.initPopupWidget({ url: brandedUrl });
    return;
  }

  let script = document.getElementById("calendly-widget-js") as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.id = "calendly-widget-js";
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }

  script.addEventListener(
    "load",
    () => {
      if (window.Calendly && typeof window.Calendly.initPopupWidget === "function") {
        window.Calendly.initPopupWidget({ url: brandedUrl });
      }
    },
    { once: true }
  );
}
