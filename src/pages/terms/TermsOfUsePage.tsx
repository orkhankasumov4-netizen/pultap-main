import { Helmet } from "react-helmet-async";
import { useTranslation, Trans } from "react-i18next";
import { Link } from "react-router-dom";
import { useLocalePath } from "@/i18n/locale-routing";
import { ChevronRight, ShieldCheck } from "lucide-react";

const TermsOfUsePage = () => {
  const { t } = useTranslation();
  const lp = useLocalePath();

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <Helmet>
        <title>{t("terms.metaTitle")}</title>
        <meta name="description" content={t("terms.metaDesc")} />
      </Helmet>

      <div className="container max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to={lp("/")} className="hover:text-foreground transition-colors">
            {t("common.home")}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">{t("terms.title")}</span>
        </div>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <ShieldCheck className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold">{t("terms.title")}</h1>
            <p className="text-muted-foreground mt-1">{t("terms.lastUpdated")}</p>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none bg-card border rounded-2xl p-6 md:p-10 shadow-sm">
          <p>{t("terms.content.p1")}</p>
          <p>{t("terms.content.p2")}</p>
          <p>{t("terms.content.p3")}</p>
          <p>{t("terms.content.p4")}</p>
          <p>{t("terms.content.p5")}</p>
          <p>{t("terms.content.p6")}</p>
          <p>{t("terms.content.p7")}</p>
          <p>
            <Trans i18nKey="terms.content.p8">
              İmtina barədə müraciətinizi aşağıdakı ünvana göndərin: <strong><a href="mailto:info@pultap.az" className="text-primary hover:underline">info@pultap.az</a></strong>
            </Trans>
          </p>
          <p>{t("terms.content.p9")}</p>
          <p>
            <Trans i18nKey="terms.content.p10">
              Məlumatların silinməsi ilə bağlı müraciət ünvanı: <strong><a href="mailto:info@pultap.az" className="text-primary hover:underline">info@pultap.az</a></strong>
            </Trans>
          </p>
          <p>{t("terms.content.p11")}</p>
          <p>{t("terms.content.p12")}</p>
          <p>
            <Trans i18nKey="terms.content.p13">
              İmtina üçün müraciətinizi <strong><a href="mailto:info@pultap.az" className="text-primary hover:underline">info@pultap.az</a></strong> ünvanına göndərin.
            </Trans>
          </p>
          <p>{t("terms.content.p14")}</p>
          <p>{t("terms.content.p15")}</p>
          <p>{t("terms.content.p16")}</p>
          <p>{t("terms.content.p17")}</p>
          <p>{t("terms.content.p18")}</p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUsePage;
