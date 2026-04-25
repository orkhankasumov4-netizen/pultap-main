/* eslint-disable i18next/no-literal-string */
import { Users, CreditCard, Landmark, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DashboardPage = () => {
  const stats = [
    { label: "Aktiv Kreditlər", value: "987", change: "+12%", icon: CreditCard, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
    { label: "Qeydiyyatlı Banklar", value: "22", change: "0%", icon: Landmark, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
    { label: "BOKT Tərəfdaşlar", value: "56", change: "+3%", icon: Users, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/20" },
    { label: "Aylıq İstifadəçi", value: "350K", change: "+18%", icon: TrendingUp, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Xoş gəldiniz, Admin!</h2>
          <p className="text-muted-foreground mt-1">Sistemin ümumi vəziyyətinə buradan baxa bilərsiniz.</p>
        </div>
        <Button className="bg-primary hover:bg-primary-hover">Hesabatı yüklə</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${s.bg}`}>
                  <Icon className={`h-5 w-5 ${s.color}`} />
                </div>
                <div className="text-sm font-medium text-emerald-500 flex items-center bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-full">
                  {s.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground font-medium">{s.label}</p>
                <h3 className="text-3xl font-bold mt-1">{s.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 shadow-sm min-h-[400px] flex flex-col items-center justify-center text-muted-foreground">
          <TrendingUp className="h-10 w-10 mb-4 opacity-20" />
          <p>İstifadəçi aktivliyi qrafiki (Tezliklə)</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Son aktivliklər</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <div className="text-sm">
                  <p className="font-medium">Sistemdə güncəlləmə</p>
                  <p className="text-xs text-muted-foreground">Bot vasitəsilə yeni faizlər çəkildi.</p>
                </div>
                <div className="ml-auto text-xs text-muted-foreground">2s əvvəl</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
