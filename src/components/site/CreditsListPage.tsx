import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ListPageShell, FilterGroup } from "@/components/site/ListPageShell";
import { CreditCard } from "@/components/site/CreditCard";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X, Loader2 } from "lucide-react";
import { Credit } from "@/data/finance";
import { useCompare } from "@/context/CompareContext";
import { useLocalePath } from "@/i18n/locale-routing";
import { filterAndSortCredits } from "@/lib/filters";
import { useCredits, useBanks } from "@/hooks/use-finance-api";

type Props = {
  title: string;
  description: string;
  breadcrumbs: { label: string; to?: string }[];
  initialType?: Credit["type"] | "all";
  lockType?: boolean;
  metaTitle?: string;
  metaDescription?: string;
};

type Sort = "rate-asc" | "rate-desc" | "amount-desc" | "term-desc";

export const CreditsListPage = ({
  title,
  description,
  breadcrumbs,
  initialType = "all",
  lockType = false,
  metaTitle,
  metaDescription,
}: Props) => {
  const { t, i18n } = useTranslation();
  const lp = useLocalePath();
  const { ids: compare, toggle: toggleCompare, clear: clearCompare } = useCompare();
  
  const { data: credits = [], isLoading: creditsLoading } = useCredits();
  const { data: banks = [], isLoading: banksLoading } = useBanks();

  const [type, setType] = useState<Credit["type"] | "all">(initialType);
  const [search, setSearch] = useState("");
  const [amount, setAmount] = useState(10000);
  const [term, setTerm] = useState(36);
  const [maxRate, setMaxRate] = useState(20);
  const [selectedBanks, setSelectedBanks] = useState<string[]>([]);
  const [collateral, setCollateral] = useState<"any" | "yes" | "no">("any");
  const [insurance, setInsurance] = useState<"any" | "yes" | "no">("any");
  const [sort, setSort] = useState<Sort>("rate-asc");

  const localeTag = i18n.language === "ru" ? "ru-RU" : i18n.language === "en" ? "en-US" : "az-AZ";

  const toggleBank = (id: string) =>
    setSelectedBanks((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const reset = () => {
    setType(initialType);
    setSearch("");
    setAmount(10000);
    setTerm(36);
    setMaxRate(20);
    setSelectedBanks([]);
    setCollateral("any");
    setInsurance("any");
    setSort("rate-asc");
  };

  const filtered = useMemo(() => filterAndSortCredits(credits, {
    type, search, amount, term, maxRate, selectedBanks, collateral, insurance, sort
  }), [credits, type, search, amount, term, maxRate, selectedBanks, collateral, insurance, sort]);

  const filters = (
    <div>
      {!lockType && (
        <FilterGroup title={t("lists.loanType")}>
          <Select value={type} onValueChange={(v) => setType(v as Credit["type"] | "all")}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("common.all")}</SelectItem>
              <SelectItem value="online">{t("lists.loanTypes.online")}</SelectItem>
              <SelectItem value="nağd">{t("lists.loanTypes.cash")}</SelectItem>
              <SelectItem value="ipoteka">{t("lists.loanTypes.mortgage")}</SelectItem>
              <SelectItem value="avto">{t("lists.loanTypes.auto")}</SelectItem>
            </SelectContent>
          </Select>
        </FilterGroup>
      )}

      <FilterGroup title={t("lists.search")}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("lists.searchPlaceholder.loan")}
            className="pl-8 h-9"
          />
        </div>
      </FilterGroup>

      <FilterGroup title={t("lists.amountWithUnit", { value: amount.toLocaleString(localeTag) })}>
        <Slider value={[amount]} min={500} max={150000} step={500} onValueChange={(v) => setAmount(v[0])} />
        <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
          {/* eslint-disable-next-line i18next/no-literal-string */}
          <span>500 ₼</span>
          {/* eslint-disable-next-line i18next/no-literal-string */}
          <span>150.000 ₼</span>
        </div>
      </FilterGroup>

      <FilterGroup title={t("lists.termWithUnit", { value: term })}>
        <Slider value={[term]} min={3} max={120} step={1} onValueChange={(v) => setTerm(v[0])} />
        <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
          <span>3 {t("common.month")}</span><span>120 {t("common.month")}</span>
        </div>
      </FilterGroup>

      <FilterGroup title={t("lists.maxRate", { value: maxRate })}>
        <Slider value={[maxRate]} min={5} max={30} step={0.5} onValueChange={(v) => setMaxRate(v[0])} />
      </FilterGroup>

      <FilterGroup title={t("lists.banks")}>
        <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
          {banks.map((b) => (
            <label key={b.id} className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary">
              <Checkbox
                checked={selectedBanks.includes(b.id)}
                onCheckedChange={() => toggleBank(b.id)}
              />
              <span>{b.name}</span>
            </label>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title={t("lists.collateral")}>
        <div className="grid grid-cols-3 gap-1">
          {(["any", "yes", "no"] as const).map((v) => (
            <Button key={v} type="button" size="sm" variant={collateral === v ? "default" : "outline"} onClick={() => setCollateral(v)} className="h-8 text-xs">
              {v === "any" ? t("common.any") : v === "yes" ? t("common.yes") : t("common.no")}
            </Button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title={t("lists.insurance")}>
        <div className="grid grid-cols-3 gap-1">
          {(["any", "yes", "no"] as const).map((v) => (
            <Button key={v} type="button" size="sm" variant={insurance === v ? "default" : "outline"} onClick={() => setInsurance(v)} className="h-8 text-xs">
              {v === "any" ? t("common.any") : v === "yes" ? t("common.yes") : t("common.no")}
            </Button>
          ))}
        </div>
      </FilterGroup>

      <Button variant="outline" size="sm" onClick={reset} className="w-full mt-5 gap-2">
        <X className="h-3.5 w-3.5" /> {t("common.resetFilters")}
      </Button>
    </div>
  );

  const toolbar = (
    <Select value={sort} onValueChange={(v) => setSort(v as Sort)}>
      <SelectTrigger className="h-9 w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="rate-asc">{t("lists.sort.rateAsc")}</SelectItem>
        <SelectItem value="rate-desc">{t("lists.sort.rateDesc")}</SelectItem>
        <SelectItem value="amount-desc">{t("lists.sort.amountDesc")}</SelectItem>
        <SelectItem value="term-desc">{t("lists.sort.termDesc")}</SelectItem>
      </SelectContent>
    </Select>
  );

  return (
    <ListPageShell
      title={title}
      description={description}
      breadcrumbs={breadcrumbs}
      filters={filters}
      toolbar={toolbar}
      resultsCount={filtered.length}
      metaTitle={metaTitle}
      metaDescription={metaDescription}
    >
      {creditsLoading || banksLoading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl p-10 text-center">
          <p className="text-sm text-muted-foreground">{t("lists.noLoans")}</p>
          <Button variant="outline" size="sm" onClick={reset} className="mt-4">{t("common.resetFilters")}</Button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map((c) => (
            <CreditCard
              key={c.id}
              credit={c}
              selected={compare.includes(c.id)}
              onToggleCompare={toggleCompare}
            />
          ))}
        </div>
      )}

      {compare.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 bg-secondary text-secondary-foreground rounded-full shadow-lg px-5 py-3 flex items-center gap-3">
          <Label className="text-xs">{t("lists.compareBar", { n: compare.length })}</Label>
          <Button asChild size="sm" variant="default" className="bg-primary rounded-full">
            <Link to={lp("/muqayise")}>{t("common.compare")}</Link>
          </Button>
          <Button size="sm" variant="ghost" className="text-secondary-foreground" onClick={clearCompare}>{t("lists.clear")}</Button>
        </div>
      )}
    </ListPageShell>
  );
};
