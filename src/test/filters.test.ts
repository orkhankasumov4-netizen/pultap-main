import { describe, it, expect } from "vitest";
import { filterAndSortCredits, FilterOptions } from "@/lib/filters";
import { Credit } from "@/data/finance";

// Mock data based on the structure of Credit
const mockCredits: Credit[] = [
  {
    id: "1", bankId: "bank1", name: "Nağd Kredit", type: "nağd",
    rate: 14, amountMin: 300, amountMax: 30000, termMin: 3, termMax: 48,
    features: [], reqs: []
  },
  {
    id: "2", bankId: "bank2", name: "Online Kredit", type: "online",
    rate: 12, amountMin: 500, amountMax: 20000, termMin: 6, termMax: 36,
    features: [], reqs: []
  },
  {
    id: "3", bankId: "bank1", name: "Lombard", type: "lombard",
    rate: 22, amountMin: 100, amountMax: 10000, termMin: 1, termMax: 24,
    features: [], reqs: []
  }
];

const defaultOptions: FilterOptions = {
  type: "all",
  search: "",
  amount: 5000,
  term: 12,
  maxRate: 30,
  selectedBanks: [],
  collateral: "any",
  insurance: "any",
  sort: "rate-asc"
};

describe("Credit Filters and Sorting", () => {
  it("filters by maxRate", () => {
    const opts = { ...defaultOptions, maxRate: 13 };
    const result = filterAndSortCredits(mockCredits, opts);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe("2");
  });

  it("filters by amount (minimum/maximum bounds)", () => {
    const opts = { ...defaultOptions, amount: 25000 };
    const result = filterAndSortCredits(mockCredits, opts);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe("1");
  });

  it("filters by term", () => {
    const opts = { ...defaultOptions, term: 40 };
    const result = filterAndSortCredits(mockCredits, opts);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe("1");
  });

  it("sorts by rate ascending", () => {
    const opts = { ...defaultOptions, sort: "rate-asc" as const };
    const result = filterAndSortCredits(mockCredits, opts);
    expect(result[0].rate).toBe(12);
    expect(result[1].rate).toBe(14);
    expect(result[2].rate).toBe(22);
  });

  it("sorts by rate descending", () => {
    const opts = { ...defaultOptions, sort: "rate-desc" as const };
    const result = filterAndSortCredits(mockCredits, opts);
    expect(result[0].rate).toBe(22);
    expect(result[1].rate).toBe(14);
    expect(result[2].rate).toBe(12);
  });

  it("combines filter and sort", () => {
    // Filter out Lombard (rate 22 > 15), then sort remaining (14, 12) by amount desc
    const opts = { ...defaultOptions, maxRate: 15, sort: "amount-desc" as const };
    const result = filterAndSortCredits(mockCredits, opts);
    expect(result.length).toBe(2);
    expect(result[0].id).toBe("1"); // amountMax 30000
    expect(result[1].id).toBe("2"); // amountMax 20000
  });

  it("returns empty list if nothing matches", () => {
    const opts = { ...defaultOptions, amount: 50000 };
    const result = filterAndSortCredits(mockCredits, opts);
    expect(result.length).toBe(0);
  });
});
