import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { LoanCalculator } from "@/components/site/LoanCalculator";
import { BrowserRouter } from "react-router-dom";

// Mock translations
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, opts?: Record<string, unknown>) => (opts ? `${key} ${JSON.stringify(opts)}` : key),
  }),
}));

vi.mock("@/i18n/locale-routing", () => ({
  useLocalePath: () => (path: string) => path,
}));

describe("LoanCalculator Component", () => {
  const renderComponent = () =>
    render(
      <BrowserRouter>
        <LoanCalculator />
      </BrowserRouter>
    );

  it("renders correctly with default values", () => {
    renderComponent();
    expect(screen.getByText("calc.loan.title")).toBeInTheDocument();
    
    // Default 10000 AZN, 24 months, 15% rate
    const inputs = screen.getAllByRole("spinbutton");
    // amount, term, rate
    expect(inputs[0]).toHaveValue(10000);
    expect(inputs[1]).toHaveValue(24);
    expect(inputs[2]).toHaveValue(15);
  });

  it("updates results when amount input changes", () => {
    renderComponent();
    const inputs = screen.getAllByRole("spinbutton");
    const amountInput = inputs[0];

    fireEvent.change(amountInput, { target: { value: "20000" } });
    
    // Non-breaking spaces might be returned by Intl.NumberFormat
    expect(screen.getByText(/20.*000.*₼/)).toBeInTheDocument();
  });

  it("toggles between Annuity and Differentiated methods", async () => {
    const user = userEvent.setup();
    renderComponent();
    
    // Switch to differentiated
    const diffTab = screen.getByText("calc.loan.method.differentiated");
    await user.click(diffTab);
    
    expect(await screen.findByText(/calc\.loan\.firstLast/i)).toBeInTheDocument();
    
    // Switch back
    const annuityTab = screen.getByText("calc.loan.method.annuity");
    await user.click(annuityTab);
    
    expect(screen.queryByText(/calc\.loan\.firstLast/i)).not.toBeInTheDocument();
  });

  it("prevents entering invalid/negative numbers", () => {
    renderComponent();
    const inputs = screen.getAllByRole("spinbutton");
    const amountInput = inputs[0];

    fireEvent.change(amountInput, { target: { value: "-500" } });
    
    // Component has a minimum limit of 300 for amount
    // Number changes should snap to min (300)
    expect(amountInput).toHaveValue(300);
  });
});
