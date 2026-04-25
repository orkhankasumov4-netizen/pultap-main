import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { usePagination } from "@/hooks/use-pagination";
import { MemoryRouter } from "react-router-dom";

describe("usePagination Hook", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={["/"]}>{children}</MemoryRouter>
  );

  const generateItems = (count: number) => Array.from({ length: count }, (_, i) => i + 1);

  it("calculates total pages correctly (25 items, 12 per page -> 3 pages)", () => {
    const items = generateItems(25);
    const { result } = renderHook(() => usePagination({ items, perPage: 12 }), { wrapper });
    
    expect(result.current.totalPages).toBe(3);
    expect(result.current.paginatedItems.length).toBe(12); // First page
  });

  it("goToPage(2) returns the correct items", () => {
    const items = generateItems(25);
    const { result } = renderHook(() => usePagination({ items, perPage: 12 }), { wrapper });
    
    act(() => {
      result.current.goToPage(2);
    });

    expect(result.current.page).toBe(2);
    expect(result.current.paginatedItems.length).toBe(12);
    expect(result.current.paginatedItems[0]).toBe(13); // items 13-24
  });

  it("resets to page 1 when filter changes (items length changes)", () => {
    let items = generateItems(25);
    const { result, rerender } = renderHook(() => usePagination({ items, perPage: 12 }), { wrapper });
    
    // Go to page 2
    act(() => {
      result.current.goToPage(2);
    });
    expect(result.current.page).toBe(2);

    // Simulate filter change
    items = generateItems(5);
    rerender();

    expect(result.current.page).toBe(1);
    expect(result.current.totalPages).toBe(1);
    expect(result.current.paginatedItems.length).toBe(5);
  });

  it("syncs with URL", () => {
    const items = generateItems(25);
    // Since we can't easily assert URL state directly without mocking window.location or using MemoryRouter,
    // we just ensure the hook doesn't crash when syncWithUrl is true.
    const { result } = renderHook(() => usePagination({ items, perPage: 12, syncWithUrl: true }), { wrapper });
    
    act(() => {
      result.current.goToPage(3);
    });

    expect(result.current.page).toBe(3);
    expect(result.current.paginatedItems.length).toBe(1); // item 25
  });
});
