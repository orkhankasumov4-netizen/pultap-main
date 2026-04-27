import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ChevronRight,
  Star,
  MapPin,
  Phone,
  Globe,
  Building2,
  Banknote,
  Calendar,
  CreditCard,
  PiggyBank,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useInstitutions, useCredits, useDeposits, useCards } from "@/hooks/use-finance-api";
import { useLocalePath } from "@/i18n/locale-routing";
import type { Credit, Deposit, Card } from "@/data/finance";

export default function BankDetailPage() {
  const { t } = useTranslation();
  const lp = useLocalePath();
  const { id } = useParams<{ id: string }>();

  const { data: institutions = [], isLoading: instLoading } = useInstitutions();
  const { data: credits = [], isLoading: creditsLoading } = useCredits();
  const { data: deposits = [], isLoading: depositsLoading } = useDeposits();
  const { data: cards = [], isLoading: cardsLoading } = useCards();

  const inst = institutions.find((i: Record<string, unknown>) => i.id === id);

  if (instLoading || creditsLoading || depositsLoading || cardsLoading) {
    return (
      <div className="flex items-center justify-center py-20 min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!inst) return <Navigate to={lp("/banks")} replace />;

  const bankCredits = credits.filter((c: Credit) => c.bankId === inst?.id);
  const bankDeposits = deposits.filter((d: Deposit) => d.bankId === inst?.id);
  const bankCards = cards.filter((c: Card) => c.bankId === inst?.id);

  const typeLabels: Record<string, string> = {
    online: "Onlayn",
    "nağd": "Nağd",
    ipoteka: "İpoteka",
    avto: "Avto",
  };

  return (
    <>
      <Helmet>
        <title>{`${inst.name} | Pultap.az`}</title>
        <meta name="description" content={inst.description} />
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="container py-10 md:py-14">
          <nav className="flex items-center gap-1.5 text-xs text-primary-foreground/70 mb-3">
            <Link to={lp("/")} className="hover:text-primary-foreground">
              {t("common.home")}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link
              to={lp(inst.type === "bank" ? "/banks" : "/bokt")}
              className="hover:text-primary-foreground"
            >
              {inst.type === "bank"
                ? t("institutions.breadcrumb.banks", { defaultValue: "Banklar" })
                : t("institutions.breadcrumb.bokt", { defaultValue: "BOKT" })}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span>{inst.name}</span>
          </nav>

          <div className="flex items-center gap-5">
            <div
              className="h-16 w-16 md:h-20 md:w-20 rounded-2xl flex items-center justify-center text-white font-bold shrink-0 shadow-lg text-xl md:text-2xl"
              style={{ background: inst.logoColor }}
            >
              {inst.name
                .split(" ")
                .map((w) => w[0])
                .slice(0, 2)
                .join("")}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">
                {inst.name}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-primary-foreground/70">
                <Badge className="bg-success/20 text-success border-success/30">
                  <Star className="h-3 w-3 fill-success mr-1" />
                  {inst.rating} ({inst.reviews})
                </Badge>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {t("bankDetail.since", { defaultValue: "Təsis" })}: {inst.established}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-8 md:py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          <StatCard
            icon={Calendar}
            label={t("institutions.mini.established")}
            value={String(inst.established)}
          />
          <StatCard
            icon={MapPin}
            label={t("institutions.mini.branches")}
            value={String(inst.branches)}
          />
          {inst.type === "bank" && (
            <StatCard
              icon={Banknote}
              label={t("institutions.mini.atms")}
              value={String(inst.atms)}
            />
          )}
          <StatCard
            icon={Star}
            label={t("institutions.stats.avgRating")}
            value={String(inst.rating)}
            accent
          />
        </div>

        {/* About */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-card mb-8">
          <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            {t("bankDetail.about", { defaultValue: "Haqqında" })}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{inst.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
            <a
              href={`https://${inst.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-primary hover:underline"
            >
              <Globe className="h-4 w-4" />
              {inst.website}
              <ExternalLink className="h-3 w-3" />
            </a>
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <Phone className="h-4 w-4" />
              {inst.phone}
            </span>
          </div>
        </div>

        {/* Credits */}
        {bankCredits.length > 0 && (
          <div className="mb-8">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Banknote className="h-5 w-5 text-primary" />
              {t("bankDetail.credits", { defaultValue: "Kreditlər" })}
              <span className="text-sm font-normal text-muted-foreground">({bankCredits.length})</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {bankCredits.map((cr) => (
                <div
                  key={cr.id}
                  className="bg-card border border-border rounded-2xl p-5 shadow-card hover:shadow-elegant transition-shadow"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-semibold">{cr.name}</h3>
                      <span className="text-xs text-muted-foreground">{typeLabels[cr.type] ?? cr.type}</span>
                    </div>
                    {cr.highlight && (
                      <Badge className="bg-primary/10 text-primary border-primary/20 shrink-0">
                        {cr.highlight}
                      </Badge>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <MiniStat
                      label={t("credit.rate", { defaultValue: "Faiz" })}
                      value={`${cr.rate}%`}
                    />
                    <MiniStat
                      label={t("credit.amount", { defaultValue: "Məbləğ" })}
                      value={`${(cr.amountMax / 1000).toFixed(0)}K`}
                    />
                    <MiniStat
                      label={t("credit.term", { defaultValue: "Müddət" })}
                      value={`${cr.termMax} ay`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-right">
              <Link to={lp("/kreditler")} className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                {t("bankDetail.allCredits", { defaultValue: "Bütün kreditlər" })}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Deposits */}
        {bankDeposits.length > 0 && (
          <div className="mb-8">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <PiggyBank className="h-5 w-5 text-primary" />
              {t("bankDetail.deposits", { defaultValue: "Depozitlər" })}
              <span className="text-sm font-normal text-muted-foreground">({bankDeposits.length})</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {bankDeposits.map((dep) => (
                <div
                  key={dep.id}
                  className="bg-card border border-border rounded-2xl p-5 shadow-card hover:shadow-elegant transition-shadow"
                >
                  <h3 className="font-semibold mb-3">{dep.name}</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <MiniStat
                      label={t("deposit.rate", { defaultValue: "Faiz" })}
                      value={`${dep.rate}%`}
                    />
                    <MiniStat
                      label={t("deposit.currency", { defaultValue: "Valyuta" })}
                      value={dep.currency}
                    />
                    <MiniStat
                      label={t("deposit.term", { defaultValue: "Müddət" })}
                      value={`${dep.termMonths} ay`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-right">
              <Link to={lp("/depozit")} className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                {t("bankDetail.allDeposits", { defaultValue: "Bütün depozitlər" })}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Cards */}
        {bankCards.length > 0 && (
          <div className="mb-8">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              {t("bankDetail.cards", { defaultValue: "Kartlar" })}
              <span className="text-sm font-normal text-muted-foreground">({bankCards.length})</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {bankCards.map((card) => (
                <div
                  key={card.id}
                  className="bg-card border border-border rounded-2xl p-5 shadow-card hover:shadow-elegant transition-shadow"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="font-semibold">{card.name}</h3>
                    <Badge variant="outline" className="shrink-0 capitalize">
                      {card.kind}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <MiniStat
                      label="Cashback"
                      value={`${card.cashback}%`}
                    />
                    <MiniStat
                      label={t("card.annualFee", { defaultValue: "İllik" })}
                      value={card.annualFee === 0 ? t("common.free", { defaultValue: "Pulsuz" }) : `${card.annualFee} ₼`}
                    />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {card.perks.map((perk) => (
                      <span
                        key={perk}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary"
                      >
                        {perk}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back */}
        <div className="pt-4 border-t border-border">
          <Link to={lp(inst.type === "bank" ? "/banks" : "/bokt")}>
            <Button variant="outline" className="gap-2">
              {t("bankDetail.backToList", { defaultValue: "Bütün banklar" })}
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}

const StatCard = ({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: typeof Star;
  label: string;
  value: string;
  accent?: boolean;
}) => (
  <div className="bg-card border border-border rounded-2xl p-4 shadow-card">
    <Icon className={`h-5 w-5 mb-2 ${accent ? "text-accent" : "text-primary"}`} />
    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    <div className={`mt-0.5 text-xl font-bold ${accent ? "text-accent" : ""}`}>{value}</div>
  </div>
);

const MiniStat = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-muted rounded-lg p-2.5">
    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    <div className="text-sm font-semibold">{value}</div>
  </div>
);
