import { Deposit, bankById } from "@/data/finance";
import { useTranslation } from "react-i18next";
import { BankLogo } from "./BankLogo";
import { Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { ApplicationDialog } from "./ApplicationDialog";

const fmt = (n: number) => new Intl.NumberFormat("az-AZ").format(n);

export const DepositCard = ({ deposit }: { deposit: Deposit }) => {
  const { t } = useTranslation();
  const bank = bankById(deposit.bankId);
  const sym = deposit.currency === "AZN" ? "₼" : deposit.currency === "USD" ? "$" : "€";
  return (
    <article className="group bg-card rounded-2xl p-5 shadow-card hover:shadow-elegant transition-all hover:-translate-y-0.5 border border-border">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <BankLogo id={bank.id} size={44} />
          <div>
            <h3 className="font-semibold text-sm leading-tight">{deposit.name}</h3>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
              <span>{bank.name}</span>
              <span className="text-border">•</span>
              <Star className="h-3 w-3 fill-accent text-accent" />
              <span>{bank.rating}</span>
            </div>
          </div>
        </div>
        <Badge className="bg-success/15 text-success border-success/30 hover:bg-success/20">
          <TrendingUp className="h-3 w-3 mr-1" />{deposit.rate}%
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-muted rounded-xl p-3">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("card.rate")}</div>
          <div className="font-bold text-primary text-base">{deposit.rate}%</div>
        </div>
        <div className="bg-muted rounded-xl p-3">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("card.term")}</div>
          <div className="font-bold text-sm">{deposit.termMonths} {t("common.month")}</div>
        </div>
        <div className="bg-muted rounded-xl p-3">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("card.min")}</div>
          <div className="font-bold text-sm">{fmt(deposit.minAmount)} {sym}</div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4 text-xs">
        <Badge variant="outline" className="rounded-full">{deposit.currency}</Badge>
        <span className="text-muted-foreground">{t("card.interestMonthly")}</span>
      </div>

      <ApplicationDialog 
        productName={deposit.name} 
        productType="Depozit"
        trigger={
          <Button className="w-full rounded-full bg-gradient-primary hover:opacity-90">
            {t("common.apply")}
          </Button>
        } 
      />
    </article>
  );
};
