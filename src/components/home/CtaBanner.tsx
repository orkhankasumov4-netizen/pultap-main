import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator } from "lucide-react";
import { useLocalePath } from "@/i18n/locale-routing";

export const CtaBanner = () => {
  const { t } = useTranslation();
  const lp = useLocalePath();

  const stats = [
    { v: "987+",  k: "offers" },
    { v: "22",    k: "banks" },
    { v: "350K+", k: "users" },
    { v: "4.7★",  k: "rating" },
  ] as const;

  return (
    <section className="container py-14 md:py-20">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-hero text-white p-8 md:p-14">
        <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
        <div className="relative grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-4xl font-display font-bold leading-tight">
              {t("home.cta.titleA")} <span className="text-accent">{t("home.cta.titleHighlight")}</span>
            </h2>
            <p className="mt-3 text-white/75 md:text-base">
              {t("home.cta.subtitle")}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-primary hover:bg-primary-hover h-12 px-6 gap-2">
                <Link to={lp("/kredit-kalkulyatoru")}>
                  <Calculator className="h-4 w-4" /> {t("home.cta.openCalc")}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-6 bg-white/5 border-white/25 text-white hover:bg-white/15 hover:text-white gap-2">
                <Link to={lp("/kreditler")}>
                  {t("home.cta.viewCredits")} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <ul className="grid grid-cols-2 gap-4 text-sm">
            {stats.map((s) => (
              <li key={s.k} className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-4">
                <div className="text-2xl md:text-3xl font-display font-bold text-accent">{s.v}</div>
                <div className="text-xs text-white/70 mt-1">{t(`home.cta.stats.${s.k}`)}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
