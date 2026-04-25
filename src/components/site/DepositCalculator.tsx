import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PiggyBank, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocalePath } from "@/i18n/locale-routing";

const fmt0 = (n: number) =>
  new Intl.NumberFormat("az-AZ", { maximumFractionDigits: 0 }).format(Math.round(n || 0));
const fmt2 = (n: number) =>
  new Intl.NumberFormat("az-AZ", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n || 0);

export type Mode = "simple" | "capitalized";
export type Currency = "AZN" | "USD" | "EUR";
const symbols: Record<Currency, string> = { AZN: "₼", USD: "$", EUR: "€" };

export const calculateDeposit = (amount: number, term: number, rate: number, mode: Mode) => {
  const years = term / 12;
  if (mode === "simple") {
    const interest = amount * (rate / 100) * years;
    const monthly = interest / term;
    return { interest, monthly, total: amount + interest };
  }
  const r = rate / 100 / 12;
  const total = amount * Math.pow(1 + r, term);
  const interest = total - amount;
  const monthly = interest / term;
  return { interest, monthly, total };
};

export const DepositCalculator = () => {
  const { t } = useTranslation();
  const lp = useLocalePath();
  const [amount, setAmount] = useState(5000);
  const [term, setTerm] = useState(12);
  const [rate, setRate] = useState(9);
  const [currency, setCurrency] = useState<Currency>("AZN");
  const [mode, setMode] = useState<Mode>("simple");

  const result = useMemo(() => calculateDeposit(amount, term, rate, mode), [amount, term, rate, mode]);

  const sym = symbols[currency];

  return (
    <div className="grid lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 bg-card border border-border rounded-2xl p-6 md:p-8 shadow-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-gradient-gold flex items-center justify-center">
            <PiggyBank className="h-5 w-5 text-accent-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">{t("calc.deposit.title")}</h2>
            <p className="text-xs text-muted-foreground">{t("calc.deposit.subtitle")}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="simple">{t("calc.deposit.mode.simple")}</TabsTrigger>
              <TabsTrigger value="capitalized">{t("calc.deposit.mode.capitalized")}</TabsTrigger>
            </TabsList>
          </Tabs>
          <Select value={currency} onValueChange={(v) => setCurrency(v as Currency)}>
            <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="AZN">{t("lists.currencyOptions.azn")}</SelectItem>
              <SelectItem value="USD">{t("lists.currencyOptions.usd")}</SelectItem>
              <SelectItem value="EUR">{t("lists.currencyOptions.eur")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-6">
          <NumField label={t("calc.deposit.field.amount")} unit={sym} value={amount} onChange={setAmount} min={100} max={500000} step={100} />
          <NumField label={t("calc.deposit.field.term")} unit={t("common.month")} value={term} onChange={setTerm} min={1} max={60} step={1} />
          <NumField label={t("calc.deposit.field.rate")} unit="%" value={rate} onChange={setRate} min={0.5} max={20} step={0.1} decimals={1} />
        </div>

        <div className="mt-6">
          <Button asChild className="rounded-full">
            <Link to={lp("/depozit")}>{t("calc.deposit.viewDeposits")} <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        <div className="rounded-2xl p-6 bg-gradient-primary text-primary-foreground shadow-glow">
          <div className="text-xs uppercase tracking-wider opacity-80">{t("calc.deposit.totalAtEnd")}</div>
          <div className="mt-1 text-4xl font-bold">{fmt2(result.total)} {sym}</div>
          <div className="text-xs opacity-80 mt-1">{t("calc.deposit.principalPlusInterest")}</div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Stat label={t("calc.deposit.interestEarned")} value={`${fmt2(result.interest)} ${sym}`} accent />
          <Stat label={t("calc.deposit.monthlyAvg")} value={`${fmt2(result.monthly)} ${sym}`} />
          <Stat label={t("calc.deposit.initial")} value={`${fmt0(amount)} ${sym}`} />
          <Stat label={t("calc.deposit.effectiveAnnual")} value={`${(((result.total / amount) ** (12 / term) - 1) * 100).toFixed(2)}%`} />
        </div>

        <div className="rounded-xl border border-border bg-muted/40 p-4 text-xs text-muted-foreground flex gap-2">
          <Sparkles className="h-4 w-4 text-accent shrink-0 mt-0.5" />
          {t("calc.deposit.disclaimer")}
        </div>
      </div>
    </div>
  );
};

const NumField = ({
  label, unit, value, onChange, min, max, step, decimals = 0,
}: { label: string; unit: string; value: number; onChange: (v: number) => void; min: number; max: number; step: number; decimals?: number }) => (
  <div>
    <div className="flex items-center justify-between mb-2">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</label>
      <div className="flex items-center gap-1">
        <Input
          type="number"
          value={Number.isFinite(value) ? value : 0}
          min={min} max={max} step={step}
          onChange={(e) => {
            const n = Number(e.target.value);
            if (!Number.isFinite(n)) return;
            onChange(Math.min(max, Math.max(min, decimals ? Number(n.toFixed(decimals)) : Math.round(n))));
          }}
          className="h-9 w-28 text-right font-semibold"
        />
        <span className="text-sm text-muted-foreground w-6">{unit}</span>
      </div>
    </div>
    <Slider value={[value]} min={min} max={max} step={step} onValueChange={(v) => onChange(v[0])} />
    <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
      <span>{min} {unit}</span><span>{max} {unit}</span>
    </div>
  </div>
);

const Stat = ({ label, value, accent }: { label: string; value: string; accent?: boolean }) => (
  <div className="rounded-xl border border-border bg-card p-4 shadow-card">
    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    <div className={`mt-1 text-lg font-bold ${accent ? "text-accent" : "text-foreground"}`}>{value}</div>
  </div>
);
