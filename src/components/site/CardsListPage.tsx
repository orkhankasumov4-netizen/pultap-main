import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ListPageShell, FilterGroup } from "@/components/site/ListPageShell";
import { BankCardItem } from "@/components/site/BankCardItem";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X, Loader2 } from "lucide-react";
import { Card } from "@/data/finance";
import { useCards, useBanks } from "@/hooks/use-finance-api";

type Props = {
  kind: Card["kind"];
  title: string;
  description: string;
  breadcrumbs: { label: string; to?: string }[];
};

type Sort = "cashback-desc" | "fee-asc" | "limit-desc";

export const CardsListPage = ({ kind, title, description, breadcrumbs }: Props) => {
  const { t } = useTranslation();
  const { data: cards = [], isLoading: cardsLoading } = useCards();
  const { data: banks = [], isLoading: banksLoading } = useBanks();

  const [search, setSearch] = useState("");
  const [minCashback, setMinCashback] = useState(0);
  const [maxFee, setMaxFee] = useState(100);
  const [feeFreeOnly, setFeeFreeOnly] = useState(false);
  const [selectedBanks, setSelectedBanks] = useState<string[]>([]);
  const [sort, setSort] = useState<Sort>("cashback-desc");

  const toggleBank = (id: string) =>
    setSelectedBanks((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const reset = () => {
    setSearch(""); setMinCashback(0); setMaxFee(100); setFeeFreeOnly(false); setSelectedBanks([]); setSort("cashback-desc");
  };

  const filtered = useMemo(() => {
    let list = cards.filter((c) => {
      if (c.kind !== kind) return false;
      if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (c.cashback < minCashback) return false;
      if (c.annualFee > maxFee) return false;
      if (feeFreeOnly && c.annualFee !== 0) return false;
      if (selectedBanks.length && !selectedBanks.includes(c.bankId)) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sort === "cashback-desc") return b.cashback - a.cashback;
      if (sort === "fee-asc") return a.annualFee - b.annualFee;
      return (b.limit ?? 0) - (a.limit ?? 0);
    });
    return list;
  }, [cards, kind, search, minCashback, maxFee, feeFreeOnly, selectedBanks, sort]);

  const filters = (
    <div>
      <FilterGroup title={t("lists.search")}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t("lists.searchPlaceholder.card")} className="pl-8 h-9" />
        </div>
      </FilterGroup>

      <FilterGroup title={t("lists.minCashbackVal", { value: minCashback })}>
        <Slider value={[minCashback]} min={0} max={10} step={0.5} onValueChange={(v) => setMinCashback(v[0])} />
      </FilterGroup>

      <FilterGroup title={t("lists.maxFee", { value: maxFee })}>
        <Slider value={[maxFee]} min={0} max={200} step={5} onValueChange={(v) => setMaxFee(v[0])} />
      </FilterGroup>

      <FilterGroup title={t("lists.extras")}>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <Checkbox checked={feeFreeOnly} onCheckedChange={(v) => setFeeFreeOnly(!!v)} />
          <span>{t("lists.feeFreeOnly")}</span>
        </label>
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
        <SelectItem value="cashback-desc">{t("lists.sort.cashbackDesc")}</SelectItem>
        <SelectItem value="fee-asc">{t("lists.sort.feeAsc")}</SelectItem>
        <SelectItem value="limit-desc">{t("lists.sort.limitDesc")}</SelectItem>
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
      {cardsLoading || banksLoading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl p-10 text-center">
          <p className="text-sm text-muted-foreground">{t("lists.noCards")}</p>
          <Button variant="outline" size="sm" onClick={reset} className="mt-4">{t("common.resetFilters")}</Button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map((c) => (
            <BankCardItem key={c.id} card={c} />
          ))}
        </div>
      )}
    </ListPageShell>
  );
};
