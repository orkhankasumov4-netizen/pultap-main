// ─────────────────────────────────────────────────────────
//  finance.ts — TYPE DEFINITIONS & FALLBACK DATA
//
//  All runtime data is now fetched via React Query hooks in
//  @/hooks/use-finance-api.ts  The static arrays that used
//  to live here have been removed.  This file is kept as the
//  single source of truth for TypeScript interfaces and for
//  the currency fallback used by use-cbar-rates.
// ─────────────────────────────────────────────────────────

// ── Type definitions ────────────────────────────────────

export type Bank = {
  id: string;
  name: string;
  logoColor: string;
  rating: number;
  reviews: number;
};

export type Credit = {
  id: string;
  name: string;
  bankId: string;
  type: "online" | "nağd" | "ipoteka" | "avto";
  rate: number; // annual %
  amountMin: number;
  amountMax: number;
  termMin: number; // months
  termMax: number;
  collateral: boolean;
  insurance: boolean;
  highlight?: string;
};

export type Deposit = {
  id: string;
  name: string;
  bankId: string;
  rate: number;
  currency: "AZN" | "USD" | "EUR";
  termMonths: number;
  minAmount: number;
};

export type Card = {
  id: string;
  name: string;
  bankId: string;
  kind: "debet" | "kredit";
  cashback: number;
  annualFee: number;
  limit?: number;
  perks: string[];
};

export type Currency = {
  code: string;
  flag: string;
  buy: number;
  sell: number;
  change: number;
};

export type Bokt = {
  id: string;
  name: string;
  logoColor: string;
  rating: number;
  reviews: number;
};

export type BoktProduct = {
  id: string;
  name: string;
  boktId: string;
  type: "nağd" | "lombard" | "pts";
  rate: number;
  amountMin: number;
  amountMax: number;
  termMin: number;
  termMax: number;
  collateral: boolean;
  highlight?: string;
};

export type Institution = {
  id: string;
  name: string;
  officialName?: string;
  logoColor: string;
  type: "bank" | "bokt";
  established: number;
  branches: number;
  atms?: number;
  website: string;
  phone: string;
  rating: number;
  reviews: number;
  description: string;
  swift?: string;
  voen?: string;
  correspondentAccount?: string;
  address?: string;
  logoUrl?: string;
};

// ── Fallback data (used when CBAR API is unavailable) ───

export const currencies: Currency[] = [
  { code: "USD", flag: "🇺🇸", buy: 1.6985, sell: 1.7010, change: 0.02 },
  { code: "EUR", flag: "🇪🇺", buy: 1.8450, sell: 1.8520, change: -0.15 },
  { code: "RUB", flag: "🇷🇺", buy: 0.0185, sell: 0.0192, change: 0.32 },
  { code: "TRY", flag: "🇹🇷", buy: 0.0490, sell: 0.0510, change: -0.45 },
  { code: "GBP", flag: "🇬🇧", buy: 2.1530, sell: 2.1620, change: 0.08 },
  { code: "GEL", flag: "🇬🇪", buy: 0.6280, sell: 0.6340, change: 0.05 },
];
