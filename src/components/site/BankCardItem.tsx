import { Card } from "@/data/finance";
import { useTranslation } from "react-i18next";
import { BankLogo } from "./BankLogo";
import { CreditCard as CCIcon, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBanks } from "@/hooks/use-finance-api";

const fmt = (n: number) => new Intl.NumberFormat("az-AZ").format(n);

export const BankCardItem = ({ card }: { card: Card }) => {
  const { t } = useTranslation();
  const { data: banks = [] } = useBanks();
  const bank = banks.find(b => b.id === card.bankId);
  if (!bank) return null;
  return (
    <article className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elegant transition-all hover:-translate-y-0.5 border border-border">
      <div className="relative h-40 p-5 text-white flex flex-col justify-between"
        style={{ background: `linear-gradient(135deg, ${bank.logoColor}, hsl(217 91% 35%))` }}>
        <div className="flex items-center justify-between">
          <BankLogo id={bank.id} size={36} />
          <CCIcon className="h-7 w-7 opacity-80" />
        </div>
        <div>
          <div className="text-xs opacity-80 uppercase tracking-widest">{card.kind === "kredit" ? t("card.kindCredit") : t("card.kindDebit")}</div>
          <div className="text-lg font-semibold">{card.name}</div>
        </div>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-muted rounded-xl p-3">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("card.cashback")}</div>
            <div className="font-bold text-primary text-base">{card.cashback}%</div>
          </div>
          <div className="bg-muted rounded-xl p-3">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("card.annual")}</div>
            <div className="font-bold text-sm">{card.annualFee === 0 ? t("common.free") : `${card.annualFee} ₼`}</div>
          </div>
          <div className="bg-muted rounded-xl p-3">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("card.limit")}</div>
            <div className="font-bold text-sm">{card.limit ? `${fmt(card.limit)} ₼` : "—"}</div>
          </div>
        </div>

        <ul className="space-y-1.5 mb-4">
          {card.perks.map((p) => (
            <li key={p} className="flex items-center gap-2 text-xs text-muted-foreground">
              <Check className="h-3.5 w-3.5 text-success shrink-0" /> {p}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between">
          <Badge variant="outline" className="rounded-full text-[10px]">{bank.name}</Badge>
          <Button size="sm" className="rounded-full bg-gradient-primary hover:opacity-90">{t("common.order")}</Button>
        </div>
      </div>
    </article>
  );
};
