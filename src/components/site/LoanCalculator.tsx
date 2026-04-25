import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, ArrowRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocalePath } from "@/i18n/locale-routing";

const fmt0 = (n: number) =>
  new Intl.NumberFormat("az-AZ", { maximumFractionDigits: 0 }).format(Math.round(n || 0));
const fmt2 = (n: number) =>
  new Intl.NumberFormat("az-AZ", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n || 0);

export type Method = "annuity" | "differentiated";
export type Row = { i: number; payment: number; principal: number; interest: number; balance: number };

export const buildSchedule = (amount: number, term: number, rate: number, method: Method): Row[] => {
  const r = rate / 100 / 12;
  const rows: Row[] = [];
  let balance = amount;
  if (method === "annuity") {
    const m = r === 0 ? amount / term : (amount * r) / (1 - Math.pow(1 + r, -term));
    for (let i = 1; i <= term; i++) {
      const interest = balance * r;
      const principal = m - interest;
      balance = Math.max(0, balance - principal);
      rows.push({ i, payment: m, principal, interest, balance });
    }
  } else {
    const principal = amount / term;
    for (let i = 1; i <= term; i++) {
      const interest = balance * r;
      const payment = principal + interest;
      balance = Math.max(0, balance - principal);
      rows.push({ i, payment, principal, interest, balance });
    }
  }
  return rows;
};

export const LoanCalculator = () => {
  const { t } = useTranslation();
  const lp = useLocalePath();
  const [amount, setAmount] = useState(10000);
  const [term, setTerm] = useState(24);
  const [rate, setRate] = useState(15);
  const [method, setMethod] = useState<Method>("annuity");
  const [showSchedule, setShowSchedule] = useState(false);

  const schedule = useMemo(() => buildSchedule(amount, term, rate, method), [amount, term, rate, method]);

  const totals = useMemo(() => {
    const totalPayment = schedule.reduce((s, r) => s + r.payment, 0);
    const totalInterest = schedule.reduce((s, r) => s + r.interest, 0);
    const firstPayment = schedule[0]?.payment ?? 0;
    const lastPayment = schedule[schedule.length - 1]?.payment ?? 0;
    return { totalPayment, totalInterest, firstPayment, lastPayment };
  }, [schedule]);

  return (
    <div className="grid lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 bg-card border border-border rounded-2xl p-6 md:p-8 shadow-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center">
            <Calculator className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">{t("calc.loan.title")}</h2>
            <p className="text-xs text-muted-foreground">{t("calc.loan.subtitle")}</p>
          </div>
        </div>

        <Tabs value={method} onValueChange={(v) => setMethod(v as Method)} className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="annuity">{t("calc.loan.method.annuity")}</TabsTrigger>
            <TabsTrigger value="differentiated">{t("calc.loan.method.differentiated")}</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-6">
          <Field label={t("calc.loan.field.amount")} unit="₼" value={amount} onChange={setAmount} min={300} max={150000} step={100} />
          <Field label={t("calc.loan.field.term")} unit={t("common.month")} value={term} onChange={setTerm} min={3} max={120} step={1} />
          <Field label={t("calc.loan.field.rate")} unit="%" value={rate} onChange={setRate} min={5} max={30} step={0.1} decimals={1} />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button type="button" variant="outline" className="rounded-full" onClick={() => setShowSchedule((s) => !s)}>
            {showSchedule ? t("calc.loan.hideSchedule") : t("calc.loan.showSchedule")}
          </Button>
          <Button asChild className="rounded-full">
            <Link to={lp("/kreditler")}>
              {t("calc.loan.viewLoans")} <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        <div className="rounded-2xl p-6 bg-gradient-primary text-primary-foreground shadow-glow">
          <div className="text-xs uppercase tracking-wider opacity-80">{t("calc.loan.monthly")}</div>
          {/* eslint-disable-next-line i18next/no-literal-string */}
          <div className="mt-1 text-4xl font-bold">{fmt2(totals.firstPayment)} ₼</div>
          {method === "differentiated" && (
            <div className="text-xs opacity-80 mt-1">
              {t("calc.loan.firstLast", { value: fmt2(totals.lastPayment) })}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Stat label={t("calc.loan.totalPayment")} value={`${fmt0(totals.totalPayment)} ₼`} />
          <Stat label={t("calc.loan.totalInterest")} value={`${fmt0(totals.totalInterest)} ₼`} accent />
          <Stat label={t("calc.loan.principal")} value={`${fmt0(amount)} ₼`} />
          <Stat label={t("calc.loan.termLabel")} value={`${term} ${t("common.month")}`} />
        </div>

        <div className="rounded-xl border border-border bg-muted/40 p-4 text-xs text-muted-foreground flex gap-2">
          <TrendingUp className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          {t("calc.loan.disclaimer")}
        </div>
      </div>

      {showSchedule && (
        <div className="lg:col-span-5 bg-card border border-border rounded-2xl shadow-card overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold">{t("calc.loan.scheduleTitle")}</h3>
            <span className="text-xs text-muted-foreground">{t("calc.loan.scheduleMonths", { n: schedule.length })}</span>
          </div>
          <div className="overflow-x-auto max-h-[420px]">
            <table className="w-full text-sm whitespace-nowrap min-w-[500px]">
              <thead className="bg-muted/60 sticky top-0">
                <tr className="text-left text-xs uppercase text-muted-foreground">
                  <th className="px-4 py-3">{t("calc.loan.th.month")}</th>
                  <th className="px-4 py-3">{t("calc.loan.th.payment")}</th>
                  <th className="px-4 py-3">{t("calc.loan.th.principal")}</th>
                  <th className="px-4 py-3">{t("calc.loan.th.interest")}</th>
                  <th className="px-4 py-3 text-right">{t("calc.loan.th.balance")}</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((r) => (
                  <tr key={r.i} className="border-t border-border/60 hover:bg-muted/30">
                    <td className="px-4 py-2.5 font-medium">{r.i}</td>
                    {/* eslint-disable-next-line i18next/no-literal-string */}
                    <td className="px-4 py-2.5">{fmt2(r.payment)} ₼</td>
                    {/* eslint-disable-next-line i18next/no-literal-string */}
                    <td className="px-4 py-2.5">{fmt2(r.principal)} ₼</td>
                    {/* eslint-disable-next-line i18next/no-literal-string */}
                    <td className="px-4 py-2.5 text-accent">{fmt2(r.interest)} ₼</td>
                    {/* eslint-disable-next-line i18next/no-literal-string */}
                    <td className="px-4 py-2.5 text-right text-muted-foreground">{fmt2(r.balance)} ₼</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

const Field = ({
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
      <span>{min} {unit}</span>
      <span>{max} {unit}</span>
    </div>
  </div>
);

const Stat = ({ label, value, accent }: { label: string; value: string; accent?: boolean }) => (
  <div className="rounded-xl border border-border bg-card p-4 shadow-card">
    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    <div className={`mt-1 text-lg font-bold ${accent ? "text-accent" : "text-foreground"}`}>{value}</div>
  </div>
);
