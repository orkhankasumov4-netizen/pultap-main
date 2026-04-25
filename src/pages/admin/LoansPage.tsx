/* eslint-disable i18next/no-literal-string */
import { useState } from "react";
import { Plus, Search, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { credits, bankById } from "@/data/finance";

export const LoansPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLoans = credits.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Kreditlər</h2>
          <p className="text-muted-foreground mt-1">Bütün mövcud kredit məhsullarının idarə edilməsi.</p>
        </div>
        <Button className="bg-primary hover:bg-primary-hover gap-2">
          <Plus className="h-4 w-4" /> Yeni Kredit
        </Button>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Kredit adı ilə axtar..." 
              className="pl-9 bg-background"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-6 py-3 font-semibold">Məhsulun adı</th>
                <th className="px-6 py-3 font-semibold">Bank</th>
                <th className="px-6 py-3 font-semibold">Növü</th>
                <th className="px-6 py-3 font-semibold text-right">Faiz</th>
                <th className="px-6 py-3 font-semibold text-right">Məbləğ (Max)</th>
                <th className="px-6 py-3 font-semibold text-right">Əməliyyat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredLoans.map((loan) => {
                const bank = bankById(loan.bankId);
                return (
                  <tr key={loan.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{loan.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold text-white"
                          style={{ background: bank.logoColor }}
                        >
                          {bank.name.charAt(0)}
                        </div>
                        {bank.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary capitalize">
                        {loan.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-emerald-600 dark:text-emerald-400">
                      {loan.rate}%
                    </td>
                    <td className="px-6 py-4 text-right tabular-nums text-muted-foreground">
                      {loan.amountMax.toLocaleString()} ₼
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredLoans.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    Heç bir məlumat tapılmadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
