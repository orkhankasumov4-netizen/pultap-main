import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";
import { DepositCalculator } from "@/components/site/DepositCalculator";
import { useLocalePath } from "@/i18n/locale-routing";

export default function DepositCalculatorPage() {
  const { t } = useTranslation();
  const lp = useLocalePath();
  return (
    <>
      <Helmet>
        <title>{`${t("calcDeposit.metaTitle")} | Pultap.az`}</title>
        <meta name="description" content={t("calcDeposit.metaDesc")} />
        <meta name="keywords" content={t("seo.calcDeposit.keywords", "depozit kalkulyatoru, əmanət gəliri, faiz hesablama, bank əmanəti, pultap depozit")} />
      </Helmet>

      <section className="bg-gradient-hero text-primary-foreground">
        <div className="container py-10 md:py-14">
          <nav className="flex items-center gap-1.5 text-xs text-primary-foreground/70 mb-3">
            <Link to={lp("/")} className="hover:text-primary-foreground">{t("common.home")}</Link>
            <ChevronRight className="h-3 w-3" />
            <span>{t("calcDeposit.title")}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">{t("calcDeposit.title")}</h1>
          <p className="mt-2 text-primary-foreground/70 max-w-2xl">{t("calcDeposit.lead")}</p>
        </div>
      </section>

      <section className="container py-10 md:py-14">
        <DepositCalculator />
      </section>
    </>
  );
}
