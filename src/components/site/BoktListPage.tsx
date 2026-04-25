import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ListPageShell, FilterGroup } from "@/components/site/ListPageShell";
import { BoktProductCard } from "@/components/site/BoktProductCard";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { boktProducts, bokts, BoktProduct } from "@/data/finance";

type Props = {
  title: string;
  description: string;
  breadcrumbs: { label: string; to?: string }[];
  initialType?: BoktProduct["type"] | "all";
  lockType?: boolean;
};

type Sort = "rate-asc" | "rate-desc" | "amount-desc";

export const BoktListPage = ({ title, description, breadcrumbs, initialType = "all", lockType = false }: Props) => {
  const { t, i18n } = useTranslation();
  const [type, setType] = useState<BoktProduct["type"] | "all">(initialType);
  const [search, setSearch] = useState("");
  const [amount, setAmount] = useState(2000);
  const [maxRate, setMaxRate] = useState(30);
  const [selected, setSelected] = useState<string[]>([]);
  const [sort, setSort] = useState<Sort>("rate-asc");

  const localeTag = i18n.language === "ru" ? "ru-RU" : i18n.language === "en" ? "en-US" : "az-AZ";

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const reset = () => {
    setType(initialType); setSearch(""); setAmount(2000); setMaxRate(30); setSelected([]); setSort("rate-asc");
  };

  const filtered = useMemo(() => {
    let list = boktProducts.filter((p) => {
      if (type !== "all" && p.type !== type) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (amount < p.amountMin || amount > p.amountMax) return false;
      if (p.rate > maxRate) return false;
      if (selected.length && !selected.includes(p.boktId)) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sort === "rate-asc") return a.rate - b.rate;
      if (sort === "rate-desc") return b.rate - a.rate;
      return b.amountMax - a.amountMax;
    });
    return list;
  }, [type, search, amount, maxRate, selected, sort]);

  const filters = (
    <div>
      {!lockType && (
        <FilterGroup title={t("lists.boktType")}>
          <Select value={type} onValueChange={(v) => setType(v as BoktProduct["type"] | "all")}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("common.all")}</SelectItem>
              <SelectItem value="nağd">{t("lists.boktTypes.cash")}</SelectItem>
              <SelectItem value="lombard">{t("lists.boktTypes.lombard")}</SelectItem>
            </SelectContent>
          </Select>
        </FilterGroup>
      )}

      <FilterGroup title={t("lists.search")}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t("lists.searchPlaceholder.bokt")} className="pl-8 h-9" />
        </div>
      </FilterGroup>

      <FilterGroup title={t("lists.amountWithUnit", { value: amount.toLocaleString(localeTag) })}>
        <Slider value={[amount]} min={50} max={80000} step={50} onValueChange={(v) => setAmount(v[0])} />
      </FilterGroup>

      <FilterGroup title={t("lists.maxRate", { value: maxRate })}>
        <Slider value={[maxRate]} min={10} max={40} step={0.5} onValueChange={(v) => setMaxRate(v[0])} />
      </FilterGroup>

      <FilterGroup title={t("lists.bokts")}>
        <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
          {bokts.map((b) => (
            <label key={b.id} className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary">
              <Checkbox checked={selected.includes(b.id)} onCheckedChange={() => toggle(b.id)} />
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
        <SelectItem value="rate-asc">{t("lists.sort.rateAsc")}</SelectItem>
        <SelectItem value="rate-desc">{t("lists.sort.rateDesc")}</SelectItem>
        <SelectItem value="amount-desc">{t("lists.sort.amountDesc")}</SelectItem>
      </SelectContent>
    </Select>
  );

  return (
    <ListPageShell title={title} description={description} breadcrumbs={breadcrumbs} filters={filters} toolbar={toolbar} resultsCount={filtered.length}>
      {filtered.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl p-10 text-center">
          <p className="text-sm text-muted-foreground">{t("lists.noLoans")}</p>
          <Button variant="outline" size="sm" onClick={reset} className="mt-4">{t("common.resetFilters")}</Button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map((p) => <BoktProductCard key={p.id} product={p} />)}
        </div>
      )}
    </ListPageShell>
  );
};
