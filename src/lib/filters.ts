import { Credit } from "@/data/finance";

export type SortOrder = "rate-asc" | "rate-desc" | "amount-desc" | "term-desc";

export interface FilterOptions {
  type: Credit["type"] | "all";
  search: string;
  amount: number;
  term: number;
  maxRate: number;
  selectedBanks: string[];
  collateral: "any" | "yes" | "no";
  insurance: "any" | "yes" | "no";
  sort: SortOrder;
}

export const filterAndSortCredits = (credits: Credit[], options: FilterOptions): Credit[] => {
  const { type, search, amount, term, maxRate, selectedBanks, collateral, insurance, sort } = options;
  
  let list = credits.filter((c) => {
    if (type !== "all" && c.type !== type) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (amount < c.amountMin || amount > c.amountMax) return false;
    if (term < c.termMin || term > c.termMax) return false;
    if (c.rate > maxRate) return false;
    if (selectedBanks.length && !selectedBanks.includes(c.bankId)) return false;
    if (collateral === "yes" && !c.collateral) return false;
    if (collateral === "no" && c.collateral) return false;
    if (insurance === "yes" && !c.insurance) return false;
    if (insurance === "no" && c.insurance) return false;
    return true;
  });
  
  list = [...list].sort((a, b) => {
    if (sort === "rate-asc") return a.rate - b.rate;
    if (sort === "rate-desc") return b.rate - a.rate;
    if (sort === "amount-desc") return b.amountMax - a.amountMax;
    return b.termMax - a.termMax;
  });
  
  return list;
};
