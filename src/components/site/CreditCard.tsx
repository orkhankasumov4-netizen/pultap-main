import { Credit, bankById } from "@/data/finance";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { BankLogo } from "./BankLogo";
import { Star, Check, X, Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocalePath } from "@/i18n/locale-routing";

const fmt = (n: number) => new Intl.NumberFormat("az-AZ").format(n);

export const CreditCard = ({
  credit, selected, onToggleCompare,
}: {
  credit: Credit;
  selected?: boolean;
  onToggleCompare?: (id: string) => void;
}) => {
  const { t } = useTranslation();
  const lp = useLocalePath();
  const bank = bankById(credit.bankId);
  return (
    <article className="group bg-card rounded-2xl p-5 shadow-card hover:shadow-elegant transition-all hover:-translate-y-0.5 border">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <BankLogo id={bank.id} size={44} />
          <div>
            <h3 className="font-semibold text-sm leading-tight">{credit.name}</h3>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
              <span>{bank.name}</span>
              <span className="text-border">•</span>
              <Star className="h-3 w-3 fill-accent text-accent" />
              <span>{bank.rating}</span>
            </div>
          </div>
        </div>
        {credit.highlight && (
          <Badge className="bg-accent/15 text-accent-foreground dark:text-accent border-accent/30 hover:bg-accent/20 shrink-0">
            {credit.highlight}
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-muted rounded-xl p-3">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("card.rate")}</div>
          <div className="font-bold text-primary text-base">{credit.rate}%</div>
        </div>
        <div className="bg-muted rounded-xl p-3">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("card.amount")}</div>
          {/* eslint-disable-next-line i18next/no-literal-string */}
          <div className="font-bold text-sm">{fmt(credit.amountMax)} ₼</div>
        </div>
        <div className="bg-muted rounded-xl p-3">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("card.term")}</div>
          <div className="font-bold text-sm">{credit.termMax} {t("common.month")}</div>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          {credit.collateral ? <Check className="h-3 w-3 text-success" /> : <X className="h-3 w-3" />} {t("lists.collateral")}
        </span>
        <span className="flex items-center gap-1">
          {credit.insurance ? <Check className="h-3 w-3 text-success" /> : <X className="h-3 w-3" />} {t("lists.insurance")}
        </span>
      </div>

      <div className="flex gap-2">
        <Button asChild className="flex-1 rounded-full bg-gradient-primary hover:opacity-90">
          <Link to={lp(`/kreditler/${credit.id}`)}>
            {t("institutions.details")} <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        {onToggleCompare && (
          <Button variant={selected ? "default" : "outline"} size="icon" className="rounded-full shrink-0"
            onClick={() => onToggleCompare(credit.id)} aria-label={t("common.addToCompare")}>
            {selected ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </Button>
        )}
      </div>
    </article>
  );
};
