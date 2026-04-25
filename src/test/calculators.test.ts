import { describe, it, expect } from "vitest";
import { buildSchedule } from "@/components/site/LoanCalculator";
import { calculateDeposit } from "@/components/site/DepositCalculator";

describe("Loan Calculator (buildSchedule)", () => {
  it("calculates Annuity correctly (10000 AZN, 12%, 24 month -> ~470.73 AZN)", () => {
    const schedule = buildSchedule(10000, 24, 12, "annuity");
    expect(schedule.length).toBe(24);
    
    // First payment
    const payment = schedule[0].payment;
    expect(payment).toBeCloseTo(470.73, 2);
    
    // Total should be around 11300
    const total = schedule.reduce((sum, r) => sum + r.payment, 0);
    expect(total).toBeCloseTo(470.73 * 24, 0);
  });

  it("calculates Differentiated correctly", () => {
    const schedule = buildSchedule(10000, 24, 12, "differentiated");
    expect(schedule.length).toBe(24);
    
    // First payment: principal(416.67) + interest(100) = 516.67
    expect(schedule[0].payment).toBeCloseTo(516.67, 2);
    expect(schedule[0].principal).toBeCloseTo(416.67, 2);
    expect(schedule[0].interest).toBeCloseTo(100, 2);
    
    // Last payment should be smaller
    const last = schedule[23];
    expect(last.payment).toBeLessThan(schedule[0].payment);
  });

  it("handles zero rate correctly", () => {
    const schedule = buildSchedule(10000, 24, 0, "annuity");
    expect(schedule[0].payment).toBeCloseTo(10000 / 24, 2);
    expect(schedule[0].interest).toBe(0);
  });

  it("handles maximum values", () => {
    const schedule = buildSchedule(150000, 120, 30, "annuity");
    expect(schedule.length).toBe(120);
    expect(schedule[0].payment).toBeGreaterThan(0);
  });
});

describe("Deposit Calculator (calculateDeposit)", () => {
  it("calculates Simple interest correctly", () => {
    const result = calculateDeposit(5000, 12, 9, "simple");
    expect(result.interest).toBeCloseTo(450, 2); // 5000 * 9% * 1 year
    expect(result.total).toBeCloseTo(5450, 2);
  });

  it("calculates Capitalized (compound) interest correctly", () => {
    const result = calculateDeposit(5000, 12, 9, "capitalized");
    expect(result.total).toBeGreaterThan(5450); // Compound should be > simple
  });

  it("handles edge cases: zero rate or zero amount", () => {
    const r1 = calculateDeposit(0, 12, 9, "simple");
    expect(r1.total).toBe(0);
    
    const r2 = calculateDeposit(5000, 12, 0, "capitalized");
    expect(r2.total).toBe(5000);
    expect(r2.interest).toBe(0);
  });
});
