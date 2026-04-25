import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreditCard } from "@/components/site/CreditCard";
import { credits } from "@/data/finance";
import { useLocalePath } from "@/i18n/locale-routing";

export default function InternalMortgage() {
  const { t } = useTranslation();
  const lp = useLocalePath();
  const internal = credits.filter((c) => c.type === "ipoteka" && c.highlight !== "Dövlət ipotekası");
  const adv = t("mortgageInternal.adv", { returnObjects: true }) as string[];
  return (
    <>
      <Helmet>
        <title>{`${t("mortgageInternal.title")} | Pultap.az`}</title>
        <meta name="description" content={t("mortgageInternal.lead")} />
      </Helmet>

      <section className="bg-gradient-hero text-primary-foreground">
        <div className="container py-10 md:py-14">
          <nav className="flex items-center gap-1.5 text-xs text-primary-foreground/70 mb-3">
            <Link to={lp("/")} className="hover:text-primary-foreground">{t("common.home")}</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to={lp("/ipoteka")} className="hover:text-primary-foreground">{t("pages.mortgageAll.crumb")}</Link>
            <ChevronRight className="h-3 w-3" />
            <span>{t("mortgageInternal.title")}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">{t("mortgageInternal.title")}</h1>
          <p className="mt-2 text-primary-foreground/70 max-w-2xl">{t("mortgageInternal.lead")}</p>
        </div>
      </section>

      <section className="container py-10 md:py-14">
        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          <div>
            <h2 className="font-display text-2xl font-bold mb-4">{t("mortgageInternal.offersTitle")}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {internal.map((c) => <CreditCard key={c.id} credit={c} />)}
            </div>
          </div>

          <aside className="bg-card border border-border rounded-2xl p-6 shadow-card">
            <h3 className="font-semibold mb-4">{t("mortgageInternal.advTitle")}</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {Array.isArray(adv) && adv.map((line, i) => (
                <li key={i} className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" /> {line}
                </li>
              ))}
            </ul>
            <Button asChild className="w-full mt-5 rounded-full bg-gradient-primary hover:opacity-90">
              <Link to={lp("/kredit-kalkulyatoru")}>{t("mortgageInternal.calcCta")}</Link>
            </Button>
          </aside>
        </div>
      </section>
    </>
  );
}
