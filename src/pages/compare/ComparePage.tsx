import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronRight, X, ArrowLeft, Scale, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BankLogo } from "@/components/site/BankLogo";
import { useCompare } from "@/context/CompareContext";
import { useLocalePath } from "@/i18n/locale-routing";
import { useCredits, useBanks } from "@/hooks/use-finance-api";

const fmt = (n: number) => new Intl.NumberFormat("az-AZ").format(n);

/** Annuity monthly payment */
const monthly = (amount: number, rate: number, term: number) => {
  const r = rate / 100 / 12;
  if (r === 0) return amount / term;
  return (amount * r) / (1 - Math.pow(1 + r, -term));
};

export default function ComparePage() {
  const { t } = useTranslation();
  const lp = useLocalePath();
  const { ids, clear, toggle } = useCompare();

  const { data: credits = [], isLoading: creditsLoading } = useCredits();
  const { data: banks = [], isLoading: banksLoading } = useBanks();

  const items = ids
    .map((id) => credits.find((c) => c.id === id))
    .filter(Boolean) as (typeof credits)[number][];

  const typeLabels: Record<string, string> = {
    online: t("creditTypes.online", { defaultValue: "Onlayn" }),
    "nağd": t("creditTypes.cash", { defaultValue: "Nağd" }),
    ipoteka: t("creditTypes.mortgage", { defaultValue: "İpoteka" }),
    avto: t("creditTypes.auto", { defaultValue: "Avto" }),
  };

  const rows: { label: string; values: (string | React.ReactNode)[] }[] = items.length
    ? [
        {
          label: t("compare.bank", { defaultValue: "Bank" }),
          values: items.map((c) => {
            const b = banks.find((bank) => bank.id === c.bankId);
            return (
              <Link
                key={c.id}
                to={b ? lp(`/banks/${b.id}`) : "#"}
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <BankLogo id={b?.id || c.bankId} size={28} />
                {b ? b.name : c.bankId}
              </Link>
            );
          }),
        },
        {
          label: t("creditDetail.type", { defaultValue: "Növ" }),
          values: items.map((c) => typeLabels[c.type] ?? c.type),
        },
        {
          label: t("card.rate"),
          values: items.map((c) => (
            <span key={c.id} className="font-bold text-primary">{c.rate}%</span>
          )),
        },
        {
          label: t("creditDetail.amountRange", { defaultValue: "Məbləğ aralığı" }),
          values: items.map((c) => `${fmt(c.amountMin)} – ${fmt(c.amountMax)} ₼`),
        },
        {
          label: t("creditDetail.termRange", { defaultValue: "Müddət aralığı" }),
          values: items.map((c) => `${c.termMin} – ${c.termMax} ay`),
        },
        {
          label: t("compare.monthlyExample", { defaultValue: "Aylıq ödəniş (10 000 ₼, 24 ay)" }),
          values: items.map((c) => (
            <span key={c.id} className="font-semibold">
              {/* eslint-disable-next-line i18next/no-literal-string */}
              {fmt(Math.round(monthly(10000, c.rate, 24)))} ₼
            </span>
          )),
        },
        {
          label: t("lists.collateral"),
          values: items.map((c) =>
            c.collateral
              ? <Badge key={c.id} className="bg-success/15 text-success border-success/30">{t("common.yes", { defaultValue: "Bəli" })}</Badge>
              : <Badge key={c.id} variant="outline">{t("common.no", { defaultValue: "Xeyr" })}</Badge>
          ),
        },
        {
          label: t("lists.insurance"),
          values: items.map((c) =>
            c.insurance
              ? <Badge key={c.id} className="bg-success/15 text-success border-success/30">{t("common.yes", { defaultValue: "Bəli" })}</Badge>
              : <Badge key={c.id} variant="outline">{t("common.no", { defaultValue: "Xeyr" })}</Badge>
          ),
        },
      ]
    : [];

  return (
    <>
      <Helmet>
        <title>{t("compare.pageTitle", { defaultValue: "Müqayisə | Pultap.az" })}</title>
        <meta
          name="description"
          content={t("compare.pageDesc", {
            defaultValue: "Kreditləri yan-yana müqayisə edin — faiz, məbləğ, müddət, aylıq ödəniş.",
          })}
        />
        <meta name="keywords" content={t("seo.compare.keywords", "kredit müqayisəsi, bank kreditləri, faiz dərəcəsi müqayisə, pultap, ən yaxşı kredit")} />
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="container py-10 md:py-14">
          <nav className="flex items-center gap-1.5 text-xs text-primary-foreground/70 mb-3">
            <Link to={lp("/")} className="hover:text-primary-foreground">
              {t("common.home")}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link to={lp("/kreditler")} className="hover:text-primary-foreground">
              {t("nav.credits")}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span>{t("compare.crumb", { defaultValue: "Müqayisə" })}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight flex items-center gap-3">
            <Scale className="h-8 w-8" />
            {t("compare.title", { defaultValue: "Kredit müqayisəsi" })}
          </h1>
          <p className="mt-2 text-primary-foreground/70 max-w-2xl">
            {t("compare.subtitle", {
              defaultValue: "Seçilmiş kreditləri yan-yana müqayisə edin.",
            })}
          </p>
        </div>
      </section>

      <section className="container py-8 md:py-10">
        {creditsLoading || banksLoading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
          </div>
        ) : items.length === 0 ? (
          <div className="bg-card border border-border rounded-2xl p-12 text-center shadow-card">
            <Scale className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="font-semibold text-lg mb-2">
              {t("compare.empty", { defaultValue: "Müqayisə siyahısı boşdur" })}
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              {t("compare.emptyHint", {
                defaultValue:
                  "Kredit siyahısından + düyməsi ilə məhsulları müqayisəyə əlavə edin.",
              })}
            </p>
            <Link to={lp("/kreditler")}>
              <Button className="rounded-full bg-gradient-primary hover:opacity-90">
                {t("compare.goToCredits", { defaultValue: "Kreditlərə keç" })}
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Action bar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{items.length}</span>{" "}
                {t("compare.selected", { defaultValue: "kredit müqayisə olunur" })}
              </p>
              <Button variant="outline" size="sm" onClick={clear} className="gap-2">
                <X className="h-3.5 w-3.5" />
                {t("lists.clear", { defaultValue: "Təmizlə" })}
              </Button>
            </div>

            {/* Comparison table */}
            <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm whitespace-nowrap min-w-max">
                  {/* Header: credit names */}
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left px-5 py-4 font-medium text-muted-foreground w-[180px] min-w-[160px]">
                        {t("compare.criteria", { defaultValue: "Kriter" })}
                      </th>
                      {items.map((c) => (
                        <th key={c.id} className="px-5 py-4 text-left min-w-[200px]">
                          <div className="flex items-start justify-between gap-2">
                            <Link
                              to={lp(`/kreditler/${c.id}`)}
                              className="font-semibold hover:text-primary transition-colors"
                            >
                              {c.name}
                            </Link>
                            <button
                              onClick={() => toggle(c.id)}
                              className="p-1 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors shrink-0"
                              aria-label="Remove"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          {c.highlight && (
                            <Badge className="mt-1 bg-accent/15 text-accent-foreground dark:text-accent border-accent/30 text-[10px]">
                              {c.highlight}
                            </Badge>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <tr
                        key={i}
                        className={`border-b border-border/60 ${i % 2 === 0 ? "" : "bg-muted/20"}`}
                      >
                        <td className="px-5 py-3.5 font-medium text-muted-foreground whitespace-nowrap">
                          {row.label}
                        </td>
                        {row.values.map((val, j) => (
                          <td key={j} className="px-5 py-3.5">
                            {val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Back */}
            <div className="mt-6 flex gap-3">
              <Link to={lp("/kreditler")}>
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  {t("creditDetail.backToList", { defaultValue: "Bütün kreditlər" })}
                </Button>
              </Link>
            </div>
          </>
        )}
      </section>
    </>
  );
}
