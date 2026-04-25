import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import { useState } from "react";
import { toast } from "sonner";
import { ChevronRight, Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocalePath } from "@/i18n/locale-routing";

export default function ContactPage() {
  const { t } = useTranslation();
  const lp = useLocalePath();
  
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = fd.get("name") as string;
    const email = fd.get("email") as string;
    const phone = fd.get("phone") as string;
    const message = fd.get("message") as string;

    if (!name || !email || !phone || !message) {
      toast.error(t("contact.form.toast.fillRequired"));
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error(t("contact.form.toast.invalidEmail"));
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`https://skhzckfbqecahidcogyk.supabase.co/functions/v1/submit-contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error("API xətası");
      }

      toast.success(t("contact.form.toast.success"));
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Telegram error:", error);
      toast.error(t("contact.form.toast.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t("contact.metaTitle")}</title>
        <meta name="description" content={t("contact.metaDesc")} />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="container py-10 md:py-14">
          <nav className="flex items-center gap-1.5 text-xs text-primary-foreground/70 mb-4">
            <Link to={lp("/")} className="hover:text-primary-foreground transition-colors">
              {t("common.home")}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="font-medium">{t("contact.title")}</span>
          </nav>
          
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-4">
              {t("contact.hero.title")}
            </h1>
            <p className="text-lg text-primary-foreground/80">
              {t("contact.hero.desc")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-5 gap-10 lg:gap-16">
            
            {/* Contact Info */}
            <div className="md:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">{t("contact.info.title")}</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">{t("contact.info.phone.label")}</p>
                      {/* eslint-disable-next-line i18next/no-literal-string */}
                      <a href="tel:+994551234567" className="text-lg font-semibold hover:text-primary transition-colors">
                        +994 (55) 123 45 67
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">{t("contact.info.email.label")}</p>
                      {/* eslint-disable-next-line i18next/no-literal-string */}
                      <a href="mailto:info@pultap.az" className="text-lg font-semibold hover:text-primary transition-colors">
                        info@pultap.az
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">{t("contact.info.address.label")}</p>
                      <p className="text-lg font-semibold leading-tight">
                        <Trans i18nKey="contact.info.address.value">
                          Caspian Plaza, biznes mərkəzi,<br />
                          Cəfər Cabbarlı küçəsi, 44, Bakı
                        </Trans>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/50 p-6 rounded-2xl border border-border">
                <h3 className="font-semibold mb-2">{t("contact.hours.title")}</h3>
                <p className="text-sm font-medium text-foreground">
                  {t("contact.hours.desc")}
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-3">
              <div className="bg-card border border-border rounded-2xl shadow-card p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-2">{t("contact.form.title")}</h2>
                <p className="text-muted-foreground text-sm mb-6">
                  {t("contact.form.desc")}
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("contact.form.fields.name.label")}</Label>
                    <Input id="name" name="name" autoComplete="name" placeholder={t("contact.form.fields.name.placeholder")} className="bg-muted/50" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("contact.form.fields.email.label")}</Label>
                    <Input id="email" name="email" type="email" autoComplete="email" placeholder={t("contact.form.fields.email.placeholder")} className="bg-muted/50" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("contact.form.fields.phone.label")}</Label>
                    <Input id="phone" name="phone" type="tel" autoComplete="tel" placeholder={t("contact.form.fields.phone.placeholder")} className="bg-muted/50" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">{t("contact.form.fields.message.label")}</Label>
                    <textarea 
                      id="message" 
                      name="message" 
                      autoComplete="off"
                      rows={5}
                      className="w-full flex rounded-md border border-input bg-muted/50 px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder={t("contact.form.fields.message.placeholder")}
                    />
                  </div>
                  
                  <Button type="submit" disabled={loading} className="w-full h-11 bg-gradient-primary rounded-xl text-md font-medium">
                    {loading ? t("contact.form.submitLoading") : (
                      <>{t("contact.form.submit")} <Send className="ml-2 h-4 w-4" /></>
                    )}
                  </Button>
                </form>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
}
