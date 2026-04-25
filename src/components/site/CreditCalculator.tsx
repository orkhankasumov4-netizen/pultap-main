import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocalePath } from "@/i18n/locale-routing";

const fmt = (n: number, locale: string) =>
  new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(n);

export const CreditCalculator = ({ compact = false }: { compact?: boolean }) => {
  const { t, i18n } = useTranslation();
  const lp = useLocalePath();
  const localeTag = i18n.language === "ru" ? "ru-RU" : i18n.language === "en" ? "en-US" : "az-AZ";

  const [amount, setAmount] = useState(5000);
  const [term, setTerm] = useState(24);
  const [rate, setRate] = useState(15);

  const { monthly, total, interest } = useMemo(() => {
    const r = rate / 100 / 12;
    const m = (amount * r) / (1 - Math.pow(1 + r, -term));
    return { monthly: m, total: m * term, interest: m * term - amount };
  }, [amount, term, rate]);

  return (
    <div className={`glass rounded-2xl p-6 md:p-7 ${compact ? "" : "shadow-elegant"}`}>
      <div className="flex items-center gap-2 mb-5">
        <div className="h-9 w-9 rounded-lg bg-gradient-primary flex items-center justify-center">
          <Calculator className="h-4 w-4 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-semibold text-base">{t("calc.loan.title")}</h3>
          <p className="text-xs text-muted-foreground">{t("calc.loan.subtitle")}</p>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t("calc.loan.field.amount")}</label>
            {/* eslint-disable-next-line i18next/no-literal-string */}
            <span className="text-lg font-bold">{fmt(amount, localeTag)} ₼</span>
          </div>
          <Slider value={[amount]} min={500} max={50000} step={500} onValueChange={v => setAmount(v[0])} />
        </div>
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t("calc.loan.field.term")}</label>
            <span className="text-lg font-bold">{term} {t("common.month")}</span>
          </div>
          <Slider value={[term]} min={3} max={84} step={1} onValueChange={v => setTerm(v[0])} />
        </div>
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t("calc.loan.field.rate")}</label>
            <span className="text-lg font-bold">{rate.toFixed(1)}%</span>
          </div>
          <Slider value={[rate]} min={6} max={25} step={0.5} onValueChange={v => setRate(v[0])} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2 p-4 rounded-xl bg-gradient-primary text-primary-foreground">
        <div>
          <div className="text-[10px] uppercase opacity-80 tracking-wider">{t("calc.loan.monthly")}</div>
          {/* eslint-disable-next-line i18next/no-literal-string */}
          <div className="text-lg font-bold leading-tight">{fmt(monthly, localeTag)} ₼</div>
        </div>
        <div>
          <div className="text-[10px] uppercase opacity-80 tracking-wider">{t("calc.loan.totalPayment")}</div>
          {/* eslint-disable-next-line i18next/no-literal-string */}
          <div className="text-lg font-bold leading-tight">{fmt(total, localeTag)} ₼</div>
        </div>
        <div>
          <div className="text-[10px] uppercase opacity-80 tracking-wider">{t("calc.loan.totalInterest")}</div>
          {/* eslint-disable-next-line i18next/no-literal-string */}
          <div className="text-lg font-bold leading-tight">{fmt(interest, localeTag)} ₼</div>
        </div>
      </div>

      <Button asChild className="w-full mt-4 rounded-full bg-secondary hover:bg-secondary/90">
        <Link to={lp("/kreditler")}>{t("calc.loan.viewLoans")} <ArrowRight className="h-4 w-4" /></Link>
      </Button>
    </div>
  );
};
