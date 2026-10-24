declare global {
  interface Window {
    clarity?: (command: string, ...args: unknown[]) => void;
  }
}

export function trackClarityEvent(eventName: string) {
  if (typeof window !== "undefined" && typeof window.clarity === "function") {
    try {
      window.clarity("event", eventName);
    } catch {
      return;
    }
  }
}
