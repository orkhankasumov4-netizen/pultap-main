import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronRight, SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useLocalePath } from "@/i18n/locale-routing";


type Crumb = { label: string; to?: string };

export const ListPageShell = ({
  title,
  description,
  breadcrumbs = [],
  filters,
  toolbar,
  children,
  resultsCount,
  metaTitle,
  metaDescription,
  metaKeywords,
  hideHero = false,
}: {
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
  filters: ReactNode;
  toolbar?: ReactNode;
  children: ReactNode;
  resultsCount?: number;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  hideHero?: boolean;
}) => {

  const { t } = useTranslation();
  const lp = useLocalePath();

  return (
    <>
      <Helmet>
        <title>{metaTitle ?? `${title} | Pultap.az`}</title>
        {(metaDescription || description) && (
          <meta name="description" content={metaDescription ?? description!} />
        )}
        <meta name="keywords" content={metaKeywords ?? t("seo.lists.keywords", "kreditlər, depozitlər, kartlar, ipoteka, pultap, axtarış, banklar, müqayisə, şərtlər")} />
        
        {breadcrumbs.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": breadcrumbs.map((crumb, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": crumb.label,
                "item": crumb.to ? `https://pultap.az${crumb.to}` : undefined
              }))
            })}
          </script>
        )}
      </Helmet>

      {!hideHero && (
        <section className="bg-gradient-hero text-primary-foreground">
          <div className="container py-8 md:py-12">
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
            <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">{title}</h1>
            {description && <p className="mt-2 text-primary-foreground/70 max-w-2xl">{description}</p>}
          </div>
        </section>
      )}

      <section className="container py-8 md:py-10">
        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-20 bg-card border border-border rounded-2xl p-5 shadow-card">
              <div className="flex items-center gap-2 mb-4">
                <SlidersHorizontal className="h-4 w-4 text-primary" />
                <h2 className="font-semibold text-sm">{t("common.filters")}</h2>
              </div>
              {filters}
            </div>
          </aside>

          {/* Content */}
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="text-sm text-muted-foreground">
                {typeof resultsCount === "number" ? (
                  <>
                    <span className="font-semibold text-foreground">{resultsCount}</span> {t("common.results")}
                  </>
                ) : null}
              </div>
              <div className="flex items-center gap-2">
                {toolbar}
                {/* Mobile filter trigger */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden gap-2">
                      <SlidersHorizontal className="h-4 w-4" /> {t("common.filters")}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>{t("common.filters")}</SheetTitle>
                    </SheetHeader>
                    <div className="mt-4">{filters}</div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
            {children}
          </div>
        </div>
      </section>
    </>
  );
};

export const FilterGroup = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="border-t border-border pt-4 mt-4 first:border-t-0 first:pt-0 first:mt-0">
    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">{title}</h3>
    {children}
  </div>
);
