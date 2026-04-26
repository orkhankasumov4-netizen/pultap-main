import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Star, Loader2 } from "lucide-react";
import { useBanks } from "@/hooks/use-finance-api";
import { useLocalePath } from "@/i18n/locale-routing";

export const BanksWall = () => {
  const { t } = useTranslation();
  const lp = useLocalePath();
  const { data: banks = [], isLoading } = useBanks();

  return (
    <section className="container py-14 md:py-20">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">{t("home.banksWall.eyebrow")}</p>
        <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight">{t("home.banksWall.title")}</h2>
        <p className="mt-3 text-sm md:text-base text-muted-foreground">
          {t("home.banksWall.subtitle")}
        </p>
      </div>
      {isLoading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {banks.map((b) => (
            <Link
              key={b.id}
              to={lp("/banks")}
              className="flex items-center gap-2.5 sm:gap-3 p-3 bg-card rounded-lg border border-border hover:border-primary/40 hover:shadow-card transition-all"
            >
              <div
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-md flex items-center justify-center text-white text-[10px] sm:text-xs font-bold shrink-0"
                style={{ background: b.logoColor }}
              >
                {b.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-semibold truncate">{b.name}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="h-3 w-3 fill-accent text-accent" /> {b.rating}
                  <span className="opacity-60">· {b.reviews}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      <div className="text-center mt-8">
        <Link to={lp("/banks")} className="text-sm font-medium text-primary hover:underline">
          {t("home.banksWall.viewAll")}
        </Link>
      </div>
    </section>
  );
};
