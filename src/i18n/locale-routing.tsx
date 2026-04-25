import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import {
  DEFAULT_LOCALE,
  Locale,
  SUPPORTED_LOCALES,
  isLocale,
} from "./config";

/**
 * Reads the locale from the first URL segment.
 * Default locale (az) is unprefixed: "/" === az, "/en/..." === en, "/ru/..." === ru.
 */
export const useUrlLocale = (): Locale => {
  const { pathname } = useLocation();
  const seg = pathname.split("/")[1];
  if (isLocale(seg)) return seg;
  return DEFAULT_LOCALE;
};

/**
 * Build a path that respects the current locale's URL prefix.
 * useLocalePath()("/kreditler") -> "/kreditler" (az) | "/en/kreditler" | "/ru/kreditler"
 */
export const useLocalePath = () => {
  const locale = useUrlLocale();
  return (path: string) => {
    const clean = path.startsWith("/") ? path : `/${path}`;
    if (locale === DEFAULT_LOCALE) return clean;
    return `/${locale}${clean}`;
  };
};

/** Strip the locale prefix from a path (returns the path the i18n-agnostic router sees). */
export const stripLocale = (pathname: string): string => {
  const seg = pathname.split("/")[1];
  if (isLocale(seg) && seg !== DEFAULT_LOCALE) {
    const rest = pathname.slice(`/${seg}`.length);
    return rest.length === 0 ? "/" : rest;
  }
  return pathname;
};

/**
 * Switch language while preserving the current page (and query/hash).
 */
export const useSwitchLocale = () => {
  const navigate = useNavigate();
  const { pathname, search, hash } = useLocation();
  return (next: Locale) => {
    const bare = stripLocale(pathname);
    const prefixed = next === DEFAULT_LOCALE ? bare : `/${next}${bare === "/" ? "" : bare}`;
    navigate(`${prefixed || "/"}${search}${hash}`);
  };
};

/**
 * Keeps i18next + <html lang> in sync with the URL locale.
 * Mounted once near the top of the tree.
 */
export const LocaleSync = () => {
  const locale = useUrlLocale();
  const { pathname } = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
    document.documentElement.lang = locale;
  }, [locale, i18n]);

  // Build hreflang alternates for the current page
  const alternates = useMemo(() => {
    if (typeof window === "undefined") return [];
    const bare = stripLocale(pathname);
    return SUPPORTED_LOCALES.map((l) => {
      const path = l === DEFAULT_LOCALE ? bare : `/${l}${bare === "/" ? "" : bare}`;
      return {
        hrefLang: l,
        href: `${window.location.origin}${path || "/"}`,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale, pathname]);

  const currentUrl = typeof window !== "undefined" ? `${window.location.origin}${pathname}` : "";

  return (
    <Helmet>
      <html lang={locale} />
      {currentUrl && <link rel="canonical" href={currentUrl} />}
      {alternates.map((a) => (
        <link key={a.hrefLang} rel="alternate" hrefLang={a.hrefLang} href={a.href} />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={alternates.find((a) => a.hrefLang === DEFAULT_LOCALE)?.href ?? "/"}
      />
    </Helmet>
  );
};
