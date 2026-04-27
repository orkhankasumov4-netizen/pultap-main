/* eslint-disable i18next/no-literal-string */
import {
  Users,
  CreditCard,
  Landmark,
  TrendingUp,
  ArrowUpRight,
  Activity,
  BarChart3,
  Phone,
  MessageSquare,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  ExternalLink,
  RefreshCw,
  Building2,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCredits, useBanks, useBoktProducts, useCards, useLeads, useContacts } from "@/hooks/use-finance-api";
import type { Lead, Contact } from "@/data/finance";
import { useMemo } from "react";

// ── Helpers ────────────────────────────────────────────────────

function timeAgo(isoDate: string): string {
  const now = Date.now();
  const then = new Date(isoDate).getTime();
  const diff = Math.floor((now - then) / 1000);
  if (diff < 60) return `${diff} san əvvəl`;
  if (diff < 3600) return `${Math.floor(diff / 60)} dəq əvvəl`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} saat əvvəl`;
  return `${Math.floor(diff / 86400)} gün əvvəl`;
}

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleString("az-AZ", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const leadStatusConfig = {
  pending: { label: "Gözləyir", icon: Clock, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-800" },
  contacted: { label: "Əlaqə saxlandı", icon: CheckCircle2, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-800" },
  approved: { label: "Təsdiqləndi", icon: CheckCircle2, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-800" },
  rejected: { label: "Rədd edildi", icon: XCircle, color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-800" },
};

// ── Skeleton ───────────────────────────────────────────────────
const Skeleton = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse bg-muted/60 rounded-md ${className}`} />
);

// ── Component ─────────────────────────────────────────────────
export const DashboardPage = () => {
  const { data: credits = [], isLoading: loadingCredits, refetch: refetchCredits } = useCredits();
  const { data: banks = [], isLoading: loadingBanks } = useBanks();
  const { data: boktProducts = [], isLoading: loadingBokts } = useBoktProducts();
  const { data: cards = [], isLoading: loadingCards } = useCards();
  const { data: leads = [], isLoading: loadingLeads, refetch: refetchLeads } = useLeads();
  const { data: contacts = [], isLoading: loadingContacts } = useContacts();

  const isLoading = loadingCredits || loadingBanks || loadingBokts || loadingCards;

  // ── Stats ──────────────────────────────────────────────────
  const stats = [
    {
      label: "Aktiv Kreditlər",
      value: credits.length,
      sub: `${credits.filter(c => c.type === "online").length} onlayn`,
      icon: CreditCard,
      gradient: "from-blue-500 to-blue-600",
      lightBg: "bg-blue-50 dark:bg-blue-500/10",
      iconColor: "#3b82f6",
    },
    {
      label: "Qeydiyyatlı Banklar",
      value: banks.length,
      sub: "Aktiv idarəetmədə",
      icon: Landmark,
      gradient: "from-emerald-500 to-emerald-600",
      lightBg: "bg-emerald-50 dark:bg-emerald-500/10",
      iconColor: "#10b981",
    },
    {
      label: "BOKT Məhsulları",
      value: boktProducts.length,
      sub: "Müxtəlif kateqoriyalar",
      icon: Building2,
      gradient: "from-amber-500 to-orange-500",
      lightBg: "bg-amber-50 dark:bg-amber-500/10",
      iconColor: "#f59e0b",
    },
    {
      label: "Bank Kartları",
      value: cards.length,
      sub: "Debet + kredit",
      icon: Layers,
      gradient: "from-violet-500 to-purple-600",
      lightBg: "bg-violet-50 dark:bg-violet-500/10",
      iconColor: "#8b5cf6",
    },
  ];

  // ── Credit type breakdown ──────────────────────────────────
  const creditBreakdown = useMemo(() => {
    const types: Record<string, { label: string; color: string; bg: string }> = {
      online:   { label: "Onlayn",   color: "#3b82f6",  bg: "bg-blue-500" },
      "nağd":   { label: "Nağd",     color: "#10b981",  bg: "bg-emerald-500" },
      ipoteka:  { label: "İpoteka",  color: "#8b5cf6",  bg: "bg-violet-500" },
      avto:     { label: "Avto",     color: "#f59e0b",  bg: "bg-amber-500" },
    };
    const counts: Record<string, number> = {};
    credits.forEach(c => { counts[c.type] = (counts[c.type] || 0) + 1; });
    return Object.entries(counts).map(([type, count]) => ({
      type,
      count,
      pct: credits.length ? Math.round((count / credits.length) * 100) : 0,
      ...types[type] || { label: type, color: "#94a3b8", bg: "bg-slate-400" },
    })).sort((a, b) => b.count - a.count);
  }, [credits]);

  // ── Leads stats ───────────────────────────────────────────
  const leadStats = useMemo(() => {
    const pending = leads.filter(l => l.status === "pending").length;
    const approved = leads.filter(l => l.status === "approved").length;
    const contacted = leads.filter(l => l.status === "contacted").length;
    return { total: leads.length, pending, approved, contacted };
  }, [leads]);

  // ── Activity feed (leads + contacts merged) ───────────────
  type ActivityItem = {
    id: string;
    kind: "lead" | "contact";
    title: string;
    desc: string;
    created_at: string;
    status?: Lead["status"];
  };

  const activityFeed = useMemo((): ActivityItem[] => {
    const leadItems: ActivityItem[] = leads.map(l => ({
      id: `lead-${l.id}`,
      kind: "lead" as const,
      title: l.full_name,
      desc: l.credit_type || "Kredit müraciəti",
      created_at: l.created_at,
      status: l.status,
    }));
    const contactItems: ActivityItem[] = contacts.map(c => ({
      id: `contact-${c.id}`,
      kind: "contact" as const,
      title: c.name,
      desc: c.message?.slice(0, 60) || "Əlaqə müraciəti",
      created_at: c.created_at,
    }));
    return [...leadItems, ...contactItems]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 8);
  }, [leads, contacts]);

  const now = new Date().toLocaleString("az-AZ", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });

  return (
    <div className="space-y-6 animate-fade-up">

      {/* ── Page Header ────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-[28px] font-bold tracking-tight font-display">
            İdarə Paneli
          </h2>
          <p className="text-muted-foreground mt-1 text-sm flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Real vaxt məlumatları • Son güncəlləmə: {now}
          </p>
        </div>
        <Button
          onClick={() => { refetchCredits(); refetchLeads(); }}
          variant="outline"
          className="gap-2 h-10 text-sm"
        >
          <RefreshCw className="h-4 w-4" />
          Yenilə
        </Button>
      </div>

      {/* ── Stats Grid ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="group bg-white dark:bg-[hsl(220,15%,12%)] rounded-xl p-5 border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg hover:shadow-black/[0.03] dark:hover:shadow-black/20 relative overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${s.gradient} opacity-[0.04] rounded-bl-full`} />
              <div className="flex items-start justify-between relative">
                <div className={`p-2.5 rounded-xl ${s.lightBg} transition-transform group-hover:scale-110 duration-300`}>
                  <Icon className="h-5 w-5" style={{ color: s.iconColor }} />
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-muted-foreground transition-colors" />
              </div>
              <div className="mt-4 relative">
                {isLoading ? (
                  <>
                    <Skeleton className="h-8 w-16 mb-2" />
                    <Skeleton className="h-3 w-24" />
                  </>
                ) : (
                  <>
                    <h3 className="text-[32px] font-bold tracking-tight leading-none">{s.value}</h3>
                    <p className="text-[13px] text-muted-foreground mt-1.5">{s.label}</p>
                    <p className="text-[11px] text-muted-foreground/60 mt-0.5">{s.sub}</p>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Leads Summary + Credit Breakdown ──────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Leads summary card */}
        <div className="md:col-span-1 bg-white dark:bg-[hsl(220,15%,12%)] rounded-xl border border-border/50 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-[15px]">Müraciətlər</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Kredit formu vasitəsilə</p>
            </div>
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-500/10">
              <Users className="h-5 w-5 text-blue-500" />
            </div>
          </div>
          {loadingLeads ? (
            <div className="space-y-3">
              {[1,2,3].map(i => <Skeleton key={i} className="h-10 w-full" />)}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <span className="text-[13px] text-muted-foreground">Ümumi</span>
                <span className="text-[22px] font-bold">{leadStats.total}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-amber-50 dark:bg-amber-500/10">
                <span className="text-[13px] text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> Gözləyir
                </span>
                <span className="text-[18px] font-bold text-amber-700 dark:text-amber-300">{leadStats.pending}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-50 dark:bg-emerald-500/10">
                <span className="text-[13px] text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Təsdiqləndi
                </span>
                <span className="text-[18px] font-bold text-emerald-700 dark:text-emerald-300">{leadStats.approved}</span>
              </div>
            </div>
          )}
        </div>

        {/* Credit type breakdown */}
        <div className="md:col-span-2 bg-white dark:bg-[hsl(220,15%,12%)] rounded-xl border border-border/50 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-[15px]">Kredit növləri</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Kateqoriya üzrə bölgü</p>
            </div>
            <div className="p-2 rounded-xl bg-violet-50 dark:bg-violet-500/10">
              <BarChart3 className="h-5 w-5 text-violet-500" />
            </div>
          </div>
          {loadingCredits ? (
            <div className="space-y-3">
              {[1,2,3,4].map(i => <Skeleton key={i} className="h-10 w-full" />)}
            </div>
          ) : (
            <div className="space-y-3">
              {creditBreakdown.map(item => (
                <div key={item.type}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[13px] font-medium">{item.label}</span>
                    <span className="text-[12px] text-muted-foreground tabular-nums">{item.count} / {credits.length} ({item.pct}%)</span>
                  </div>
                  <div className="w-full bg-muted/40 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full ${item.bg} rounded-full transition-all duration-700`}
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
              {creditBreakdown.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">Kredit məlumatı yoxdur</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Activity Feed + Leads Table ────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* Recent leads table */}
        <div className="lg:col-span-3 bg-white dark:bg-[hsl(220,15%,12%)] rounded-xl border border-border/50 overflow-hidden">
          <div className="p-5 border-b border-border/50 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-[15px]">Son müraciətlər</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Kredit formu vasitəsilə gələn sorğular</p>
            </div>
            {leadStats.pending > 0 && (
              <span className="text-[11px] font-bold bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 px-2 py-0.5 rounded-full">
                {leadStats.pending} yeni
              </span>
            )}
          </div>
          {loadingLeads ? (
            <div className="p-4 space-y-3">
              {[1,2,3,4].map(i => <Skeleton key={i} className="h-16 w-full" />)}
            </div>
          ) : leads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-14 text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-muted/40 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-muted-foreground/40" />
              </div>
              <p className="text-sm text-muted-foreground">Hələ müraciət yoxdur</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/30 text-muted-foreground border-b border-border/30">
                  <tr>
                    <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider">Ad / Kredit növü</th>
                    <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider">Telefon</th>
                    <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-right">Məbləğ</th>
                    <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider">Tarix</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {leads.slice(0, 5).map((lead: Lead) => {
                    const sc = leadStatusConfig[lead.status] || leadStatusConfig.pending;
                    const StatusIcon = sc.icon;
                    return (
                      <tr key={lead.id} className="hover:bg-muted/20 transition-colors group">
                        <td className="px-4 py-3.5">
                          <p className="text-[13px] font-medium">{lead.full_name}</p>
                          <p className="text-[11px] text-muted-foreground truncate max-w-[180px]">
                            {lead.credit_type || "—"}
                          </p>
                        </td>
                        <td className="px-4 py-3.5">
                          <a href={`tel:${lead.phone}`} className="text-[12px] text-muted-foreground hover:text-emerald-600 flex items-center gap-1 transition-colors">
                            <Phone className="h-3 w-3 shrink-0" />
                            {lead.phone}
                          </a>
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          <span className="text-[13px] font-semibold tabular-nums">
                            {lead.amount ? `${lead.amount.toLocaleString("az-AZ")} ₼` : "—"}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold border ${sc.bg} ${sc.color}`}>
                            <StatusIcon className="h-3 w-3" />
                            {sc.label}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="text-[11px] text-muted-foreground whitespace-nowrap">
                            {timeAgo(lead.created_at)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {leads.length > 5 && (
                <div className="px-4 py-3 border-t border-border/30 bg-muted/10">
                  <button className="text-[12px] text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-medium">
                    <ExternalLink className="h-3 w-3" />
                    Bütün {leads.length} müraciətə bax
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Activity timeline */}
        <div className="lg:col-span-2 bg-white dark:bg-[hsl(220,15%,12%)] rounded-xl border border-border/50 overflow-hidden">
          <div className="p-5 border-b border-border/50">
            <h3 className="font-semibold text-[15px]">Son aktivlik</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Müraciətlər və mesajlar</p>
          </div>
          {(loadingLeads || loadingContacts) ? (
            <div className="p-4 space-y-3">
              {[1,2,3,4,5].map(i => <Skeleton key={i} className="h-14 w-full" />)}
            </div>
          ) : activityFeed.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-14 text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-muted/40 flex items-center justify-center">
                <Activity className="h-5 w-5 text-muted-foreground/40" />
              </div>
              <p className="text-sm text-muted-foreground">Hələ aktivlik yoxdur</p>
            </div>
          ) : (
            <div className="divide-y divide-border/50">
              {activityFeed.map(item => {
                const isLead = item.kind === "lead";
                const Icon = isLead ? TrendingUp : MessageSquare;
                const sc = isLead && item.status ? leadStatusConfig[item.status] : null;
                return (
                  <div key={item.id} className="flex items-start gap-3 p-4 hover:bg-muted/30 transition-colors">
                    <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${isLead ? "bg-blue-50 dark:bg-blue-500/10" : "bg-teal-50 dark:bg-teal-500/10"}`}>
                      <Icon className={`h-3.5 w-3.5 ${isLead ? "text-blue-500" : "text-teal-500"}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-[13px] font-medium leading-tight truncate">{item.title}</p>
                        {sc && (
                          <span className={`shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded border ${sc.bg} ${sc.color}`}>
                            {sc.label}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{item.desc}</p>
                      <p className="text-[10px] text-muted-foreground/60 mt-0.5">{formatDate(item.created_at)}</p>
                    </div>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap shrink-0 mt-0.5">
                      {timeAgo(item.created_at)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── System Status ──────────────────────────────────── */}
      <div className="bg-white dark:bg-[hsl(220,15%,12%)] rounded-xl border border-border/50 p-5">
        <h3 className="font-semibold text-[15px] mb-4">Sistem statusu</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[
            {
              label: "API Server",
              status: credits.length > 0 ? "Aktiv" : "Yoxlanılır",
              color: credits.length > 0 ? "bg-emerald-500" : "bg-amber-500",
            },
            {
              label: "Verilənlər bazası",
              status: leads.length > 0 || contacts.length > 0 ? "Aktiv" : "Yoxlanılır",
              color: leads.length > 0 || contacts.length > 0 ? "bg-emerald-500" : "bg-amber-500",
            },
            {
              label: "CBAR Sinxronizasiya",
              status: "Son: avtomatik",
              color: "bg-amber-500",
            },
            {
              label: "Ümumi müraciətlər",
              status: `${leads.length + contacts.length} qeyd`,
              color: "bg-blue-500",
            },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <div className="relative shrink-0">
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
