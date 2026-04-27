/**
 * Google Analytics 4 — utility helpers
 * Consent Mode v2 compliant: no data is sent until user accepts cookies.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const GA_ID = "G-RMRX15YBPK";

/** Grant all analytics consent (called when user accepts cookie banner) */
export const grantConsent = () => {
  if (typeof window.gtag !== "function") return;
  window.gtag("consent", "update", {
    analytics_storage: "granted",
    ad_storage: "denied",          // keep ads denied unless you run GA ads
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  // Send the first page view now that consent is granted
  window.gtag("config", GA_ID, {
    page_path: window.location.pathname + window.location.search,
  });
};

/** Deny all analytics consent (called when user declines cookie banner) */
export const denyConsent = () => {
  if (typeof window.gtag !== "function") return;
  window.gtag("consent", "update", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
};

/** Track a page view — call this on route change (only fires if consent is granted) */
export const trackPageView = (path: string) => {
  if (typeof window.gtag !== "function") return;
  window.gtag("config", GA_ID, { page_path: path });
};

/** Track a custom event — e.g. trackEvent("credit_apply", { bank: "ABB" }) */
export const trackEvent = (
  eventName: string,
  params?: Record<string, unknown>
) => {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params ?? {});
};
