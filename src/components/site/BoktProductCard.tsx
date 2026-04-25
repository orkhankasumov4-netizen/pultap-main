import { BoktProduct, boktById } from "@/data/finance";
import { useTranslation } from "react-i18next";
import { Star, Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ApplicationDialog } from "./ApplicationDialog";

const fmt = (n: number) => new Intl.NumberFormat("az-AZ").format(n);

export const BoktProductCard = ({ product }: { product: BoktProduct }) => {
  const { t } = useTranslation();
  const b = boktById(product.boktId);
  return (
    <article className="group bg-card flex flex-col h-full rounded-2xl p-5 shadow-card hover:shadow-elegant transition-all hover:-translate-y-0.5 border border-border">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl flex items-center justify-center font-bold text-white shrink-0 shadow-sm"
            style={{ width: 44, height: 44, background: b.logoColor, fontSize: 16 }}>
            {b.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
          </div>
          <div>
            <h3 className="font-semibold text-sm leading-tight">{product.name}</h3>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
              <span>{b.name}</span>
              <span className="text-border">•</span>
              <Star className="h-3 w-3 fill-accent text-accent" />
              <span>{b.rating}</span>
            </div>
          </div>
        </div>
        {product.highlight && (
          <Badge className="bg-accent/15 text-accent-foreground dark:text-accent border-accent/30 shrink-0">
            <Zap className="h-3 w-3 mr-1" />{product.highlight}
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-muted rounded-xl p-3">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("card.rate")}</div>
          <div className="font-bold text-primary text-base">{product.rate}%</div>
        </div>
        <div className="bg-muted rounded-xl p-3">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("card.amount")}</div>
          {/* eslint-disable-next-line i18next/no-literal-string */}
          <div className="font-bold text-sm">{fmt(product.amountMax)} ₼</div>
        </div>
        <div className="bg-muted rounded-xl p-3">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("card.term")}</div>
          <div className="font-bold text-sm">{product.termMax} {t("common.month")}</div>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Check className="h-3 w-3 text-success" /> {product.collateral ? t("card.withCollateral") : t("card.withoutCollateral")}
        </span>
        <span className="flex items-center gap-1">
          <Check className="h-3 w-3 text-success" /> {product.type === "lombard" ? t("card.lombard") : t("card.cash")}
        </span>
      </div>

      <ApplicationDialog 
        productName={product.name} 
        productType={product.type === "lombard" ? "Lombard" : "Nağd Kredit"}
        trigger={
          <Button className="w-full rounded-full bg-gradient-primary hover:opacity-90 mt-auto">
            {t("common.apply")}
          </Button>
        } 
      />
    </article>
  );
};
