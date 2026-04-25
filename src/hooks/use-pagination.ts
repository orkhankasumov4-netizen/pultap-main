import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

interface UsePaginationOptions<T> {
  items: T[];
  perPage?: number;
  syncWithUrl?: boolean;
}

export function usePagination<T>({
  items,
  perPage = 12,
  syncWithUrl = false,
}: UsePaginationOptions<T>) {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const initialPage = syncWithUrl 
    ? parseInt(searchParams.get("page") || "1", 10) 
    : 1;

  const [page, setPage] = useState(initialPage);

  const totalPages = Math.max(1, Math.ceil(items.length / perPage));

  const prevItemsLength = useRef(items.length);

  // Reset to page 1 if items change (e.g. filter changes)
  useEffect(() => {
    if (prevItemsLength.current !== items.length) {
      setPage(1);
      if (syncWithUrl) {
        setSearchParams((params) => {
          params.delete("page");
          return params;
        }, { replace: true });
      }
      prevItemsLength.current = items.length;
    }
  }, [items.length, syncWithUrl, setSearchParams]);

  const goToPage = (p: number) => {
    const validPage = Math.max(1, Math.min(p, totalPages));
    setPage(validPage);
    
    if (syncWithUrl) {
      setSearchParams((params) => {
        if (validPage === 1) {
          params.delete("page");
        } else {
          params.set("page", validPage.toString());
        }
        return params;
      });
    }
  };

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return items.slice(start, end);
  }, [items, page, perPage]);

  return {
    page,
    totalPages,
    paginatedItems,
    goToPage,
    nextPage: () => goToPage(page + 1),
    prevPage: () => goToPage(page - 1),
  };
}
