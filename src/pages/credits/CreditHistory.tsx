import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronRight, FileSearch, Shield, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useLocalePath } from "@/i18n/locale-routing";

export default function CreditHistory() {
  const { t } = useTranslation();
  const lp = useLocalePath();
  const why = t("creditHistory.why", { returnObjects: true }) as string[];
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

      <section className="container py-10 md:py-14">
        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <FileSearch className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">{t("creditHistory.online")}</h2>
                <p className="text-xs text-muted-foreground">{t("creditHistory.onlineSub")}</p>
              </div>
            </div>

            <form className="grid sm:grid-cols-2 gap-4" onSubmit={(e) => { e.preventDefault(); window.location.href = "https://findoc.az/auth"; }}>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t("creditHistory.fields.name")}</label>
                <Input className="mt-2 h-11" placeholder={t("creditHistory.placeholders.name")} />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t("creditHistory.fields.fin")}</label>
                <Input className="mt-2 h-11 uppercase" placeholder={t("creditHistory.placeholders.fin")} maxLength={7} />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t("creditHistory.fields.dob")}</label>
                <Input type="date" className="mt-2 h-11" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t("creditHistory.fields.phone")}</label>
                <Input type="tel" className="mt-2 h-11" placeholder={t("creditHistory.placeholders.phone")} />
              </div>
              <div className="sm:col-span-2">
                <Button className="w-full sm:w-auto rounded-full bg-gradient-primary hover:opacity-90 px-8">
                  {t("creditHistory.submit")}
                </Button>
              </div>
            </form>

            <div className="mt-6 grid sm:grid-cols-3 gap-3">
              {[
                { icon: Shield, key: "secret" as const },
                { icon: CheckCircle2, key: "instant" as const },
                { icon: AlertCircle, key: "official" as const },
              ].map((f) => (
                <div key={f.key} className="rounded-xl border border-border bg-muted/40 p-4">
                  <f.icon className="h-5 w-5 text-primary mb-2" />
                  <div className="text-sm font-semibold">{t(`creditHistory.features.${f.key}.t`)}</div>
                  <div className="text-xs text-muted-foreground">{t(`creditHistory.features.${f.key}.d`)}</div>
                </div>
              ))}
            </div>
          </div>

          <Card className="bg-secondary text-secondary-foreground border-0 rounded-2xl">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">{t("creditHistory.whyTitle")}</h3>
              <ul className="space-y-3 text-sm text-secondary-foreground/80">
                {Array.isArray(why) && why.map((line, i) => (
                  <li key={i} className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" /> {line}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
