import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";
import { useLocalePath } from "@/i18n/locale-routing";

export default function CreditHistory() {
  const { t } = useTranslation();
  const lp = useLocalePath();
  
  return (
    <>
      <Helmet>
        <title>{`${t("creditHistory.metaTitle")} | Pultap.az`}</title>
        <meta name="description" content={t("creditHistory.metaDesc")} />
        <meta name="keywords" content={t("seo.creditHistory.keywords", "kredit tarixçəsi, borc öyrənmək, kredit reytinqi, pultap, azərbaycan, mərkəzi bank, kredit hesabatı")} />
      </Helmet>

      <section className="bg-gradient-hero text-primary-foreground">
        <div className="container py-10 md:py-14">
          <nav className="flex items-center gap-1.5 text-xs text-primary-foreground/70 mb-3">
            <Link to={lp("/")} className="hover:text-primary-foreground">{t("common.home")}</Link>
            <ChevronRight className="h-3 w-3" />
            <span>{t("pages.creditHistoryCrumb")}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">{t("creditHistory.title")}</h1>
          <p className="mt-2 text-primary-foreground/70 max-w-2xl">{t("creditHistory.lead")}</p>
        </div>
      </section>

      <section className="container py-8">
        <div className="w-full bg-card border border-border rounded-2xl overflow-hidden shadow-card">
          <iframe 
            src="https://findoc.az/auth" 
            width="100%" 
            height="100%"
            style={{ border: "none", minHeight: "800px", height: "100vh" }}
            title="Kredit Tarixçəsi - Findoc"
          />
        </div>
      </section>
    </>
  );
}
