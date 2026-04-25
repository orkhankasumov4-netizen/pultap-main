import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import { ChevronRight, Users, Target, Shield, CheckCircle } from "lucide-react";
import { useLocalePath } from "@/i18n/locale-routing";

export default function AboutPage() {
  const { t } = useTranslation();
  const lp = useLocalePath();

  const stats = [
    { value: t("about.stats.partners.value"), label: t("about.stats.partners.label") },
    { value: t("about.stats.users.value"), label: t("about.stats.users.label") },
    { value: t("about.stats.comparisons.value"), label: t("about.stats.comparisons.label") },
    { value: t("about.stats.secure.value"), label: t("about.stats.secure.label") },
  ];

  const features = [
    {
      icon: <Target className="h-6 w-6 text-primary" />,
      title: t("about.features.mission.title"),
      description: t("about.features.mission.description"),
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: t("about.features.values.title"),
      description: t("about.features.values.description"),
    },
  ];

  const team = [
    { name: t("about.team.members.orxan.name"), role: t("about.team.members.orxan.role"), img: "https://i.pravatar.cc/150?u=orxan" },
    { name: t("about.team.members.aysel.name"), role: t("about.team.members.aysel.role"), img: "https://i.pravatar.cc/150?u=aysel" },
    { name: t("about.team.members.elvin.name"), role: t("about.team.members.elvin.role"), img: "https://i.pravatar.cc/150?u=elvin" },
    { name: t("about.team.members.nezrin.name"), role: t("about.team.members.nezrin.role"), img: "https://i.pravatar.cc/150?u=nezrin" },
  ];

  return (
    <>
      <Helmet>
        <title>{t("about.metaTitle")}</title>
        <meta name="description" content={t("about.metaDesc")} />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="container py-12 md:py-16">
          <nav className="flex items-center gap-1.5 text-xs text-primary-foreground/70 mb-4">
            <Link to={lp("/")} className="hover:text-primary-foreground transition-colors">
              {t("common.home")}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="font-medium">{t("about.title")}</span>
          </nav>
          
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-4">
              {t("about.hero.title")}
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed">
              {t("about.hero.desc")}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b border-border bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-bold text-foreground mb-2">{s.value}</span>
                <span className="text-sm text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Description Section */}
      <section className="py-12 md:py-16">
        <div className="container max-w-4xl">
          <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
            <p className="text-lg text-foreground font-medium mb-6">
              {t("about.description.intro")}
            </p>
            
            <p>
              {t("about.description.servicesIntro")}
            </p>
            <ul className="space-y-2 mt-4 mb-6 list-disc pl-5">
              <li>
                <Trans i18nKey="about.description.servicesList.cash">
                  <strong>Nağd kreditlər</strong> – müxtəlif bankların təqdim etdiyi faiz dərəcələri və şərtlər,
                </Trans>
              </li>
              <li>
                <Trans i18nKey="about.description.servicesList.mortgage">
                  <strong>İpoteka kreditləri</strong> – dövlət və daxili ipoteka proqramları,
                </Trans>
              </li>
              <li>
                <Trans i18nKey="about.description.servicesList.nbfc">
                  <strong>BOKT kreditləri</strong> – bank olmayan kredit təşkilatlarının təklif etdiyi imkanlar,
                </Trans>
              </li>
              <li>
                <Trans i18nKey="about.description.servicesList.cards">
                  <strong>Bank kartları</strong> – debet və kredit kartları üzrə təkliflər,
                </Trans>
              </li>
              <li>
                <Trans i18nKey="about.description.servicesList.deposits">
                  <strong>Depozitlər</strong> – manat və valyuta üzrə sərfəli əmanət şərtləri,
                </Trans>
              </li>
              <li>
                <Trans i18nKey="about.description.servicesList.exchange">
                  <strong>Valyuta kursları</strong> – daim yenilənən bank məzənnələrini öyrənmək və valyuta konvertoru ilə hesablamalar aparmaq imkanı.
                </Trans>
              </li>
            </ul>

            <p className="mb-4">
              {t("about.description.applyOnline")}
            </p>
            
            <p className="mb-4">
              {t("about.description.calculators")}
            </p>
            
            <p>
              {t("about.description.blog")}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 md:py-24">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {features.map((f, i) => (
                <div key={i} className="flex gap-4">
                  <div className="shrink-0 h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{f.description}</p>
                  </div>
                </div>
              ))}
              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-2 text-foreground font-medium">
                  <CheckCircle className="h-5 w-5 text-success" />
                  {t("about.features.benefits.objective")}
                </div>
                <div className="flex items-center gap-2 text-foreground font-medium">
                  <CheckCircle className="h-5 w-5 text-success" />
                  {t("about.features.benefits.updated")}
                </div>
                <div className="flex items-center gap-2 text-foreground font-medium">
                  <CheckCircle className="h-5 w-5 text-success" />
                  {t("about.features.benefits.userFriendly")}
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl blur-3xl -z-10" />
              <img loading="lazy" 
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=1000" 
                alt="Office team" 
                className="rounded-3xl shadow-lg border border-border/50 object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-muted/20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Users className="h-4 w-4" /> {t("about.team.badge")}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("about.team.title")}</h2>
            <p className="text-muted-foreground">
              {t("about.team.desc")}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 text-center shadow-card hover:shadow-md transition-shadow">
                <img loading="lazy" 
                  src={member.img} 
                  alt={member.name} 
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-background shadow-sm"
                />
                <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                <p className="text-sm text-primary">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
