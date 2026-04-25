import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Search, Menu, ChevronDown, Wallet, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { navSections } from "./navConfig";
import { MobileSidebar } from "./MobileSidebar";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { useLocalePath } from "@/i18n/locale-routing";
import { useAuthStore } from "@/store/auth-store";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const loc = useLocation();
  const { t } = useTranslation();
  const lp = useLocalePath();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { setOpenIdx(null); setMobileOpen(false); }, [loc.pathname]);

  return (
    <header className={`sticky top-0 z-50 bg-background ${scrolled ? "shadow-card" : "border-b border-border"}`}>
      {/* Top utility bar */}
      <div className="hidden md:block bg-secondary text-secondary-foreground/80 text-xs">
        <div className="container flex h-9 items-center justify-between">
          <div className="flex items-center gap-5">
            <a href="tel:+994000000000" className="flex items-center gap-1.5 hover:text-white transition">
              <Phone className="h-3 w-3" /> {t("topbar.phone")}
            </a>
            <span className="opacity-60">{t("topbar.stats")}</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to={lp("/valyuta-kurslar")} className="hover:text-white transition">
              {t("topbar.rates")}
            </Link>
            <LanguageSwitcher variant="topbar" />
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to={lp("/")} className="flex items-center gap-2.5 group shrink-0">
          <img loading="eager" 
            src="/logo.webp" 
            alt="Pultap Logo" 
            className="h-9 w-auto object-contain group-hover:scale-105 transition-transform" 
          />
          {/* eslint-disable-next-line i18next/no-literal-string */}
          <span className="text-2xl font-bold font-display tracking-tight text-foreground">
            Pultap
            {/* eslint-disable-next-line i18next/no-literal-string */}
            <span className="text-primary">.az</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center" onMouseLeave={() => setOpenIdx(null)}>
          {navSections.map((sec, i) => {
            const hasMenu = !!sec.children?.length;
            // If it has a menu, treat the parent as a button, not a link.
            const sectionTo = sec.to && !hasMenu ? lp(sec.to) : undefined;
            const active = sec.to ? loc.pathname === lp(sec.to) || loc.pathname.startsWith(`${lp(sec.to)}/`) : false;
            
            return (
              <div 
                key={sec.labelKey} 
                className="relative" 
                onMouseEnter={() => setOpenIdx(hasMenu ? i : null)}
                onClick={() => { if(hasMenu) setOpenIdx(openIdx === i ? null : i) }}
              >
                {sectionTo ? (
                  <NavLink
                    to={sectionTo}
                    className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      active ? "text-primary" : "text-foreground/80 hover:text-primary"
                    }`}
                  >
                    {t(sec.labelKey)}
                  </NavLink>
                ) : (
                  <button 
                    className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      active ? "text-primary" : "text-foreground/80 hover:text-primary"
                    }`}
                  >
                    {t(sec.labelKey)}
                    {hasMenu && <ChevronDown className={`h-3.5 w-3.5 opacity-60 transition-transform ${openIdx === i ? 'rotate-180' : ''}`} />}
                  </button>
                )}

                {hasMenu && openIdx === i && (
                  <div className="absolute left-0 top-full pt-2 z-50 animate-fade-in">
                    <div
                      className="bg-popover text-popover-foreground rounded-lg shadow-elevated border border-border p-3 min-w-[320px] grid gap-3"
                      style={{ gridTemplateColumns: sec.children!.length > 1 ? "1fr 1fr" : "1fr" }}
                    >
                      {sec.children!.map((col, ci) => (
                        <div key={ci}>
                          {col.headingKey && (
                            <div className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                              {t(col.headingKey)}
                            </div>
                          )}
                          <ul className="space-y-0.5">
                            {col.items.map((it) => {
                              const Icon = it.icon;
                              return (
                                <li key={it.to}>
                                  <Link
                                    to={lp(it.to)}
                                    className="flex items-start gap-2.5 px-2 py-2 rounded-md hover:bg-muted transition group/item"
                                  >
                                    {Icon && (
                                      <span className="h-8 w-8 shrink-0 rounded-md bg-primary/10 text-primary flex items-center justify-center group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-colors">
                                        <Icon className="h-4 w-4" />
                                      </span>
                                    )}
                                    <span className="min-w-0">
                                      <span className="block text-sm font-medium leading-tight">{t(it.labelKey)}</span>
                                      {it.descKey && (
                                        <span className="block text-xs text-muted-foreground mt-0.5">{t(it.descKey)}</span>
                                      )}
                                    </span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {/* Auth Menu */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-muted transition-colors outline-none">
                  {user.avatar ? (
                    <img loading="lazy" src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full" />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                      {user.name.charAt(0)}
                    </div>
                  )}
                  <span className="text-sm font-medium hidden sm:block max-w-[100px] truncate">{user.name}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 z-50">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none truncate">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground truncate">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()} className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer">
                  {t("auth.logout")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to={lp("/giris")} className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
              {t("auth.login")}
            </Link>
          )}

          <Button variant="ghost" size="icon" aria-label={t("common.search")} className="flex">
            <Search className="h-4 w-4" />
          </Button>
          <ThemeToggle />
          <button
            className="lg:hidden min-h-[44px] min-w-[44px] flex items-center justify-center -mr-2"
            aria-label={t("common.menu")}
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <MobileSidebar open={mobileOpen} onOpenChange={setMobileOpen} />
    </header>
  );
};
