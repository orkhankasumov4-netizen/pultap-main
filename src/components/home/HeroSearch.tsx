import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Wallet, PiggyBank, CreditCard, Home, Search, ShieldCheck, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocalePath } from "@/i18n/locale-routing";

const tabs = [
  { key: "credit",   icon: Wallet,     to: "/kreditler",                     labelKey: "home.hero.tabs.credit",   placeholderKey: "home.hero.placeholders.credit" },
  { key: "deposit",  icon: PiggyBank,  to: "/depozit",                       labelKey: "home.hero.tabs.deposit",  placeholderKey: "home.hero.placeholders.deposit" },
  { key: "card",     icon: CreditCard, to: "/bank-kartlari/kredit-kartlari", labelKey: "home.hero.tabs.card",     placeholderKey: "home.hero.placeholders.card" },
  { key: "mortgage", icon: Home,       to: "/ipoteka",                       labelKey: "home.hero.tabs.mortgage", placeholderKey: "home.hero.placeholders.mortgage" },
] as const;

const trustItems = [
  { i: ShieldCheck, key: "home.hero.trust.free" },
  { i: Zap,         key: "home.hero.trust.instant" },
  { i: TrendingUp,  key: "home.hero.trust.updated" },
];

export const HeroSearch = () => {
  const [active, setActive] = useState<typeof tabs[number]["key"]>("credit");
  const [val, setVal] = useState("");
  const nav = useNavigate();
  const { t } = useTranslation();
  const lp = useLocalePath();
  const tab = tabs.find((t) => t.key === active)!;

  return (
    <section className="relative overflow-hidden bg-gradient-hero text-white">
      <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
      <div className="absolute -top-32 -right-20 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
      <div className="absolute top-40 -left-20 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />

      <div className="container relative py-14 md:py-20 lg:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/15 text-xs font-medium mb-5">
            <Zap className="h-3.5 w-3.5 text-accent" />
            <span>{t("home.hero.badge")}</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.1] tracking-tight">
            {t("home.hero.titleA")} <span className="text-accent">{t("home.hero.titleHighlight")}</span>,
            <br className="hidden md:block" /> {t("home.hero.titleB")}
          </h1>
          <p className="mt-5 text-base md:text-lg text-white/75 max-w-2xl mx-auto">
            {t("home.hero.subtitle")}
          </p>
        </div>

        {/* Search panel */}
        <div className="mt-9 md:mt-12 max-w-3xl mx-auto bg-card text-card-foreground rounded-xl shadow-elevated overflow-hidden border border-border">
          <div role="tablist" className="grid grid-cols-2 sm:flex border-b border-border bg-surface">
            {tabs.map((tb) => {
              const Icon = tb.icon;
              const isActive = active === tb.key;
              return (
                <button
                  key={tb.key}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(tb.key)}
                  className={`flex-1 sm:min-w-[110px] flex items-center justify-center gap-2 px-2 sm:px-4 py-3 sm:py-3.5 text-xs sm:text-sm font-medium border-b-2 transition-colors ${
                    isActive
                      ? "border-primary text-primary bg-card"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:bg-card/60"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {t(tb.labelKey)}
                </button>
              );
            })}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); nav(lp(tab.to) + (val.trim() ? `?q=${encodeURIComponent(val.trim())}` : "")); }}
            className="p-4 md:p-5 flex flex-col md:flex-row gap-3"
          >
            <div className="flex-1 relative">
              <label htmlFor="hero-search-input" className="sr-only">
                {t(tab.placeholderKey)}
              </label>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="hero-search-input"
                type="number"
                value={val}
                onChange={(e) => setVal(e.target.value)}
                placeholder={t(tab.placeholderKey)}
                className="pl-10 h-12 text-base"
              />
            </div>
            <Button type="submit" size="lg" className="h-12 px-7 bg-primary hover:bg-primary-hover gap-2">
              <Search className="h-4 w-4" /> {t("home.hero.cta")}
            </Button>
          </form>

          <div className="px-5 pb-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{t("home.hero.popular")}</span>
            <Link to={lp("/kreditler/nagd-pul-krediti")} className="hover:text-primary">{t("nav.items.cashCredit")}</Link>
            <Link to={lp("/depozit/manatla-depozit")} className="hover:text-primary">{t("nav.items.manatDeposits")}</Link>
            <Link to={lp("/bank-kartlari/kredit-kartlari")} className="hover:text-primary">{t("nav.items.creditCards")}</Link>
            <Link to={lp("/ipoteka/dovlet-ipotekasi")} className="hover:text-primary">{t("nav.items.stateMortgage")}</Link>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm text-white/80">
          {trustItems.map(({ i: Icon, key }) => (
            <span key={key} className="inline-flex items-center gap-2">
              <Icon className="h-4 w-4 text-accent" /> {t(key)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
