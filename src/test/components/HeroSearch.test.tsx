import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { HeroSearch } from "@/components/home/HeroSearch";
import { BrowserRouter } from "react-router-dom";

// Mock i18next and locale routing
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: "az" },
  }),
}));

vi.mock("@/i18n/locale-routing", () => ({
  useLocalePath: () => (path: string) => path,
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("HeroSearch Component", () => {
  const renderComponent = () =>
    render(
      <BrowserRouter>
        <HeroSearch />
      </BrowserRouter>
    );

  it("renders correctly", () => {
    renderComponent();
    expect(screen.getByText(/home\.hero\.titleA/)).toBeInTheDocument();
    expect(screen.getByRole("tablist")).toBeInTheDocument();
  });

  it("accepts input value", () => {
    renderComponent();
    const input = screen.getByPlaceholderText("home.hero.placeholders.credit");
    fireEvent.change(input, { target: { value: "5000" } });
    expect(input).toHaveValue(5000); // type="number" returns number or string depending on interaction
  });

  it("adds ?q= param on submit", () => {
    renderComponent();
    const input = screen.getByPlaceholderText("home.hero.placeholders.credit");
    fireEvent.change(input, { target: { value: "10000" } });
    
    const form = input.closest("form");
    fireEvent.submit(form!);
    
    // Default tab is 'credit', so to -> '/kreditler'
    expect(mockNavigate).toHaveBeenCalledWith("/kreditler?q=10000");
  });

  it("navigates to different route when tab changes", () => {
    renderComponent();
    const depositTab = screen.getByText("home.hero.tabs.deposit");
    fireEvent.click(depositTab);
    
    const input = screen.getByPlaceholderText("home.hero.placeholders.deposit");
    fireEvent.change(input, { target: { value: "2000" } });
    
    const form = input.closest("form");
    fireEvent.submit(form!);
    
    expect(mockNavigate).toHaveBeenCalledWith("/depozit?q=2000");
  });
});
