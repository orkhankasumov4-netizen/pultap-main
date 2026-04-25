import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCbarRates } from "@/hooks/use-cbar-rates";
import { server } from "../setup";
import { http, HttpResponse } from "msw";

const TestComponent = () => {
  const { currencies: data, isLoading, isError } = useCbarRates();
  
  if (isLoading) return <div data-testid="loading">Loading skeleton...</div>;
  
  // Render data even if there is an error to verify fallback data
  return (
    <div>
      {/* eslint-disable-next-line i18next/no-literal-string */}
      <div data-testid="success">Loaded</div>
      {data?.map(c => (
        <div key={c.code} data-testid={`currency-${c.code}`}>
          {c.code}: {c.buy}
        </div>
      ))}
    </div>
  );
};

const createTestQueryClient = () => new QueryClient({
  defaultOptions: { queries: { retry: false, staleTime: 0 } }
});

describe("CBAR API (useCbarRates)", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = createTestQueryClient();
  });

  const renderComponent = () => render(
    <QueryClientProvider client={queryClient}>
      <TestComponent />
    </QueryClientProvider>
  );

  it("shows loading state initially", () => {
    renderComponent();
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("fetches and displays mocked data correctly on success", async () => {
    renderComponent();
    
    await waitFor(() => {
      expect(screen.getByTestId("success")).toBeInTheDocument();
    });

    // Check if USD and EUR are parsed correctly from MSW mock
    // USD nominal 1, value 1.7000
    // Buy = 1.7000 - spread (0.0015 * 1.7) = ~1.6974
    const usd = screen.getByTestId("currency-USD");
    expect(usd).toHaveTextContent("USD: 1.6974");
    
    const eur = screen.getByTestId("currency-EUR");
    expect(eur).toHaveTextContent("EUR: 1.8472");
  });

  it("falls back to hardcoded data when API errors out", async () => {
    // Override the mock to return a 500 error
    server.use(
      http.get("https://cbar.az/currencies/:date", () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    renderComponent();

    // The hook is designed to NEVER throw an error visually, it catches the error and returns fallbackCurrencies.
    // So we should NOT see the error state, we should see success but with fallback data.
    await waitFor(() => {
      expect(screen.getByTestId("success")).toBeInTheDocument();
    }, { timeout: 4000 });

    // USD fallback is 1.6985 (buy)
    const usd = screen.getByTestId("currency-USD");
    expect(usd).toHaveTextContent("USD: 1.6985");
  });
});
