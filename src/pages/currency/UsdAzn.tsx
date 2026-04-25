import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";
import { Converter } from "@/components/site/Converter";
import { useLocalePath } from "@/i18n/locale-routing";

export default function UsdAzn() {
  const { t } = useTranslation();
  const lp = useLocalePath();
  return (
    <>
      <Helmet>
        <title>{`${t("converter.pageTitleUsd")} | Pultap.az`}</title>
        <meta name="description" content={t("converter.metaUsd")} />
      </Helmet>
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="container py-10 md:py-14">
          <nav className="flex items-center gap-1.5 text-xs text-primary-foreground/70 mb-3">
            <Link to={lp("/")} className="hover:text-primary-foreground">{t("common.home")}</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to={lp("/konvertor")} className="hover:text-primary-foreground">{t("pages.converter.crumb")}</Link>
            <ChevronRight className="h-3 w-3" />
            <span>{t("converter.pairs.usd")}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">{t("converter.pageTitleUsd")}</h1>
        </div>
      </section>
      <section className="container py-10 md:py-14">
        <Converter from="USD" to="AZN" title="USD → AZN" />
      </section>
    </>
  );
}
