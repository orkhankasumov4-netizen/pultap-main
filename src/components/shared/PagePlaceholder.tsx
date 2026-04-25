import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronRight, Hammer } from "lucide-react";
import { useLocalePath } from "@/i18n/locale-routing";

type Crumb = { label: string; to?: string };
type Props = { title: string; description?: string; breadcrumbs?: Crumb[] };

export const PagePlaceholder = ({ title, description, breadcrumbs = [] }: Props) => {
  const { t } = useTranslation();
  const lp = useLocalePath();
  return (
    <>
      <Helmet>
        {/* eslint-disable-next-line i18next/no-literal-string */}
        <title>{title} | Pultap.az</title>
        {description && <meta name="description" content={description} />}
      </Helmet>
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="container py-10 md:py-14">
          {breadcrumbs.length > 0 && (
            <nav className="flex items-center gap-1.5 text-xs text-primary-foreground/70 mb-3">
              <Link to={lp("/")} className="hover:text-primary-foreground">{t("common.home")}</Link>
              {breadcrumbs.map((c, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <ChevronRight className="h-3 w-3" />
                  {c.to ? (
                    <Link to={lp(c.to)} className="hover:text-primary-foreground">{c.label}</Link>
                  ) : (
                    <span className="text-primary-foreground">{c.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}
          <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">{title}</h1>
          {description && <p className="mt-2 text-primary-foreground/70 max-w-2xl">{description}</p>}
        </div>
      </section>
      <section className="container py-16">
        <div className="max-w-xl mx-auto text-center bg-card border border-border rounded-lg p-10 shadow-card">
          <div className="h-12 w-12 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <Hammer className="h-5 w-5" />
          </div>
          <h2 className="mt-4 text-lg font-semibold">{t("common.comingSoon")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t("common.comingSoonDesc")}</p>
        </div>
      </section>
    </>
  );
};
