import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ListPageShell, FilterGroup } from "@/components/site/ListPageShell";
import { DepositCard } from "@/components/site/DepositCard";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X, Loader2 } from "lucide-react";
import { Deposit } from "@/data/finance";
import { useDeposits, useBanks } from "@/hooks/use-finance-api";

type Props = {
  title: string;
  description: string;
  breadcrumbs: { label: string; to?: string }[];
  initialCurrency?: "all" | "AZN" | "foreign";
  lockCurrency?: boolean;
};

type Sort = "rate-desc" | "rate-asc" | "term-desc" | "min-asc";

export const DepositsListPage = ({
  title, description, breadcrumbs, initialCurrency = "all", lockCurrency = false,
}: Props) => {
  const { t, i18n } = useTranslation();
  const { data: deposits = [], isLoading: depositsLoading } = useDeposits();
  const { data: banks = [], isLoading: banksLoading } = useBanks();

  const [currency, setCurrency] = useState<"all" | Deposit["currency"]>(
    initialCurrency === "AZN" ? "AZN" : initialCurrency === "foreign" ? "USD" : "all"
  );
  const [search, setSearch] = useState("");
  const [minRate, setMinRate] = useState(0);
  const [maxTerm, setMaxTerm] = useState(36);
  const [maxMinAmount, setMaxMinAmount] = useState(5000);
  const [selectedBanks, setSelectedBanks] = useState<string[]>([]);
  const [sort, setSort] = useState<Sort>("rate-desc");

  const localeTag = i18n.language === "ru" ? "ru-RU" : i18n.language === "en" ? "en-US" : "az-AZ";

  const toggleBank = (id: string) =>
    setSelectedBanks((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const reset = () => {
    setSearch(""); setMinRate(0); setMaxTerm(36); setMaxMinAmount(5000); setSelectedBanks([]); setSort("rate-desc");
    if (!lockCurrency) setCurrency("all");
  };

  const filtered = useMemo(() => {
    let list = deposits.filter((d) => {
      if (lockCurrency && initialCurrency === "AZN" && d.currency !== "AZN") return false;
      if (lockCurrency && initialCurrency === "foreign" && d.currency === "AZN") return false;
      if (!lockCurrency && currency !== "all" && d.currency !== currency) return false;
      if (search && !d.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (d.rate < minRate) return false;
      if (d.termMonths > maxTerm) return false;
      if (d.minAmount > maxMinAmount) return false;
      if (selectedBanks.length && !selectedBanks.includes(d.bankId)) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sort === "rate-desc") return b.rate - a.rate;
      if (sort === "rate-asc") return a.rate - b.rate;
      if (sort === "term-desc") return b.termMonths - a.termMonths;
      return a.minAmount - b.minAmount;
    });
    return list;
  }, [deposits, currency, search, minRate, maxTerm, maxMinAmount, selectedBanks, sort, lockCurrency, initialCurrency]);

  const filters = (
    <div>
      {!lockCurrency && (
        <FilterGroup title={t("lists.currencyFilter")}>
          <Select value={currency} onValueChange={(v) => setCurrency(v as typeof currency)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("common.all")}</SelectItem>
              <SelectItem value="AZN">{t("lists.currencyOptions.azn")}</SelectItem>
              <SelectItem value="USD">{t("lists.currencyOptions.usd")}</SelectItem>
              <SelectItem value="EUR">{t("lists.currencyOptions.eur")}</SelectItem>
            </SelectContent>
          </Select>
        </FilterGroup>
      )}

      <FilterGroup title={t("lists.search")}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t("lists.searchPlaceholder.deposit")} className="pl-8 h-9" />
        </div>
      </FilterGroup>

      <FilterGroup title={t("lists.minRate", { value: minRate })}>
        <Slider value={[minRate]} min={0} max={15} step={0.5} onValueChange={(v) => setMinRate(v[0])} />
      </FilterGroup>

      <FilterGroup title={t("lists.maxTerm", { value: maxTerm })}>
        <Slider value={[maxTerm]} min={3} max={60} step={1} onValueChange={(v) => setMaxTerm(v[0])} />
      </FilterGroup>

      <FilterGroup title={t("lists.minAmountLte", { value: maxMinAmount.toLocaleString(localeTag) })}>
        <Slider value={[maxMinAmount]} min={100} max={10000} step={100} onValueChange={(v) => setMaxMinAmount(v[0])} />
      </FilterGroup>

      <FilterGroup title={t("lists.banks")}>
        <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
          {banks.map((b) => (
            <label key={b.id} className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary">
              <Checkbox checked={selectedBanks.includes(b.id)} onCheckedChange={() => toggleBank(b.id)} />
              <span>{b.name}</span>
            </label>
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
      <SelectTrigger className="h-9 w-[180px]"><SelectValue /></SelectTrigger>
      <SelectContent>
        <SelectItem value="rate-desc">{t("lists.sort.rateDesc")}</SelectItem>
        <SelectItem value="rate-asc">{t("lists.sort.rateAsc")}</SelectItem>
        <SelectItem value="term-desc">{t("lists.sort.termDesc")}</SelectItem>
        <SelectItem value="min-asc">{t("lists.sort.minAsc")}</SelectItem>
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
    >
      {depositsLoading || banksLoading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl p-10 text-center">
          <p className="text-sm text-muted-foreground">{t("lists.noDeposits")}</p>
          <Button variant="outline" size="sm" onClick={reset} className="mt-4">{t("common.resetFilters")}</Button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map((d) => (
            <DepositCard key={d.id} deposit={d} />
          ))}
        </div>
      )}
    </ListPageShell>
  );
};

