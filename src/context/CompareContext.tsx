import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type CompareContextType = {
  /** Currently selected credit IDs for comparison (max 4) */
  ids: string[];
  /** Toggle a credit in/out of the compare set */
  toggle: (id: string) => void;
  /** Clear all selections */
  clear: () => void;
  /** Check if a credit is selected */
  has: (id: string) => boolean;
};

const CompareContext = createContext<CompareContextType | null>(null);

export const CompareProvider = ({ children }: { children: ReactNode }) => {
  const [ids, setIds] = useState<string[]>([]);

  const toggle = useCallback((id: string) => {
    setIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 4 ? [...prev, id] : prev
    );
  }, []);

  const clear = useCallback(() => setIds([]), []);
  const has = useCallback((id: string) => ids.includes(id), [ids]);

  return (
    <CompareContext.Provider value={{ ids, toggle, clear, has }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within <CompareProvider>");
  return ctx;
};
