import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useLocalePath } from "@/i18n/locale-routing";
import { ChevronRight, Cookie } from "lucide-react";

const CookiePolicyPage = () => {
  const { t } = useTranslation();
  const lp = useLocalePath();

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <Helmet>
        {/* eslint-disable-next-line i18next/no-literal-string */}
        <title>{t("cookiePolicy.title")} - Pultap</title>
        <meta name="description" content={t("cookiePolicy.content.p2")} />
      </Helmet>

      <div className="container max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to={lp("/")} className="hover:text-foreground transition-colors">
            {t("common.home")}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">{t("cookiePolicy.title")}</span>
        </div>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Cookie className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold">{t("cookiePolicy.title")}</h1>
            <p className="text-muted-foreground mt-1">{t("cookiePolicy.lastUpdated")}</p>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none bg-card border rounded-2xl p-6 md:p-10 shadow-sm">
          <h3 className="text-xl font-bold mt-0">{t("cookiePolicy.content.p1")}</h3>
          <p>{t("cookiePolicy.content.p2")}</p>

          <h3 className="text-xl font-bold">{t("cookiePolicy.content.p3")}</h3>
          <ul className="list-none pl-0 space-y-4">
            <li>
              <strong>{t("cookiePolicy.content.p4").split(":")[0]}:</strong>
              {t("cookiePolicy.content.p4").substring(t("cookiePolicy.content.p4").indexOf(":") + 1)}
            </li>
            <li>
              <strong>{t("cookiePolicy.content.p5").split(":")[0]}:</strong>
              {t("cookiePolicy.content.p5").substring(t("cookiePolicy.content.p5").indexOf(":") + 1)}
            </li>
            <li>
              <strong>{t("cookiePolicy.content.p6").split(":")[0]}:</strong>
              {t("cookiePolicy.content.p6").substring(t("cookiePolicy.content.p6").indexOf(":") + 1)}
            </li>
            <li>
              <strong>{t("cookiePolicy.content.p7").split(":")[0]}:</strong>
              {t("cookiePolicy.content.p7").substring(t("cookiePolicy.content.p7").indexOf(":") + 1)}
            </li>
          </ul>

          <h3 className="text-xl font-bold mt-8">{t("cookiePolicy.content.p8")}</h3>
          <p>{t("cookiePolicy.content.p9")}</p>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicyPage;
