import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bankById } from "@/data/finance";
import { useLocalePath } from "@/i18n/locale-routing";
import { useTopLoans } from "@/hooks/use-top-loans";
import { Skeleton } from "@/components/ui/skeleton";

const fmt = (n: number, locale: string) =>
  new Intl.NumberFormat(locale === "az" ? "az-AZ" : locale === "ru" ? "ru-RU" : "en-US").format(n);

export const TopLoansTable = () => {
  const { t, i18n } = useTranslation();
  const lp = useLocalePath();
  const { loans: top, isLoading } = useTopLoans();

  return (
    <section className="bg-surface border-y border-border py-14 md:py-20">
      <div className="container">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
              {t("home.topLoans.eyebrow")}
            </p>
            <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
              {t("home.topLoans.title")}
            </h2>
          </div>
          <Button asChild variant="outline" size="sm" className="gap-1">
            <Link to={lp("/kreditler")}>{t("home.topLoans.all")} <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>

        {/* Desktop: table */}
        <div className="hidden md:block bg-card border border-border rounded-lg overflow-hidden shadow-card">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-muted-foreground">
              <tr className="text-xs uppercase tracking-wider">
                <th className="text-left font-semibold px-5 py-3">{t("home.topLoans.th.product")}</th>
                <th className="text-right font-semibold px-4 py-3">{t("home.topLoans.th.rate")}</th>
                <th className="text-right font-semibold px-4 py-3">{t("home.topLoans.th.amount")}</th>
                <th className="text-right font-semibold px-4 py-3">{t("home.topLoans.th.term")}</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <Skeleton className="h-9 w-9 rounded-md shrink-0" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-20" />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <Skeleton className="h-5 w-12 ml-auto" />
                      </td>
                      <td className="px-4 py-4 text-right">
                        <Skeleton className="h-4 w-24 ml-auto" />
                      </td>
                      <td className="px-4 py-4 text-right">
                        <Skeleton className="h-4 w-16 ml-auto" />
                      </td>
                      <td className="px-4 py-4 text-right">
                        <Skeleton className="h-8 w-20 ml-auto rounded-md" />
                      </td>
                    </tr>
                  ))
                : top.map((c) => {
                    const b = bankById(c.bankId);
                    return (
                      <tr key={c.id} className="hover:bg-muted/40 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-md flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: b.logoColor }}>
                              {b.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                            </div>
                            <div className="min-w-0">
                              <div className="font-semibold text-foreground truncate">{c.name}</div>
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Star className="h-3 w-3 fill-accent text-accent" /> {b.rating} · {b.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <span className="font-bold text-primary text-base">{c.rate}%</span>
                        </td>
                        <td className="px-4 py-4 text-right tabular-nums text-foreground/80">
                          {fmt(c.amountMin, i18n.language)} – {fmt(c.amountMax, i18n.language)}
                        </td>
                        <td className="px-4 py-4 text-right tabular-nums text-foreground/80">
                          {c.termMin}–{c.termMax} {t("common.month")}
                        </td>
                        <td className="px-4 py-4 text-right">
                          <Button asChild size="sm" className="bg-primary hover:bg-primary-hover">
                            <Link to={lp("/kreditler")}>{t("common.more")}</Link>
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>

        {/* Mobile: cards */}
        <div className="md:hidden grid gap-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-4 shadow-card animate-pulse">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <Skeleton className="h-9 w-9 rounded-md shrink-0" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>
                    <Skeleton className="h-6 w-10 shrink-0" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-border">
                    <div className="space-y-1">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="space-y-1">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                  <Skeleton className="h-9 w-full mt-3 rounded-md" />
                </div>
              ))
            : top.map((c) => {
                const b = bankById(c.bankId);
                return (
                  <div key={c.id} className="bg-card border border-border rounded-lg p-4 shadow-card">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-9 w-9 rounded-md flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: b.logoColor }}>
                          {b.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold truncate">{c.name}</div>
                          <div className="text-xs text-muted-foreground">{b.name}</div>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-primary shrink-0">{c.rate}%</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-border text-xs">
                      <div>
                        <div className="text-muted-foreground">{t("home.topLoans.amount")}</div>
                        {/* eslint-disable-next-line i18next/no-literal-string */}
                      <div className="font-semibold tabular-nums">{fmt(c.amountMin, i18n.language)}–{fmt(c.amountMax, i18n.language)} ₼</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">{t("home.topLoans.term")}</div>
                        <div className="font-semibold tabular-nums">{c.termMin}–{c.termMax} {t("common.month")}</div>
                      </div>
                    </div>
                    <Button asChild size="sm" className="w-full mt-3 bg-primary hover:bg-primary-hover">
                      <Link to={lp("/kreditler")}>{t("common.viewMore")}</Link>
                    </Button>
                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
};
