import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { toast } from "sonner";
import { ChevronRight, Megaphone, BarChart, Users, Send, Check, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocalePath } from "@/i18n/locale-routing";

export default function AdvertisePage() {
  const { t } = useTranslation();
  const lp = useLocalePath();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = fd.get("name") as string;
    const company = fd.get("company") as string;
    const email = fd.get("email") as string;
    
    if (!name || !company || !email) {
      toast.error(t("advertise.form.toast.fillRequired"));
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error(t("advertise.form.toast.invalidEmail"));
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(t("advertise.form.toast.success"));
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  const formats = [
    {
      title: t("advertise.formats.banner.title"),
      desc: t("advertise.formats.banner.desc"),
      price: t("advertise.formats.banner.price"),
      features: [
        t("advertise.formats.banner.features.0"),
        t("advertise.formats.banner.features.1"),
        t("advertise.formats.banner.features.2"),
      ],
    },
    {
      title: t("advertise.formats.sponsor.title"),
      desc: t("advertise.formats.sponsor.desc"),
      price: t("advertise.formats.sponsor.price"),
      features: [
        t("advertise.formats.sponsor.features.0"),
        t("advertise.formats.sponsor.features.1"),
        t("advertise.formats.sponsor.features.2"),
      ],
    },
    {
      title: t("advertise.formats.blog.title"),
      desc: t("advertise.formats.blog.desc"),
      price: t("advertise.formats.blog.price"),
      features: [
        t("advertise.formats.blog.features.0"),
        t("advertise.formats.blog.features.1"),
        t("advertise.formats.blog.features.2"),
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>{t("advertise.metaTitle")}</title>
        <meta name="description" content={t("advertise.metaDesc")} />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="container py-12 md:py-16">
          <nav className="flex items-center gap-1.5 text-xs text-primary-foreground/70 mb-4">
            <Link to={lp("/")} className="hover:text-primary-foreground transition-colors">
              {t("common.home")}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="font-medium">{t("advertise.title")}</span>
          </nav>
          
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-4 flex items-center gap-3">
              <Megaphone className="h-8 w-8 md:h-12 md:w-12 text-primary" />
              {t("advertise.hero.title")}
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed">
              {t("advertise.hero.desc")}
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 border-b border-border bg-muted/20">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex gap-4 items-start">
              <div className="h-10 w-10 shrink-0 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{t("advertise.benefits.audience.title")}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t("advertise.benefits.audience.desc")}</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="h-10 w-10 shrink-0 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <BarChart className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{t("advertise.benefits.conversion.title")}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t("advertise.benefits.conversion.desc")}</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="h-10 w-10 shrink-0 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{t("advertise.benefits.premium.title")}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t("advertise.benefits.premium.desc")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formats and Contact */}
      <section className="py-16 md:py-24">
        <div className="container max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Formats List */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-3">{t("advertise.formats.title")}</h2>
                <p className="text-muted-foreground">{t("advertise.formats.desc")}</p>
              </div>
              
              <div className="space-y-6">
                {formats.map((fmt, i) => (
                  <div key={i} className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-foreground">{fmt.title}</h3>
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                        {fmt.price}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">{fmt.desc}</p>
                    <ul className="space-y-2">
                      {fmt.features.map((feat, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-success" />
                          <span className="text-foreground/80">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Request Form */}
            <div className="lg:mt-4">
              <div className="bg-secondary/5 border border-border rounded-3xl p-8 relative overflow-hidden">
                {/* Decorative mesh */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                
                <h2 className="text-2xl font-bold mb-2">{t("advertise.form.title")}</h2>
                <p className="text-muted-foreground text-sm mb-6">
                  {t("advertise.form.desc")}
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-5 relative">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t("advertise.form.fields.name.label")}</Label>
                      <Input id="name" name="name" autoComplete="name" placeholder={t("advertise.form.fields.name.placeholder")} className="bg-background" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">{t("advertise.form.fields.company.label")}</Label>
                      <Input id="company" name="company" autoComplete="organization" placeholder={t("advertise.form.fields.company.placeholder")} className="bg-background" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("advertise.form.fields.email.label")}</Label>
                    <Input id="email" name="email" type="email" autoComplete="email" placeholder={t("advertise.form.fields.email.placeholder")} className="bg-background" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("advertise.form.fields.phone.label")}</Label>
                    <Input id="phone" name="phone" type="tel" autoComplete="tel" placeholder={t("advertise.form.fields.phone.placeholder")} className="bg-background" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">{t("advertise.form.fields.message.label")}</Label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={4}
                      className="w-full flex rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      placeholder={t("advertise.form.fields.message.placeholder")}
                    />
                  </div>
                  
                  <Button type="submit" disabled={loading} className="w-full h-11 bg-gradient-primary rounded-xl text-md font-medium mt-2">
                    {loading ? t("advertise.form.submitLoading") : (
                      <>{t("advertise.form.submit")} <Send className="ml-2 h-4 w-4" /></>
                    )}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-3">
                    {t("advertise.form.consent")}
                  </p>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
