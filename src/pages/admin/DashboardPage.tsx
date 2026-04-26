/* eslint-disable i18next/no-literal-string */
import {
  Users,
  CreditCard,
  Landmark,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Clock,
  BarChart3,
  DollarSign,
  Eye,
  FileText,
  Zap,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCredits, useBanks, useBoktProducts, useCards, useLeads, useContacts } from "@/hooks/use-finance-api";

export const DashboardPage = () => {
  const { data: credits = [], isLoading: loadingCredits } = useCredits();
  const { data: banks = [], isLoading: loadingBanks } = useBanks();
  const { data: boktProducts = [], isLoading: loadingBokts } = useBoktProducts();
  const { data: cards = [], isLoading: loadingCards } = useCards();
  const { data: leads = [] } = useLeads();
  const { data: contacts = [] } = useContacts();

  const isLoading = loadingCredits || loadingBanks || loadingBokts || loadingCards;

  const stats = [
    {
      label: "Aktiv Kreditlər",
      value: isLoading ? "..." : credits.length.toString(),
      change: "+12%",
      isPositive: true,
      icon: CreditCard,
      gradient: "from-blue-500 to-blue-600",
      lightBg: "bg-blue-50 dark:bg-blue-500/10",
    },
    {
      label: "Qeydiyyatlı Banklar",
      value: isLoading ? "..." : banks.length.toString(),
      change: "0%",
      isPositive: true,
      icon: Landmark,
      gradient: "from-emerald-500 to-emerald-600",
      lightBg: "bg-emerald-50 dark:bg-emerald-500/10",
    },
    {
      label: "BOKT Məhsulları",
      value: isLoading ? "..." : boktProducts.length.toString(),
      change: "+3%",
      isPositive: true,
      icon: Users,
      gradient: "from-amber-500 to-orange-500",
      lightBg: "bg-amber-50 dark:bg-amber-500/10",
    },
    {
      label: "Bank Kartları",
      value: isLoading ? "..." : cards.length.toString(),
      change: "+18%",
      isPositive: true,
      icon: TrendingUp,
      gradient: "from-violet-500 to-purple-600",
      lightBg: "bg-violet-50 dark:bg-violet-500/10",
    },
  ];

  const recentActivities = [
    {
      icon: Zap,
      title: "Yeni kredit əlavə edildi",
      desc: "Birbank Online Kredit — 14.9% illik faiz",
      time: "2 dəq əvvəl",
      color: "text-amber-500",
      bg: "bg-amber-50 dark:bg-amber-500/10",
    },
    {
      icon: FileText,
      title: "Faiz dərəcəsi yeniləndi",
      desc: "Kapital Bank Express — 16.5% → 15.9%",
      time: "15 dəq əvvəl",
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-500/10",
    },
    {
      icon: Eye,
      title: "Yeni müraciət",
      desc: "Əlaqə formu vasitəsilə yeni müştəri müraciəti",
      time: "38 dəq əvvəl",
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
    },
    {
      icon: Activity,
      title: "Valyuta məzənnəsi güncəlləndi",
      desc: "CBAR-dan avtomatik güncəlləmə",
      time: "1 saat əvvəl",
      color: "text-violet-500",
      bg: "bg-violet-50 dark:bg-violet-500/10",
    },
    {
      icon: DollarSign,
      title: "Yeni depozit təklifi",
      desc: "PAŞA Bank Premium — 10.2% illik",
      time: "3 saat əvvəl",
      color: "text-teal-500",
      bg: "bg-teal-50 dark:bg-teal-500/10",
    },
  ];

  const quickActions = [
    { label: "Yeni kredit", icon: CreditCard, color: "from-blue-500 to-blue-600" },
    { label: "Bank əlavə et", icon: Landmark, color: "from-emerald-500 to-emerald-600" },
    { label: "Kart əlavə et", icon: CreditCard, color: "from-violet-500 to-purple-600" },
    { label: "Hesabat yüklə", icon: BarChart3, color: "from-amber-500 to-orange-500" },
  ];

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-[28px] font-bold tracking-tight font-display">
            Xoş gəldiniz! 👋
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Sistemin ümumi vəziyyətinə buradan baxa bilərsiniz. Son güncəlləmə: bugün, 14:30
          </p>
        </div>
        <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/20 border-0 gap-2 h-10 px-5">
          <BarChart3 className="h-4 w-4" />
          Hesabatı yüklə
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="group bg-white dark:bg-[hsl(220,15%,12%)] rounded-xl p-5 border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg hover:shadow-black/[0.03] dark:hover:shadow-black/20 relative overflow-hidden"
            >
              {/* Subtle gradient bg */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${s.gradient} opacity-[0.04] rounded-bl-full`} />

              <div className="flex items-start justify-between relative">
                <div className={`p-2.5 rounded-xl ${s.lightBg} transition-transform group-hover:scale-110 duration-300`}>
                  <Icon className={`h-5 w-5 bg-gradient-to-br ${s.gradient} bg-clip-text`}
                    style={{ color: s.gradient.includes("blue") ? "#3b82f6" : s.gradient.includes("emerald") ? "#10b981" : s.gradient.includes("amber") ? "#f59e0b" : "#8b5cf6" }}
                  />
                </div>
                <div className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-full ${
                  s.isPositive
                    ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                    : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                }`}>
                  {s.isPositive ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {s.change}
                </div>
              </div>
              <div className="mt-4 relative">
                <h3 className="text-[28px] font-bold tracking-tight">{s.value}</h3>
                <p className="text-[13px] text-muted-foreground mt-0.5">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {quickActions.map((action, i) => {
          const Icon = action.icon;
          return (
            <button
              key={i}
              className="group flex items-center gap-3 p-3.5 bg-white dark:bg-[hsl(220,15%,12%)] rounded-xl border border-border/50 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all duration-200 hover:shadow-md hover:shadow-emerald-500/5 text-left"
            >
              <div className={`p-2 rounded-lg bg-gradient-to-br ${action.color} shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                <Icon className="h-4 w-4 text-white" />
              </div>
              <span className="text-[13px] font-medium text-foreground">{action.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Chart + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Chart Placeholder */}
        <div className="lg:col-span-3 bg-white dark:bg-[hsl(220,15%,12%)] rounded-xl border border-border/50 overflow-hidden">
          <div className="p-5 border-b border-border/50 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-[15px]">İstifadəçi aktivliyi</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Son 30 gün üzrə ziyarətçi statistikası</p>
            </div>
            <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-0.5 text-[12px]">
              <button className="px-3 py-1 rounded-md bg-white dark:bg-[hsl(220,15%,18%)] shadow-sm font-medium text-foreground">Həftə</button>
              <button className="px-3 py-1 rounded-md text-muted-foreground hover:text-foreground transition-colors">Ay</button>
              <button className="px-3 py-1 rounded-md text-muted-foreground hover:text-foreground transition-colors">İl</button>
            </div>
          </div>
          <div className="p-6 flex flex-col items-center justify-center min-h-[320px] text-center">
            {/* Mini chart bars simulation */}
            <div className="flex items-end gap-2 h-40 mb-6">
              {[35, 55, 40, 70, 60, 85, 45, 90, 65, 75, 50, 95, 55, 80].map((h, i) => (
                <div
                  key={i}
                  className="w-5 rounded-t-md bg-gradient-to-t from-emerald-500 to-emerald-400 dark:from-emerald-600 dark:to-emerald-400 transition-all duration-500 hover:from-emerald-400 hover:to-teal-400 cursor-pointer"
                  style={{
                    height: `${h}%`,
                    opacity: 0.4 + (h / 100) * 0.6,
                    animationDelay: `${i * 50}ms`,
                  }}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              <Clock className="h-3 w-3 inline-block mr-1 -mt-0.5" />
              Qrafik tezliklə real məlumatlarla əlaqələndiriləcək
            </p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white dark:bg-[hsl(220,15%,12%)] rounded-xl border border-border/50 overflow-hidden">
          <div className="p-5 border-b border-border/50 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-[15px]">Son aktivliklər</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Sistem dəyişiklikləri</p>
            </div>
            <button className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-medium">
              Hamısını gör
            </button>
          </div>
          <div className="divide-y divide-border/50">
            {recentActivities.map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={i} className="flex items-start gap-3 p-4 hover:bg-muted/30 transition-colors">
                  <div className={`p-2 rounded-lg ${a.bg} shrink-0 mt-0.5`}>
                    <Icon className={`h-3.5 w-3.5 ${a.color}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-medium leading-tight">{a.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{a.desc}</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap shrink-0 mt-0.5">
                    {a.time}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white dark:bg-[hsl(220,15%,12%)] rounded-xl border border-border/50 p-5">
        <h3 className="font-semibold text-[15px] mb-4">Sistem statusu</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "API Server", status: "Aktiv", color: "bg-emerald-500" },
            { label: "Verilənlər bazası", status: "Aktiv", color: "bg-emerald-500" },
            { label: "CBAR Sinxronizasiya", status: "Son: 14:00", color: "bg-amber-500" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <div className="relative">
                <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                <div className={`absolute inset-0 w-2.5 h-2.5 rounded-full ${item.color} animate-ping opacity-40`} />
              </div>
              <div>
                <p className="text-[13px] font-medium">{item.label}</p>
                <p className="text-[11px] text-muted-foreground">{item.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
