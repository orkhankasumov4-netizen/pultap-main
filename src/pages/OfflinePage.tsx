import { WifiOff, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCbarRates } from "@/hooks/use-cbar-rates";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

export const OfflinePage = () => {
  const { data: rates } = useCbarRates();
  const { t } = useTranslation();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
      <Helmet>
        <title>{t("offline.title")}</title>
      </Helmet>

      <div className="w-20 h-20 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mb-6">
        <WifiOff className="w-10 h-10" />
      </div>
      
      <h1 className="text-3xl font-bold font-display tracking-tight mb-2">{t("offline.heading")}</h1>
      <p className="text-muted-foreground max-w-md mb-8">
        {t("offline.description")}
      </p>

      <Button 
        onClick={() => window.location.reload()} 
        className="gap-2 mb-12"
        size="lg"
      >
        <RefreshCcw className="w-4 h-4" />
        {t("offline.retryBtn")}
      </Button>

      {rates && rates.length > 0 && (
        <div className="w-full max-w-lg bg-card border border-border rounded-xl p-6 shadow-sm text-left">
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
            {t("offline.lastRates")}
            <span className="text-xs font-normal px-2 py-0.5 bg-muted text-muted-foreground rounded-full">{t("offline.offlineData")}</span>
          </h2>
          <div className="grid gap-3">
            {rates.slice(0, 4).map((r) => (
              <div key={r.code} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{r.flag}</span>
                  <span className="font-medium">{r.code}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground text-xs block">{t("offline.buy")}</span>
                    <span className="font-medium">{r.buy}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs block">{t("offline.sell")}</span>
                    <span className="font-medium">{r.sell}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
