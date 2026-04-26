import { useQuery } from "@tanstack/react-query";
import { currencies as fallbackCurrencies, type Currency } from "@/data/finance";

// In development, Vite proxies /api/cbar → cbar.az (see vite.config.ts)
// In production (Cloudflare), we use the backend as a CORS-safe proxy
const CBAR_URL =
  import.meta.env.DEV
    ? "/api/cbar"
    : `${import.meta.env.VITE_API_URL || "https://pultap.duckdns.org/api/v1"}/cbar`;

/** Build the URL for today's CBAR XML bulletin. */
const todayXmlUrl = (): string => {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${CBAR_URL}/${dd}.${mm}.${yyyy}.xml`;
};

/** Codes we care about + flag emoji mapping. */
const FLAG_MAP: Record<string, string> = {
  USD: "🇺🇸",
  EUR: "🇪🇺",
  RUB: "🇷🇺",
  TRY: "🇹🇷",
  GBP: "🇬🇧",
  GEL: "🇬🇪",
};

const WANTED_CODES = new Set(Object.keys(FLAG_MAP));

/** Parse CBAR XML string → Currency[]. */
const parseCbarXml = (xml: string): Currency[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "text/xml");
  const valutes = doc.querySelectorAll("Valute");
  const results: Currency[] = [];

  valutes.forEach((node) => {
    const code = node.getAttribute("Code") ?? "";
    if (!WANTED_CODES.has(code)) return;

    const nominalStr = node.querySelector("Nominal")?.textContent?.trim() ?? "1";
    const nominal = parseFloat(nominalStr.replace(/[^0-9.]/g, "")) || 1;
    const value = parseFloat(node.querySelector("Value")?.textContent?.trim() ?? "0");

    // CBAR gives rate per `nominal` units → normalise to 1 unit
    const ratePerUnit = value / nominal;

    // Build buy/sell with a realistic CBAR spread (~0.15%)
    const spread = ratePerUnit * 0.0015;
    const buy = parseFloat((ratePerUnit - spread).toFixed(4));
    const sell = parseFloat((ratePerUnit + spread).toFixed(4));

    // Find the previous hardcoded value to compute a meaningful `change`
    const prev = fallbackCurrencies.find((c) => c.code === code);
    const prevAvg = prev ? (prev.buy + prev.sell) / 2 : ratePerUnit;
    const change = prevAvg !== 0 ? parseFloat((((ratePerUnit - prevAvg) / prevAvg) * 100).toFixed(2)) : 0;

    results.push({
      code,
      flag: FLAG_MAP[code] ?? "🏳️",
      buy,
      sell,
      change,
    });
  });

  // Ensure the order matches what the UI expects
  const order = ["USD", "EUR", "RUB", "TRY", "GBP", "GEL"];
  results.sort((a, b) => order.indexOf(a.code) - order.indexOf(b.code));

  return results;
};

/** Fetcher — tries today's date, falls back to yesterday on 404. */
const fetchCbarRates = async (): Promise<Currency[]> => {
  let res = await fetch(todayXmlUrl());

  // On weekends/holidays, today's file may not exist yet → try yesterday
  if (!res.ok) {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    res = await fetch(`${CBAR_URL}/${dd}.${mm}.${yyyy}.xml`);
  }

  if (!res.ok) throw new Error(`CBAR responded with ${res.status}`);

  const xml = await res.text();
  const parsed = parseCbarXml(xml);

  if (parsed.length === 0) throw new Error("No currencies parsed from CBAR XML");

  return parsed;
};

/**
 * Live CBAR currency rates with React Query caching.
 * - Caches for 30 minutes (`staleTime`)
 * - On error, returns hardcoded fallback data
 * - Exposes `isLoading` for skeleton states
 */
export const useCbarRates = () => {
  const query = useQuery<Currency[]>({
    queryKey: ["cbar-rates"],
    queryFn: fetchCbarRates,
    staleTime: 30 * 60 * 1000,       // 30 min
    gcTime: 60 * 60 * 1000,           // 1 hour
    retry: 1,
    retryDelay: 1000,                 // wait 1s before retry
    refetchOnWindowFocus: false,
  });

  return {
    currencies: query.data ?? fallbackCurrencies,
    isLoading: query.isLoading,
    isError: query.isError,
    isLive: query.isSuccess,
    error: query.error,
  };
};
