import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";
import { Converter } from "@/components/site/Converter";
import { useLocalePath } from "@/i18n/locale-routing";

export default function ConverterIndex() {
  const { t } = useTranslation();
  const lp = useLocalePath();
  const pairs = [
    { to: "/konvertor/dollar-manat", label: t("converter.pairs.usd") },
    { to: "/konvertor/avro-manat", label: t("converter.pairs.eur") },
    { to: "/konvertor/rubl-manat", label: t("converter.pairs.rub") },
  ];

  return (
    <>
      <Helmet>
        <title>{`${t("converter.metaTitle")} | Pultap.az`}</title>
        <meta name="description" content={t("converter.metaDesc")} />
        <meta name="keywords" content={t("seo.converter.keywords", "valyuta konvertoru, dollar çevirici, avro kalkulyator, rubl manat, pultap valyuta")} />
      </Helmet>

      <section className="bg-gradient-hero text-primary-foreground">
        <div className="container py-10 md:py-14">
          <nav className="flex items-center gap-1.5 text-xs text-primary-foreground/70 mb-3">
            <Link to={lp("/")} className="hover:text-primary-foreground">{t("common.home")}</Link>
            <ChevronRight className="h-3 w-3" />
            <span>{t("pages.converter.crumb")}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">{t("converter.title")}</h1>
          <p className="mt-2 text-primary-foreground/70 max-w-2xl">{t("converter.lead")}</p>
        </div>
      </section>

      <section className="container py-10 md:py-14">
        <Converter title={t("converter.universal")} />

        <div className="mt-8 grid sm:grid-cols-3 gap-3">
          {pairs.map((p) => (
            <Link
              key={p.to}
              to={lp(p.to)}
              className="rounded-xl border border-border bg-card p-4 hover:border-primary hover:shadow-card transition-all flex items-center justify-between"
            >
              <span className="font-medium">{p.label}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
