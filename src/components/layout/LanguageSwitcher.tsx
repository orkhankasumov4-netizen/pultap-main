import { Check, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LOCALE_FULL_LABELS,
  LOCALE_LABELS,
  Locale,
  SUPPORTED_LOCALES,
} from "@/i18n/config";
import { useSwitchLocale, useUrlLocale } from "@/i18n/locale-routing";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

type Variant = "topbar" | "mobile";

export const LanguageSwitcher = ({ variant = "topbar" }: { variant?: Variant }) => {
  const current = useUrlLocale();
  const switchLocale = useSwitchLocale();
  const { t } = useTranslation();

  if (variant === "mobile") {
    return (
      <div className="flex items-center justify-center gap-1 text-xs" role="group" aria-label={t("language.switch")}>
        {SUPPORTED_LOCALES.map((l, idx) => (
          <span key={l} className="flex items-center gap-1">
            {idx > 0 && <span className="text-muted-foreground">·</span>}
            <button
              type="button"
              onClick={() => switchLocale(l)}
              aria-current={l === current ? "true" : undefined}
              className={cn(
                "transition",
                l === current
                  ? "font-semibold text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              {LOCALE_LABELS[l]}
            </button>
          </span>
        ))}
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex items-center gap-1 text-xs font-medium text-secondary-foreground/80 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded px-1.5 py-0.5"
        aria-label={t("language.switch")}
      >
        <Globe className="h-3 w-3" />
        {LOCALE_LABELS[current]}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]">
        {SUPPORTED_LOCALES.map((l: Locale) => (
          <DropdownMenuItem
            key={l}
            onSelect={() => switchLocale(l)}
            className="flex items-center justify-between gap-3"
          >
            <span className="flex items-center gap-2">
              <span className="font-mono text-xs w-6 text-muted-foreground">
                {LOCALE_LABELS[l]}
              </span>
              {LOCALE_FULL_LABELS[l]}
            </span>
            {l === current && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
