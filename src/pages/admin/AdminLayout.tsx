/* eslint-disable i18next/no-literal-string */
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CreditCard,
  Landmark,
  Banknote,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronRight,
  Search,
  Moon,
  Sun,
  Shield,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";
import { useTheme } from "next-themes";
import { useLeads } from "@/hooks/use-finance-api";

export const AdminLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const { theme, setTheme } = useTheme();
  const { data: leads = [] } = useLeads();
  const pendingLeadCount = leads.filter(l => l.status === "pending").length;

  const navItems = [
    { name: "İdarə Paneli", path: "/admin", icon: LayoutDashboard, badge: null },
    { name: "Kreditlər", path: "/admin/loans", icon: Banknote, badge: null },
    { name: "Müraciətlər", path: "/admin/leads", icon: CreditCard, badge: pendingLeadCount > 0 ? pendingLeadCount.toString() : null },
    { name: "Banklar və BOKT", path: "/admin/institutions", icon: Landmark, badge: null },
    { name: "Tənzimləmələr", path: "/admin/settings", icon: Settings, badge: null },
  ];

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const currentPage = navItems.find((i) => i.path === location.pathname);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="flex h-screen bg-[hsl(220,15%,97%)] dark:bg-[hsl(220,15%,7%)] overflow-hidden">
      {/* ─── Sidebar (Desktop) ─── */}
      <aside
        className={`hidden md:flex flex-col shrink-0 transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-[72px]" : "w-[260px]"
        } bg-[hsl(220,20%,11%)] dark:bg-[hsl(220,20%,6%)] text-white relative`}
      >
        {/* Sidebar Gradient Accent */}
        <div className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-emerald-400 via-emerald-500 to-teal-600" />

        {/* Logo */}
        <div className={`h-16 flex items-center border-b border-white/[0.06] ${isCollapsed ? "justify-center px-2" : "px-5"}`}>
          <Link to="/admin" className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
              <Shield className="h-4 w-4 text-white" />
            </div>
            {!isCollapsed && (
              <span className="text-[15px] font-bold tracking-tight truncate">
                Pultap<span className="text-emerald-400">.admin</span>
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {!isCollapsed && (
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30 mb-3 px-2">
              Əsas menyu
            </p>
          )}
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                title={isCollapsed ? item.name : undefined}
                className={`group flex items-center gap-3 rounded-lg text-[13px] font-medium transition-all duration-200 relative ${
                  isCollapsed ? "justify-center px-2 py-2.5" : "px-3 py-2.5"
                } ${
                  isActive
                    ? "bg-white/[0.10] text-white shadow-sm"
                    : "text-white/50 hover:text-white/90 hover:bg-white/[0.05]"
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-emerald-400 rounded-r-full" />
                )}
                <Icon className={`h-[18px] w-[18px] shrink-0 transition-colors ${isActive ? "text-emerald-400" : "text-white/40 group-hover:text-white/70"}`} />
                {!isCollapsed && (
                  <>
                    <span className="truncate">{item.name}</span>
                    {item.badge && (
                      <span className="ml-auto text-[10px] font-bold bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        <div className={`border-t border-white/[0.06] p-3 space-y-2`}>
          {/* Collapse Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center gap-2 text-white/30 hover:text-white/60 text-[12px] py-1.5 rounded-md hover:bg-white/[0.04] transition-colors"
          >
            <ChevronRight className={`h-3.5 w-3.5 transition-transform ${isCollapsed ? "" : "rotate-180"}`} />
            {!isCollapsed && <span>Daralt</span>}
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 text-red-400/70 hover:text-red-400 hover:bg-red-500/10 rounded-lg text-[13px] font-medium transition-all py-2.5 ${
              isCollapsed ? "justify-center px-2" : "px-3"
            }`}
          >
            <LogOut className="h-[18px] w-[18px] shrink-0" />
            {!isCollapsed && <span>Çıxış et</span>}
          </button>
        </div>
      </aside>

      {/* ─── Main Content Area ─── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white dark:bg-[hsl(220,15%,10%)] border-b border-border/50 flex items-center justify-between px-4 md:px-6 shrink-0 z-20">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Trigger */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9 text-muted-foreground"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* Breadcrumb */}
            <nav className="hidden sm:flex items-center gap-1.5 text-sm">
              <Link to="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
                Admin
              </Link>
              {currentPage && currentPage.path !== "/admin" && (
                <>
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
                  <span className="font-medium text-foreground">{currentPage.name}</span>
                </>
              )}
              {(!currentPage || currentPage.path === "/admin") && (
                <>
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
                  <span className="font-medium text-foreground">İdarə Paneli</span>
                </>
              )}
            </nav>

            {/* Mobile Title */}
            <h1 className="sm:hidden text-base font-semibold">
              {currentPage?.name || "İdarə Paneli"}
            </h1>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Search */}
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
              <Search className="h-[18px] w-[18px]" />
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-muted-foreground hover:text-foreground"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative h-9 w-9 text-muted-foreground hover:text-foreground">
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-[hsl(220,15%,10%)]" />
            </Button>

            {/* Separator */}
            <div className="w-px h-8 bg-border/60 mx-1 hidden sm:block" />

            {/* User Avatar */}
            <div className="flex items-center gap-2.5 pl-1">
              <div className="hidden sm:block text-right">
                <div className="text-[13px] font-semibold leading-none">Admin</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">admin@pultap.az</div>
              </div>
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-sm font-bold shadow-md shadow-emerald-500/20">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6 lg:p-8">
            <div className="max-w-[1400px] mx-auto">
              <Outlet />
            </div>
          </div>
        </main>
      </div>

      {/* ─── Mobile Sidebar Drawer ─── */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden animate-fade-in"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          {/* Drawer */}
          <div className="fixed inset-y-0 left-0 z-50 w-[280px] bg-[hsl(220,20%,11%)] text-white md:hidden animate-slide-in-right flex flex-col"
               style={{ animationDirection: 'normal', transform: 'translateX(0)' }}
          >
            {/* Gradient Accent */}
            <div className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-emerald-400 via-emerald-500 to-teal-600" />

            {/* Header */}
            <div className="h-16 flex items-center justify-between px-5 border-b border-white/[0.06]">
              <Link to="/admin" className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <span className="text-[15px] font-bold tracking-tight">
                  Pultap<span className="text-emerald-400">.admin</span>
                </span>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white/40 hover:text-white/80 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile Nav */}
            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30 mb-3 px-2">
                Əsas menyu
              </p>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200 relative ${
                      isActive
                        ? "bg-white/[0.10] text-white"
                        : "text-white/50 hover:text-white/90 hover:bg-white/[0.05]"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-emerald-400 rounded-r-full" />
                    )}
                    <Icon className={`h-[18px] w-[18px] shrink-0 ${isActive ? "text-emerald-400" : "text-white/40"}`} />
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="ml-auto text-[10px] font-bold bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Footer */}
            <div className="border-t border-white/[0.06] p-3">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-red-400/70 hover:text-red-400 hover:bg-red-500/10 rounded-lg text-[13px] font-medium transition-all"
              >
                <LogOut className="h-[18px] w-[18px]" />
                <span>Çıxış et</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
