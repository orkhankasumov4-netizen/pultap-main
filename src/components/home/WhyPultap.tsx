import { useTranslation } from "react-i18next";
import { ShieldCheck, Zap, Award, BarChart3 } from "lucide-react";

const items = [
  { i: ShieldCheck, k: "free" },
  { i: Zap,         k: "fast" },
  { i: BarChart3,   k: "transparent" },
  { i: Award,       k: "loved" },
] as const;

export const WhyPultap = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-secondary text-secondary-foreground py-14 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-40" />
      <div className="container relative">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">{t("home.why.eyebrow")}</p>
          <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
            {t("home.why.title")}
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map(({ i: Icon, k }) => (
            <div key={k} className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-5 hover:bg-white/10 transition-colors">
              <div className="h-10 w-10 rounded-md bg-gradient-primary flex items-center justify-center mb-4">
                <Icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-base">{t(`home.why.items.${k}.title`)}</h3>
              <p className="text-sm text-secondary-foreground/70 mt-2 leading-relaxed">
                {t(`home.why.items.${k}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
