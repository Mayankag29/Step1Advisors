declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

export function trackGAEvent(action: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    try {
      window.gtag("event", action, params);
    } catch {
      return;
    }
  }
}
