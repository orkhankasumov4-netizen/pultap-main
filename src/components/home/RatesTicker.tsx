import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useCbarRates } from "@/hooks/use-cbar-rates";
import { useLocalePath } from "@/i18n/locale-routing";

export const RatesTicker = () => {
  const { t } = useTranslation();
  const lp = useLocalePath();
  const { currencies, isLoading } = useCbarRates();
  const items = [...currencies, ...currencies];

  return (
    <div className="bg-secondary text-secondary-foreground border-y border-white/5">
      <div className="container flex items-center gap-4 h-11 overflow-hidden">
        <Link to={lp("/valyuta-kurslar")} className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-accent hover:text-white transition-colors">
          {t("home.ticker.title")}
        </Link>
        <div className="flex-1 overflow-hidden relative" aria-live="polite" aria-atomic="true">
          {isLoading ? (
            <div className="flex gap-7 whitespace-nowrap">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className="inline-flex items-center gap-2">
                  <span className="h-3 w-6 rounded bg-white/10 animate-pulse" />
                  <span className="h-3 w-10 rounded bg-white/10 animate-pulse" />
                  <span className="h-3 w-14 rounded bg-white/10 animate-pulse" />
                </span>
              ))}
            </div>
          ) : (
            <div className="flex gap-7 animate-ticker whitespace-nowrap">
              {items.map((c, i) => {
                const up = c.change >= 0;
                const Trend = up ? TrendingUp : TrendingDown;
                return (
                  <span key={`${c.code}-${i}`} className="inline-flex items-center gap-2 text-xs">
                    <span className="opacity-70">{c.flag}</span>
                    <span className="font-semibold">{c.code}</span>
                    <span className="text-white/90">{c.sell.toFixed(4)}</span>
                    <span className={`inline-flex items-center gap-0.5 ${up ? "text-success" : "text-destructive"}`}>
                      <Trend className="h-3 w-3" />
                      {Math.abs(c.change).toFixed(2)}%
                    </span>
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
