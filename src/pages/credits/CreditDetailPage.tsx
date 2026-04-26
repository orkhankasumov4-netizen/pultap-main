import { Helmet } from "react-helmet-async";
import { Link, useParams, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ChevronRight,
  Star,
  Check,
  X,
  Clock,
  Banknote,
  Percent,
  Shield,
  FileText,
  ArrowLeft,
  Building2,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BankLogo } from "@/components/site/BankLogo";
import { LoanCalculator } from "@/components/site/LoanCalculator";
import { ApplicationDialog } from "@/components/site/ApplicationDialog";
import { useCredits, useBanks, useInstitutions } from "@/hooks/use-finance-api";
import { useLocalePath } from "@/i18n/locale-routing";

const fmt = (n: number) => new Intl.NumberFormat("az-AZ").format(n);

export default function CreditDetailPage() {
  const { t } = useTranslation();
  const lp = useLocalePath();
  const { id } = useParams<{ id: string }>();
  const { data: credits = [], isLoading: creditsLoading } = useCredits();
  const { data: banks = [], isLoading: banksLoading } = useBanks();
  const { data: institutions = [] } = useInstitutions();

  const isLoading = creditsLoading || banksLoading;

  if (isLoading) {
    return (
      <div className="flex-grow flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
      </div>
    );
  }

  const credit = credits.find((c) => c.id === id);
  if (!credit) return <Navigate to={lp("/kreditler")} replace />;

  const bank = banks.find(b => b.id === credit.bankId);
  if (!bank) return <Navigate to={lp("/kreditler")} replace />;

  const inst = institutions.find((i) => i.id === credit.bankId);

  const typeLabels: Record<string, string> = {
    online: "Onlayn kredit",
    "nağd": "Nağd pul krediti",
    ipoteka: "İpoteka krediti",
    avto: "Avto kredit",
  };

  const requirements = [
    { label: t("creditDetail.req.age", { defaultValue: "Yaş" }), value: "18–65" },
    { label: t("creditDetail.req.citizenship", { defaultValue: "Vətəndaşlıq" }), value: "AR vətəndaşı" },
    { label: t("creditDetail.req.income", { defaultValue: "Gəlir" }), value: t("creditDetail.req.incomeValue", { defaultValue: "Rəsmi gəlir tələb olunur" }) },
    { label: t("creditDetail.req.docs", { defaultValue: "Sənədlər" }), value: t("creditDetail.req.docsValue", { defaultValue: "Ş/V, DSMF çıxarışı" }) },
  ];

  return (
    <>
      <Helmet>
        <title>{`${credit.name} | Pultap.az`}</title>
        <meta name="description" content={`${credit.name} — ${credit.rate}% faiz, ${fmt(credit.amountMax)} ₼-dək, ${credit.termMax} ay müddət.`} />
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="container py-10 md:py-14">
          <nav className="flex items-center gap-1.5 text-xs text-primary-foreground/70 mb-3 flex-wrap">
            <Link to={lp("/")} className="hover:text-primary-foreground">{t("common.home")}</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to={lp("/kreditler")} className="hover:text-primary-foreground">{t("nav.credits")}</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="truncate max-w-[200px]">{credit.name}</span>
          </nav>

          <div className="flex items-center gap-5">
            <BankLogo id={bank.id} size={56} />
            <div>
              <h1 className="text-2xl md:text-4xl font-display font-bold tracking-tight">
                {credit.name}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-primary-foreground/70">
                <Link to={lp(`/banks/${bank.id}`)} className="hover:text-primary-foreground flex items-center gap-1.5">
                  <Building2 className="h-4 w-4" />
                  {bank.name}
                </Link>
                <Badge className="bg-success/20 text-success border-success/30">
                  <Star className="h-3 w-3 fill-success mr-1" />
                  {bank.rating}
                </Badge>
                {credit.highlight && (
                  <Badge className="bg-accent/20 text-accent border-accent/30">
                    {credit.highlight}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-8 md:py-10">
        {/* Key stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          <StatCard icon={Percent} label={t("card.rate")} value={`${credit.rate}%`} accent />
          <StatCard
            icon={Banknote}
            label={t("card.amount")}
            value={`${fmt(credit.amountMin)} – ${fmt(credit.amountMax)} ₼`}
          />
          <StatCard
            icon={Clock}
            label={t("card.term")}
            value={`${credit.termMin} – ${credit.termMax} ${t("common.month")}`}
          />
          <StatCard
            icon={FileText}
            label={t("creditDetail.type", { defaultValue: "Növ" })}
            value={typeLabels[credit.type] ?? credit.type}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Conditions */}
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 shadow-card">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              {t("creditDetail.conditions", { defaultValue: "Kredit şərtləri" })}
            </h2>

            <div className="space-y-4">
              <ConditionRow
                label={t("card.rate")}
                value={`İllik ${credit.rate}%`}
              />
              <ConditionRow
                label={t("creditDetail.amountRange", { defaultValue: "Məbləğ aralığı" })}
                value={`${fmt(credit.amountMin)} ₼ – ${fmt(credit.amountMax)} ₼`}
              />
              <ConditionRow
                label={t("creditDetail.termRange", { defaultValue: "Müddət aralığı" })}
                value={`${credit.termMin} – ${credit.termMax} ay`}
              />
              <ConditionRow
                label={t("lists.collateral")}
                value={
                  <span className="flex items-center gap-1.5">
                    {credit.collateral ? (
                      <><Check className="h-4 w-4 text-success" /> {t("common.yes", { defaultValue: "Bəli" })}</>
                    ) : (
                      <><X className="h-4 w-4 text-muted-foreground" /> {t("common.no", { defaultValue: "Xeyr" })}</>
                    )}
                  </span>
                }
              />
              <ConditionRow
                label={t("lists.insurance")}
                value={
                  <span className="flex items-center gap-1.5">
                    {credit.insurance ? (
                      <><Check className="h-4 w-4 text-success" /> {t("common.yes", { defaultValue: "Bəli" })}</>
                    ) : (
                      <><X className="h-4 w-4 text-muted-foreground" /> {t("common.no", { defaultValue: "Xeyr" })}</>
                    )}
                  </span>
                }
              />
            </div>
          </div>

          {/* Requirements + Bank info */}
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                {t("creditDetail.requirements", { defaultValue: "Tələblər" })}
              </h3>
              <div className="space-y-3">
                {requirements.map((r) => (
                  <div key={r.label} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{r.label}</span>
                    <span className="font-medium text-right">{r.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {inst && (
              <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  {bank.name}
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground text-xs leading-relaxed">{inst.description}</p>
                  <div className="pt-2">
                    <Link
                      to={lp(`/banks/${bank.id}`)}
                      className="text-primary hover:underline text-xs inline-flex items-center gap-1"
                    >
                      {t("creditDetail.bankPage", { defaultValue: "Bank səhifəsinə keç" })}
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Embedded calculator */}
        <div className="mb-8">
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
            {t("creditDetail.calculator", { defaultValue: "Bu kredit üçün hesablayın" })}
          </h2>
          <LoanCalculator />
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-border flex items-center justify-between">
          <Link to={lp("/kreditler")}>
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t("creditDetail.backToList", { defaultValue: "Bütün kreditlər" })}
            </Button>
          </Link>
          <ApplicationDialog
            trigger={<Button className="bg-gradient-primary">{t("common.apply", { defaultValue: "Müraciət et" })}</Button>}
            productName={credit.name}
            productType="Kredit"
          />
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
    <div className={`mt-0.5 text-lg font-bold ${accent ? "text-accent" : ""}`}>{value}</div>
  </div>
);

const ConditionRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className="text-sm font-semibold text-right">{value}</span>
  </div>
);
