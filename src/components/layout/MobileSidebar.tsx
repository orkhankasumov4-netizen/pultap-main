import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Wallet, Phone } from "lucide-react";
import { navSections } from "./navConfig";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLocalePath } from "@/i18n/locale-routing";

type Props = { open: boolean; onOpenChange: (v: boolean) => void };

export const MobileSidebar = ({ open, onOpenChange }: Props) => {
  const close = () => onOpenChange(false);
  const { t } = useTranslation();
  const lp = useLocalePath();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[88vw] sm:w-[400px] p-0 flex flex-col">
        <SheetHeader className="px-5 py-4 border-b border-border">
          <SheetTitle asChild>
            <Link to={lp("/")} onClick={close} className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Wallet className="h-5 w-5 text-primary-foreground" />
              </div>
              {/* eslint-disable-next-line i18next/no-literal-string */}
              <span className="text-xl font-bold font-display tracking-tight text-foreground">
              Pultap
              {/* eslint-disable-next-line i18next/no-literal-string */}
              <span className="text-primary">.az</span>
            </span>
            </Link>
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-3 py-2">
          <Accordion type="multiple" className="w-full">
            {navSections.map((sec, i) => {
              const Icon = sec.icon;
              if (!sec.children?.length) {
                return (
                  <Link
                    key={sec.labelKey}
                    to={lp(sec.to!)}
                    onClick={close}
                    className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-muted text-sm font-medium border-b border-border last:border-b-0"
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    {t(sec.labelKey)}
                  </Link>
                );
              }
              return (
                <AccordionItem key={sec.labelKey} value={`s-${i}`} className="border-border">
                  <AccordionTrigger className="px-3 py-3 hover:no-underline hover:bg-muted rounded-md text-sm font-medium">
                    <span className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-primary" />
                      {t(sec.labelKey)}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-1">
                    <div className="pl-9 pr-2 space-y-0.5">
                      {sec.children.map((col, ci) => (
                        <div key={ci}>
                          {col.headingKey && (
                            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-2 pt-2 pb-1">
                              {t(col.headingKey)}
                            </div>
                          )}
                          {col.items.map((it) => (
                            <Link
                              key={it.to}
                              to={lp(it.to)}
                              onClick={close}
                              className="block px-2 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-muted rounded-md transition-colors"
                            >
                              {t(it.labelKey)}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>

        <div className="border-t border-border p-4 space-y-3 bg-muted/30">
          <a href="tel:+994000000000" className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary">
            <Phone className="h-4 w-4" /> {t("topbar.phone")}
          </a>
          <LanguageSwitcher variant="mobile" />
        </div>
      </SheetContent>
    </Sheet>
  );
};
