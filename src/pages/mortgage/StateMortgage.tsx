import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronRight, Building2, Percent, Calendar, Coins, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreditCard } from "@/components/site/CreditCard";
import { credits } from "@/data/finance";
import { useLocalePath } from "@/i18n/locale-routing";

export default function StateMortgage() {
  const { t } = useTranslation();
  const lp = useLocalePath();
  const stateMortgages = credits.filter((c) => c.type === "ipoteka" && c.highlight === "Dövlət ipotekası");
  const terms = t("mortgageState.terms", { returnObjects: true }) as string[];

  const stats = [
    { icon: Percent, label: t("mortgageState.stats.rate"), value: t("mortgageState.statsValues.rate") },
    { icon: Coins, label: t("mortgageState.stats.down"), value: t("mortgageState.statsValues.down") },
    { icon: Calendar, label: t("mortgageState.stats.term"), value: t("mortgageState.statsValues.term") },
    { icon: Building2, label: t("mortgageState.stats.max"), value: t("mortgageState.statsValues.max") },
  ];

  return (
    <>
      <Helmet>
        <title>{`${t("mortgageState.title")} | Pultap.az`}</title>
        <meta name="description" content={t("mortgageState.lead")} />
      </Helmet>

      <section className="bg-gradient-hero text-primary-foreground">
        <div className="container py-10 md:py-14">
          <nav className="flex items-center gap-1.5 text-xs text-primary-foreground/70 mb-3">
            <Link to={lp("/")} className="hover:text-primary-foreground">{t("common.home")}</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to={lp("/ipoteka")} className="hover:text-primary-foreground">{t("pages.mortgageAll.crumb")}</Link>
            <ChevronRight className="h-3 w-3" />
            <span>{t("mortgageState.title")}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">{t("mortgageState.title")}</h1>
          <p className="mt-2 text-primary-foreground/70 max-w-2xl">{t("mortgageState.lead")}</p>
        </div>
      </section>

      <section className="container py-10 md:py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-2xl p-5 shadow-card">
              <s.icon className="h-5 w-5 text-primary mb-3" />
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
              <div className="mt-1 text-xl font-bold">{s.value}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          <div>
            <h2 className="font-display text-2xl font-bold mb-4">{t("mortgageState.offersTitle")}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {stateMortgages.map((c) => <CreditCard key={c.id} credit={c} />)}
            </div>
          </div>

          <aside className="bg-secondary text-secondary-foreground rounded-2xl p-6">
            <h3 className="font-semibold mb-4">{t("mortgageState.termsTitle")}</h3>
            <ul className="space-y-3 text-sm text-secondary-foreground/85">
              {Array.isArray(terms) && terms.map((line, i) => (
                <li key={i} className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" /> {line}
                </li>
              ))}
            </ul>
            <Button asChild className="w-full mt-5 rounded-full bg-primary hover:bg-primary-hover">
              <Link to={lp("/kredit-kalkulyatoru")}>{t("mortgageState.calcCta")}</Link>
            </Button>
          </aside>
        </div>
      </section>
    </>
  );
}
