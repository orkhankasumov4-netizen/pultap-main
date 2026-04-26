/* eslint-disable i18next/no-literal-string */
import { useState, useMemo } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Shield,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Eye,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCredits, useBanks, useDeleteCredit } from "@/hooks/use-finance-api";
import type { Credit } from "@/data/finance";

type SortField = "name" | "rate" | "amountMax" | "type";
type SortDir = "asc" | "desc";

const ITEMS_PER_PAGE = 8;

const typeLabels: Record<string, { label: string; color: string; bg: string }> = {
  online: { label: "Onlayn", color: "text-blue-700 dark:text-blue-300", bg: "bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-800" },
  "nağd": { label: "Nağd", color: "text-emerald-700 dark:text-emerald-300", bg: "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-800" },
  ipoteka: { label: "İpoteka", color: "text-violet-700 dark:text-violet-300", bg: "bg-violet-50 dark:bg-violet-500/10 border-violet-200 dark:border-violet-800" },
  avto: { label: "Avto", color: "text-amber-700 dark:text-amber-300", bg: "bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-800" },
};

export const LoansPage = () => {
  const { data: credits = [], isLoading: loadingCredits } = useCredits();
  const { data: banks = [] } = useBanks();
  const deleteCredit = useDeleteCredit();

  const bankById = (id: string) => banks.find(b => b.id === id) || { id, name: id, logoColor: "#666", rating: 0, reviews: 0 };

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
    setPage(1);
  };

  const filteredLoans = useMemo(() => {
    let result = credits.filter((c: Credit) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filterType !== "all") {
      result = result.filter((c: Credit) => c.type === filterType);
    }
    result.sort((a: Credit, b: Credit) => {
      let cmp = 0;
      if (sortField === "name") cmp = a.name.localeCompare(b.name, "az");
      else if (sortField === "rate") cmp = a.rate - b.rate;
      else if (sortField === "amountMax") cmp = a.amountMax - b.amountMax;
      else if (sortField === "type") cmp = a.type.localeCompare(b.type);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return result;
  }, [credits, searchTerm, filterType, sortField, sortDir]);

  const totalPages = Math.ceil(filteredLoans.length / ITEMS_PER_PAGE);
  const paginatedLoans = filteredLoans.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const toggleRow = (id: string) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedRows.size === paginatedLoans.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedLoans.map((l) => l.id)));
    }
  };

  const filterOptions = [
    { value: "all", label: "Hamısı" },
    { value: "online", label: "Onlayn" },
    { value: "nağd", label: "Nağd" },
    { value: "ipoteka", label: "İpoteka" },
    { value: "avto", label: "Avto" },
  ];

  const SortableHeader = ({ field, label, align }: { field: SortField; label: string; align?: string }) => (
    <th
      className={`px-4 py-3 font-semibold text-[11px] uppercase tracking-wider cursor-pointer select-none hover:text-foreground transition-colors ${align || ""}`}
      onClick={() => handleSort(field)}
    >
      <div className={`flex items-center gap-1 ${align === "text-right" ? "justify-end" : ""}`}>
        {label}
        <ArrowUpDown className={`h-3 w-3 transition-opacity ${sortField === field ? "opacity-100" : "opacity-30"}`} />
      </div>
    </th>
  );

  return (
    <div className="space-y-5 animate-fade-up">
      {loadingCredits && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
        </div>
      )}
      {!loadingCredits && <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-[28px] font-bold tracking-tight font-display">
            Kreditlər
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            {filteredLoans.length} kredit məhsulu tapıldı
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 h-10 text-sm border-border/60">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">İxrac et</span>
          </Button>
          <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/20 border-0 gap-2 h-10 px-5">
            <Plus className="h-4 w-4" />
            Yeni Kredit
          </Button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white dark:bg-[hsl(220,15%,12%)] rounded-xl border border-border/50 overflow-hidden shadow-sm">
        {/* Toolbar */}
        <div className="p-4 border-b border-border/50 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Kredit adı ilə axtar..."
              className="pl-9 bg-muted/30 border-border/40 h-9 text-sm focus:bg-background"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <Filter className="h-4 w-4 text-muted-foreground mr-1" />
            {filterOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  setFilterType(opt.value);
                  setPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-200 ${
                  filterType === opt.value
                    ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedRows.size > 0 && (
          <div className="px-4 py-2.5 bg-emerald-50 dark:bg-emerald-500/5 border-b border-emerald-200 dark:border-emerald-800/30 flex items-center gap-3 text-sm animate-fade-in">
            <span className="text-emerald-700 dark:text-emerald-300 font-medium">
              {selectedRows.size} seçildi
            </span>
            <div className="flex items-center gap-1.5 ml-auto">
              <Button variant="ghost" size="sm" className="h-7 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-500/10 gap-1">
                <Trash2 className="h-3 w-3" /> Sil
              </Button>
              <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" onClick={() => setSelectedRows(new Set())}>
                <XCircle className="h-3 w-3" /> Ləğv et
              </Button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/30 text-muted-foreground border-b border-border/30">
              <tr>
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === paginatedLoans.length && paginatedLoans.length > 0}
                    onChange={toggleAll}
                    className="h-3.5 w-3.5 rounded border-border accent-emerald-500 cursor-pointer"
                  />
                </th>
                <SortableHeader field="name" label="Məhsulun adı" />
                <th className="px-4 py-3 font-semibold text-[11px] uppercase tracking-wider">Bank</th>
                <SortableHeader field="type" label="Növü" />
                <SortableHeader field="rate" label="Faiz" align="text-right" />
                <SortableHeader field="amountMax" label="Max Məbləğ" align="text-right" />
                <th className="px-4 py-3 font-semibold text-[11px] uppercase tracking-wider text-center">Girov</th>
                <th className="px-4 py-3 font-semibold text-[11px] uppercase tracking-wider text-right">Əməliyyat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {paginatedLoans.map((loan) => {
                const bank = bankById(loan.bankId);
                const tp = typeLabels[loan.type] || { label: loan.type, color: "text-foreground", bg: "bg-muted" };
                const isSelected = selectedRows.has(loan.id);
                return (
                  <tr
                    key={loan.id}
                    className={`group transition-colors ${
                      isSelected
                        ? "bg-emerald-50/50 dark:bg-emerald-500/5"
                        : "hover:bg-muted/20"
                    }`}
                  >
                    <td className="px-4 py-3.5">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleRow(loan.id)}
                        className="h-3.5 w-3.5 rounded border-border accent-emerald-500 cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground text-[13px]">{loan.name}</span>
                        {loan.highlight && (
                          <span className="text-[10px] font-semibold bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                            {loan.highlight}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold text-white shrink-0 shadow-sm"
                          style={{ background: bank.logoColor }}
                        >
                          {bank.name.charAt(0)}
                        </div>
                        <span className="text-[13px] text-muted-foreground">{bank.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border ${tp.bg} ${tp.color}`}>
                        {tp.label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <span className="text-[13px] font-bold text-foreground tabular-nums">
                        {loan.rate}%
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <span className="text-[13px] tabular-nums text-muted-foreground">
                        {loan.amountMax.toLocaleString("az-AZ")} ₼
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      {loan.collateral ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" />
                      ) : (
                        <XCircle className="h-4 w-4 text-muted-foreground/30 mx-auto" />
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-blue-600">
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      {/* Mobile: always visible */}
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground opacity-100 group-hover:opacity-0 transition-opacity duration-200 absolute right-4">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
              {paginatedLoans.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center">
                        <Search className="h-5 w-5 text-muted-foreground/50" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Heç bir məlumat tapılmadı</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Axtarış və ya filtr parametrlərini dəyişin</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 border-t border-border/30 flex items-center justify-between bg-muted/10">
            <p className="text-[12px] text-muted-foreground hidden sm:block">
              {filteredLoans.length} nəticədən{" "}
              <span className="font-medium text-foreground">
                {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filteredLoans.length)}
              </span>{" "}
              göstərilir
            </p>
            <div className="flex items-center gap-1 ml-auto">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 border-border/40"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`h-8 w-8 rounded-lg text-[12px] font-medium transition-all ${
                    page === p
                      ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {p}
                </button>
              ))}
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 border-border/40"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
      </>}
    </div>
  );
};
