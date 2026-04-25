import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronRight, TrendingUp, TrendingDown, Search, Building2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { banks } from "@/data/finance";
import { useCbarRates } from "@/hooks/use-cbar-rates";
import { useLocalePath } from "@/i18n/locale-routing";

// Build deterministic per-bank rate offsets so the page doesn't shimmer.
const seededOffset = (key: string) => {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) | 0;
  return ((h % 100) / 100 - 0.5) * 0.024;
};

type View = "cbar" | "banks";

export default function Rates() {
  const { t } = useTranslation();
  const lp = useLocalePath();
  const { currencies: cbarCurrencies, isLoading, isLive } = useCbarRates();
  const [view, setView] = useState<View>("cbar");
  const [search, setSearch] = useState("");
  const [activeCurrency, setActiveCurrency] = useState<string>("USD");

  const filteredBanks = useMemo(
    () => banks.filter((b) => b.name.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  const baseCur = cbarCurrencies.find((c) => c.code === activeCurrency)!;

  return (
    <>
      <Helmet>
        <title>{`${t("pages.rates.title")} | Pultap.az`}</title>
        <meta name="description" content={t("pages.rates.desc")} />
        <meta name="keywords" content={t("seo.rates.keywords", "valyuta məzənnələri, dollar kursu, avro kursu, mərkəzi bank, bank məzənnələri, rubl, pultap valyuta")} />
      </Helmet>

      <section className="bg-gradient-hero text-primary-foreground">
        <div className="container py-10 md:py-14">
          <nav className="flex items-center gap-1.5 text-xs text-primary-foreground/70 mb-3">
            <Link to={lp("/")} className="hover:text-primary-foreground">{t("common.home")}</Link>
            <ChevronRight className="h-3 w-3" />
            <span>{t("pages.rates.crumb")}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">{t("pages.rates.title")}</h1>
          <p className="mt-2 text-primary-foreground/70 max-w-2xl">{t("pages.rates.desc")}</p>
        </div>
      </section>

      <section className="container py-8 md:py-10">
        {/* Currency snapshot cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl p-4 border border-border bg-card">
                  <div className="flex items-center justify-between">
                    <span className="h-8 w-8 rounded bg-muted animate-pulse" />
                    <span className="h-4 w-12 rounded bg-muted animate-pulse" />
                  </div>
                  <div className="mt-3 h-3 w-10 rounded bg-muted animate-pulse" />
                  <div className="mt-2 h-5 w-20 rounded bg-muted animate-pulse" />
                </div>
              ))
            : cbarCurrencies.map((c) => {
                const up = c.change >= 0;
                return (
                  <button
                    key={c.code}
                    onClick={() => setActiveCurrency(c.code)}
                    className={`text-left rounded-2xl p-4 border transition-all ${
                      activeCurrency === c.code
                        ? "bg-primary text-primary-foreground border-primary shadow-glow"
                        : "bg-card border-border hover:border-primary"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl leading-none">{c.flag}</span>
                      <span
                        className={`text-xs flex items-center gap-0.5 ${
                          activeCurrency === c.code
                            ? "text-primary-foreground/90"
                            : up
                            ? "text-success"
                            : "text-destructive"
                        }`}
                      >
                        {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {Math.abs(c.change).toFixed(2)}%
                      </span>
                    </div>
                    <div className="mt-2 text-xs uppercase tracking-wider opacity-70">1 {c.code}</div>
                    {/* eslint-disable-next-line i18next/no-literal-string */}
                <div className="mt-1 text-lg font-bold">{((c.buy + c.sell) / 2).toFixed(4)} ₼</div>
                  </button>
                );
              })}
        </div>

        {/* Live indicator */}
        {isLive && (
          <div className="mb-4 flex items-center gap-2 text-xs text-success">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
            {t("rates.liveFromCbar", { defaultValue: "CBAR-dan canlı məzənnələr" })}
          </div>
        )}

        <Tabs value={view} onValueChange={(v) => setView(v as View)} className="mb-5">
          <TabsList>
            <TabsTrigger value="cbar">{t("rates.tab.cbar")}</TabsTrigger>
            <TabsTrigger value="banks">{t("rates.tab.banksFor", { code: activeCurrency })}</TabsTrigger>
          </TabsList>
        </Tabs>

        {view === "cbar" ? (
          <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="font-semibold">{t("rates.cbarTitle")}</h2>
                <p className="text-xs text-muted-foreground mt-0.5">{t("rates.cbarSubtitle")}</p>
              </div>
              <span className="text-xs text-muted-foreground">{t("rates.updatedNow")}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/60">
                  <tr className="text-left text-xs uppercase text-muted-foreground">
                    <th className="px-4 py-3">{t("rates.th.currency")}</th>
                    <th className="px-4 py-3">{t("rates.th.code")}</th>
                    <th className="px-4 py-3 text-right">{t("rates.th.buy")}</th>
                    <th className="px-4 py-3 text-right">{t("rates.th.sell")}</th>
                    <th className="px-4 py-3 text-right">{t("rates.th.avg")}</th>
                    <th className="px-4 py-3 text-right">{t("rates.th.change24")}</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading
                    ? Array.from({ length: 6 }).map((_, i) => (
                        <tr key={i} className="border-t border-border/60">
                          <td className="px-4 py-3"><div className="h-5 w-24 rounded bg-muted animate-pulse" /></td>
                          <td className="px-4 py-3"><div className="h-5 w-12 rounded bg-muted animate-pulse" /></td>
                          <td className="px-4 py-3"><div className="h-5 w-16 rounded bg-muted animate-pulse ml-auto" /></td>
                          <td className="px-4 py-3"><div className="h-5 w-16 rounded bg-muted animate-pulse ml-auto" /></td>
                          <td className="px-4 py-3"><div className="h-5 w-16 rounded bg-muted animate-pulse ml-auto" /></td>
                          <td className="px-4 py-3"><div className="h-5 w-14 rounded bg-muted animate-pulse ml-auto" /></td>
                        </tr>
                      ))
                    : cbarCurrencies.map((c) => {
                        const up = c.change >= 0;
                        return (
                          <tr key={c.code} className="border-t border-border/60 hover:bg-muted/30">
                            <td className="px-4 py-3 flex items-center gap-2">
                              <span className="text-xl">{c.flag}</span>
                              <span className="font-medium">{c.code}</span>
                            </td>
                            <td className="px-4 py-3 text-muted-foreground">1 {c.code}</td>
                            <td className="px-4 py-3 text-right font-semibold">{c.buy.toFixed(4)}</td>
                            <td className="px-4 py-3 text-right font-semibold">{c.sell.toFixed(4)}</td>
                            <td className="px-4 py-3 text-right">{((c.buy + c.sell) / 2).toFixed(4)}</td>
                            <td
                              className={`px-4 py-3 text-right font-medium ${
                                up ? "text-success" : "text-destructive"
                              }`}
                            >
                              <span className="inline-flex items-center gap-1">
                                {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                                {up ? "+" : ""}
                                {c.change.toFixed(2)}%
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
            <div className="p-4 border-b border-border flex flex-wrap items-center gap-3 justify-between">
              <div>
                <h2 className="font-semibold flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  {t("rates.banksTitle", { code: activeCurrency })}
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">{t("rates.banksSubtitle")}</p>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t("lists.searchPlaceholder.bank")}
                  className="pl-8 h-9"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/60">
                  <tr className="text-left text-xs uppercase text-muted-foreground">
                    <th className="px-4 py-3">{t("rates.th.bank")}</th>
                    <th className="px-4 py-3 text-right">{t("rates.th.cashBuy")}</th>
                    <th className="px-4 py-3 text-right">{t("rates.th.cashSell")}</th>
                    <th className="px-4 py-3 text-right">{t("rates.th.wireBuy")}</th>
                    <th className="px-4 py-3 text-right">{t("rates.th.wireSell")}</th>
                    <th className="px-4 py-3 text-right">{t("rates.th.spread")}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBanks.map((b) => {
                    const o = seededOffset(b.id + activeCurrency);
                    const buy = baseCur.buy + o;
                    const sell = baseCur.sell + Math.abs(o) + 0.002;
                    const wireBuy = buy + 0.002;
                    const wireSell = sell - 0.002;
                    return (
                      <tr key={b.id} className="border-t border-border/60 hover:bg-muted/30">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div
                              className="h-8 w-8 rounded-lg flex items-center justify-center text-white font-bold text-xs shrink-0"
                              style={{ background: b.logoColor }}
                            >
                              {b.name
                                .split(" ")
                                .map((w) => w[0])
                                .slice(0, 2)
                                .join("")}
                            </div>
                            <span className="font-medium">{b.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right font-semibold">{buy.toFixed(4)}</td>
                        <td className="px-4 py-3 text-right font-semibold">{sell.toFixed(4)}</td>
                        <td className="px-4 py-3 text-right text-muted-foreground">{wireBuy.toFixed(4)}</td>
                        <td className="px-4 py-3 text-right text-muted-foreground">{wireSell.toFixed(4)}</td>
                        <td className="px-4 py-3 text-right text-accent font-medium">
                          {(sell - buy).toFixed(4)}
                        </td>
                      </tr>
                    );
                  })}
                  {filteredBanks.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-10 text-center text-sm text-muted-foreground">
                        {t("rates.bankNotFound")}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
