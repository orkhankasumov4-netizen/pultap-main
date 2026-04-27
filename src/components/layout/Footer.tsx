import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Wallet, Facebook, Instagram, Linkedin, Send, Clock, Mail, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLocalePath } from "@/i18n/locale-routing";
import { toast } from "sonner";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Footer = () => {
  const { t } = useTranslation();
  const lp = useLocalePath();
  const [email, setEmail] = useState("");

  const productLinks = [
    { to: "/kreditler", labelKey: "footer.links.bankCredits" },
    { to: "/bokt-kredit", labelKey: "footer.links.boktCredits" },
    { to: "/depozit", labelKey: "footer.links.deposits" },
    { to: "/bank-kartlari/kredit-kartlari", labelKey: "footer.links.cards" },
    { to: "/ipoteka", labelKey: "footer.links.mortgage" },
  ];
  const toolLinks = [
    { to: "/kredit-kalkulyatoru", labelKey: "footer.links.creditCalc" },
    { to: "/depozit-kalkulyatoru", labelKey: "footer.links.depositCalc" },
    { to: "/konvertor", labelKey: "footer.links.converter" },
    { to: "/valyuta-kurslar", labelKey: "footer.links.rates" },
    { to: "/kredit-tarixcesi", labelKey: "footer.links.creditHistory" },
  ];
  const companyLinks = [
    { to: "/banks", labelKey: "footer.links.banks" },
    { to: "/bokt", labelKey: "footer.links.bokt" },
    { to: "/bloq", labelKey: "footer.links.blog" },
    { to: "/haqqimizda", labelKey: "footer.links.about" },
    { to: "/elaqe", labelKey: "footer.links.contact" },
    { to: "/reklam", labelKey: "footer.links.ads" },
    { to: "https://wa.me/994559846200?text=Salam,%20sizin%20saytda%20reklam%20yerl%C9%99%C5%9Fdirm%C9%99k%20ist%C9%99yir%C9%99m", labelKey: "footer.links.adPlacement" },
    { to: "/sual-cavab", labelKey: "footer.links.qna" },
    { to: "/luget", labelKey: "footer.links.glossary" },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground mt-20">
      <div className="container py-10 md:py-14 grid gap-8 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        <div className="col-span-2 lg:col-span-2">
          <Link to={lp("/")} className="flex items-center gap-2.5">
            <img loading="lazy" 
              src="/logo.webp" 
              alt="Pultap Logo" 
              className="h-10 w-auto object-contain" 
            />
            {/* eslint-disable-next-line i18next/no-literal-string */}
            <span className="text-xl font-display font-bold">Pultap.az</span>
          </Link>
          <p className="mt-4 text-sm text-secondary-foreground/70 leading-relaxed max-w-sm">
            {t("footer.tagline")}
          </p>
          <ul className="mt-5 space-y-2 text-sm text-secondary-foreground/70">
            <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary-glow" /> {t("footer.workHours")}</li>
            {/* eslint-disable-next-line i18next/no-literal-string */}
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary-glow" /> info@pultap.az</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary-glow" /> {t("footer.address")}</li>
          </ul>
          <div className="mt-5 flex gap-2">
            {[
              { Icon: Facebook, href: "https://www.facebook.com/people/Pultapaz/61566029446437/?mibextid=wwXIfr&rdid=fhBTq6WMcZeM6kyj&share_url=https%253A%252F%252Fwww.facebook.com%252Fshare%252F1XavBj111z%252F%253Fmibextid%253DwwXIfr", target: "_blank", rel: "noopener noreferrer", label: "Facebook" },
              { Icon: Instagram, href: "https://www.instagram.com/pultap_az", target: "_blank", rel: "noopener noreferrer", label: "Instagram" },
              { Icon: Linkedin, href: "https://www.linkedin.com/company/pultap-az/", target: "_blank", rel: "noopener noreferrer", label: "LinkedIn" },
              { Icon: TiktokIcon, href: "https://www.tiktok.com/@pultap_az", target: "_blank", rel: "noopener noreferrer", label: "TikTok" },
              { Icon: TelegramIcon, href: "https://t.me/pultapazz", target: "_blank", rel: "noopener noreferrer", label: "Telegram" }
            ].map(({ Icon, href, target, rel, label }, i) => (
              <a 
                key={i} 
                href={href} 
                target={target}
                rel={rel}
                aria-label={label} 
                className="h-9 w-9 rounded-md bg-white/5 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <FooterCol title={t("footer.products")} links={productLinks} lp={lp} t={t} />
        <FooterCol title={t("footer.tools")} links={toolLinks} lp={lp} t={t} />
        <div className="col-span-2 md:col-span-1 lg:col-span-1">
          <FooterCol title={t("footer.company")} links={companyLinks} lp={lp} t={t} />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container py-7">
          <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
            <div>
              <h4 className="text-sm font-semibold">{t("footer.newsletter.title")}</h4>
              <p className="text-xs text-secondary-foreground/60 mt-1">{t("footer.newsletter.desc")}</p>
            </div>
            <form
              className="flex gap-2 w-full md:w-auto md:min-w-[380px]"
              onSubmit={(e) => {
                e.preventDefault();
                const trimmed = email.trim();
                if (!trimmed) {
                  toast.error(t("footer.newsletter.errorEmpty", { defaultValue: "E-poçt ünvanı daxil edin" }));
                  return;
                }
                if (!EMAIL_RE.test(trimmed)) {
                  toast.error(t("footer.newsletter.errorInvalid", { defaultValue: "Düzgün e-poçt ünvanı daxil edin" }));
                  return;
                }
                toast.success(t("footer.newsletter.success", { defaultValue: "Abunəliyiniz uğurla qeydə alındı!" }));
                setEmail("");
              }}
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("footer.newsletter.placeholder")}
                className="bg-white/5 border-white/10 text-secondary-foreground placeholder:text-secondary-foreground/50 focus-visible:ring-primary"
              />
              <Button type="submit" className="bg-primary hover:bg-primary-hover shrink-0 gap-1">
                {t("common.subscribe")} <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-secondary-foreground/60">
          <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
          <div className="flex gap-5">
            <Link to={lp("/mexfilik-siyaseti")} className="hover:text-primary-glow transition">{t("footer.privacy")}</Link>
            <Link to={lp("/istifade-qaydalari")} className="hover:text-primary-glow transition">{t("footer.terms")}</Link>
            <Link to={lp("/kuki-siyaseti")} className="hover:text-primary-glow transition">{t("footer.cookies")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterCol = ({
  title,
  links,
  lp,
  t,
}: {
  title: string;
  links: { to: string; labelKey: string }[];
  lp: (p: string) => string;
  t: (k: string) => string;
}) => (
  <div>
    <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider text-secondary-foreground/60">{title}</h4>
    <ul className="space-y-2.5 text-sm">
      {links.map((l) => {
        const isExternal = l.to.startsWith("http");
        return (
          <li key={l.labelKey}>
            {isExternal ? (
              <a
                href={l.to}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-foreground/80 hover:text-primary-glow transition-colors"
              >
                {t(l.labelKey)}
              </a>
            ) : (
              <Link
                to={l.to === "#" ? "#" : lp(l.to)}
                className="text-secondary-foreground/80 hover:text-primary-glow transition-colors"
              >
                {t(l.labelKey)}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  </div>
);

const TiktokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const TelegramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m15 10-4 4 6 6 4-16-18 7 4 2 3.2 8.6c.4.9 1.6.9 2.1.1L15 10z" />
  </svg>
);
