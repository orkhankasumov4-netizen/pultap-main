import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowDownUp, RefreshCw } from "lucide-react";
import { useCbarRates } from "@/hooks/use-cbar-rates";

type Code = "AZN" | "USD" | "EUR" | "RUB" | "TRY" | "GBP" | "GEL";

const flags: Record<Code, string> = {
  AZN: "🇦🇿", USD: "🇺🇸", EUR: "🇪🇺", RUB: "🇷🇺", TRY: "🇹🇷", GBP: "🇬🇧", GEL: "🇬🇪",
};

const fmt = (n: number, d = 4) =>
  new Intl.NumberFormat("az-AZ", { minimumFractionDigits: 2, maximumFractionDigits: d }).format(n || 0);

type Props = { from?: Code; to?: Code; locked?: boolean; title?: string };

export const Converter = ({ from = "USD", to = "AZN", locked = false, title }: Props) => {
  const { t } = useTranslation();
  const { currencies, isLoading, isLive } = useCbarRates();

  const rates = useMemo(() => {
    const map: Record<string, number> = { AZN: 1 };
    currencies.forEach((c) => { map[c.code] = (c.buy + c.sell) / 2; });
    return map as Record<Code, number>;
  }, [currencies]);

  const [fromCur, setFromCur] = useState<Code>(from);
  const [toCur, setToCur] = useState<Code>(to);
  const [amount, setAmount] = useState<number>(100);

  const converted = useMemo(() => {
    const inAzn = amount * (rates[fromCur] ?? 1);
    return inAzn / (rates[toCur] ?? 1);
  }, [amount, fromCur, toCur, rates]);

  const rate = useMemo(() => (rates[fromCur] ?? 1) / (rates[toCur] ?? 1), [fromCur, toCur, rates]);

  const swap = () => { setFromCur(toCur); setToCur(fromCur); };

  const codes = Object.keys(flags) as Code[];

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-card">
        {title && <h2 className="font-semibold text-lg mb-5">{title}</h2>}
        <div className="space-y-4">
          <div className="h-12 rounded-lg bg-muted animate-pulse" />
          <div className="h-12 rounded-lg bg-muted animate-pulse" />
          <div className="h-8 rounded-lg bg-muted animate-pulse w-1/2" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-card">
      {title && <h2 className="font-semibold text-lg mb-5">{title}</h2>}

      <div className="grid md:grid-cols-[1fr_auto_1fr] gap-3 items-end">
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t("converter.youGive")}</label>
          <div className="mt-2 flex gap-2">
            <Input type="number" value={Number.isFinite(amount) ? amount : 0} min={0} step="any"
              onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
              className="h-12 text-lg font-semibold" />
            <Select value={fromCur} onValueChange={(v) => setFromCur(v as Code)} disabled={locked}>
              <SelectTrigger className="h-12 w-32"><SelectValue /></SelectTrigger>
              <SelectContent>
                {codes.map((c) => (<SelectItem key={c} value={c}>{flags[c]} {c}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button type="button" variant="outline" size="icon" className="h-12 w-12 rounded-full self-end mx-auto"
          onClick={swap} disabled={locked} aria-label={t("common.swap")}>
          <ArrowDownUp className="h-4 w-4" />
        </Button>

        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t("converter.youGet")}</label>
          <div className="mt-2 flex gap-2">
            <Input type="text" readOnly value={fmt(converted)} className="h-12 text-lg font-semibold bg-muted/40" />
            <Select value={toCur} onValueChange={(v) => setToCur(v as Code)} disabled={locked}>
              <SelectTrigger className="h-12 w-32"><SelectValue /></SelectTrigger>
              <SelectContent>
                {codes.map((c) => (<SelectItem key={c} value={c}>{flags[c]} {c}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between text-sm">
        <div className="text-muted-foreground">
          <span className="font-medium text-foreground">1 {fromCur}</span> = {fmt(rate)} {toCur}
        </div>
        <div className="flex items-center gap-2">
          {isLive && (
            <span className="inline-flex items-center gap-1 text-xs text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              CBAR
            </span>
          )}
          <Button type="button" variant="ghost" size="sm" onClick={() => setAmount((a) => a)} className="gap-2 text-xs">
            <RefreshCw className="h-3.5 w-3.5" /> {t("converter.cbarRates")}
          </Button>
        </div>
      </div>
    </div>
  );
};
