import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Wallet, PiggyBank, CreditCard, Home, Landmark, ArrowLeftRight,
  Calculator, Building2, ArrowRight,
} from "lucide-react";
import { useLocalePath } from "@/i18n/locale-routing";

const items = [
  { to: "/kreditler",                       icon: Wallet,         k: "credits" },
  { to: "/bokt-kredit",                     icon: Landmark,       k: "bokt" },
  { to: "/depozit",                         icon: PiggyBank,      k: "deposits" },
  { to: "/bank-kartlari/kredit-kartlari",   icon: CreditCard,     k: "cards" },
  { to: "/ipoteka",                         icon: Home,           k: "mortgage" },
  { to: "/valyuta-kurslar",                 icon: ArrowLeftRight, k: "currency" },
  { to: "/kredit-kalkulyatoru",             icon: Calculator,     k: "calculators" },
  { to: "/banks",                           icon: Building2,      k: "banks" },
] as const;

export const CategoryGrid = () => {
  const { t } = useTranslation();
  const lp = useLocalePath();

  return (
    <section className="container py-14 md:py-20">
      <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
        <div>
          <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
            {t("home.categories.eyebrow")}
          </p>
          <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
            {t("home.categories.title")}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {items.map(({ to, icon: Icon, k }) => (
          <Link
            key={to}
            to={lp(to)}
            className="group bg-card border border-border rounded-lg p-4 sm:p-5 hover:border-primary/40 hover:shadow-card transition-all hover:-translate-y-0.5"
          >
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <h3 className="font-semibold text-xs sm:text-sm md:text-base">{t(`home.categories.items.${k}.title`)}</h3>
            <p className="mt-1 text-[10px] sm:text-xs md:text-sm text-muted-foreground line-clamp-2">
              {t(`home.categories.items.${k}.desc`)}
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              {t("common.go")} <ArrowRight className="h-3 w-3" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};
