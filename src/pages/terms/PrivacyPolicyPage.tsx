import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useLocalePath } from "@/i18n/locale-routing";
import { ChevronRight, ShieldCheck } from "lucide-react";

const PrivacyPolicyPage = () => {
  const { t } = useTranslation();
  const lp = useLocalePath();

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <Helmet>
        <title>{t("privacy.metaTitle")}</title>
        <meta name="description" content={t("privacy.metaDesc")} />
      </Helmet>

      <div className="container max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to={lp("/")} className="hover:text-foreground transition-colors">
            {t("common.home")}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">{t("privacy.title")}</span>
        </div>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <ShieldCheck className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold">{t("privacy.title")}</h1>
            <p className="text-muted-foreground mt-1">{t("privacy.lastUpdated")}</p>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none bg-card border rounded-2xl p-6 md:p-10 shadow-sm">
          <h3 className="text-xl font-bold mt-0">{t("privacy.content.p1")}</h3>
          <p>{t("privacy.content.p2")}</p>
          <p>{t("privacy.content.p3")}</p>

          <h3 className="text-xl font-bold">{t("privacy.content.p4")}</h3>
          <p>{t("privacy.content.p5")}</p>
          <ul>
            <li>{t("privacy.content.p6")}</li>
            <li>{t("privacy.content.p7")}</li>
            <li>{t("privacy.content.p8")}</li>
          </ul>

          <h3 className="text-xl font-bold">{t("privacy.content.p9")}</h3>
          <p>{t("privacy.content.p10")}</p>
          <ul>
            <li>{t("privacy.content.p11")}</li>
            <li>{t("privacy.content.p12")}</li>
            <li>{t("privacy.content.p13")}</li>
          </ul>

          <h3 className="text-xl font-bold">{t("privacy.content.p14")}</h3>
          <p>{t("privacy.content.p15")}</p>
          <p>{t("privacy.content.p16")}</p>

          <h3 className="text-xl font-bold">{t("privacy.content.p17")}</h3>
          <p>{t("privacy.content.p18")}</p>
          <p>
            {t("privacy.content.p19")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
