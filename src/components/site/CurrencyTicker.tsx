import { TrendingDown, TrendingUp } from "lucide-react";
import { useCbarRates } from "@/hooks/use-cbar-rates";

export const CurrencyTicker = () => {
  const { currencies, isLoading } = useCbarRates();
  const items = [...currencies, ...currencies];

  return (
    <div className="border-y bg-card overflow-hidden" aria-live="polite" aria-atomic="true">
      {isLoading ? (
        <div className="flex whitespace-nowrap py-2.5 gap-6 px-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="h-5 w-5 rounded bg-muted animate-pulse" />
              <span className="h-4 w-8 rounded bg-muted animate-pulse" />
              <span className="h-4 w-16 rounded bg-muted animate-pulse" />
              <span className="h-4 w-10 rounded bg-muted animate-pulse" />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex animate-ticker will-change-transform transform-gpu whitespace-nowrap py-2.5">
          {items.map((c, i) => (
            <div key={i} className="flex items-center gap-2 px-6 text-sm">
              <span className="text-lg leading-none">{c.flag}</span>
              <span className="font-semibold">{c.code}</span>
              {/* eslint-disable-next-line i18next/no-literal-string */}
              <span className="text-muted-foreground">{c.sell.toFixed(4)} ₼</span>
              <span className={`flex items-center gap-0.5 text-xs font-medium ${c.change >= 0 ? "text-success" : "text-destructive"}`}>
                {c.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {Math.abs(c.change).toFixed(2)}%
              </span>
              <span className="text-border">•</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
