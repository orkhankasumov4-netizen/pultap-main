import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Cookie, X, Check, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocalePath } from "@/i18n/locale-routing";
import { cn } from "@/lib/utils";
import { grantConsent, denyConsent } from "@/lib/analytics";

const CONSENT_KEY = "pultap-cookie-consent";

type ConsentStatus = "accepted" | "declined" | null;

export const CookieConsent = () => {
  const { t } = useTranslation();
  const lp = useLocalePath();
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY) as ConsentStatus;
    // If previously accepted, silently grant consent to GA on revisit
    if (stored === "accepted") {
      grantConsent();
      return;
    }
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = (status: "accepted" | "declined") => {
    // Update GA consent based on user choice
    if (status === "accepted") {
      grantConsent();
    } else {
      denyConsent();
    }

    setLeaving(true);
    setTimeout(() => {
      localStorage.setItem(CONSENT_KEY, status);
      setVisible(false);
      setLeaving(false);
    }, 350);
  };

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-[420px] z-[9999]",
        "bg-card/95 backdrop-blur-md border border-border shadow-2xl rounded-2xl p-5",
        "transition-all duration-350",
        leaving
          ? "opacity-0 translate-y-4 pointer-events-none"
          : "opacity-100 translate-y-0"
      )}
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
          <Cookie className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3
            id="cookie-consent-title"
            className="font-semibold text-base leading-tight"
          >
            {t("cookieConsent.title")}
          </h3>
          <p
            id="cookie-consent-desc"
            className="text-muted-foreground text-sm mt-1 leading-relaxed"
          >
            {t("cookieConsent.description")}{" "}
            <Link
              to={lp("/kuki-siyaseti")}
              className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
            >
              {t("cookieConsent.learnMore")}
            </Link>
          </p>
        </div>
        <button
          onClick={() => dismiss("declined")}
          className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
          aria-label={t("cookieConsent.decline")}
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-4">
        <Button
          size="sm"
          variant="outline"
          className="flex-1 gap-1.5"
          onClick={() => dismiss("declined")}
        >
          <Settings2 className="h-3.5 w-3.5" />
          {t("cookieConsent.decline")}
        </Button>
        <Button
          size="sm"
          className="flex-1 gap-1.5"
          onClick={() => dismiss("accepted")}
        >
          <Check className="h-3.5 w-3.5" />
          {t("cookieConsent.accept")}
        </Button>
      </div>
    </div>
  );
};
