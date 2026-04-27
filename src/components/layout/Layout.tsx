import { Outlet, useLocation } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { BackToTop } from "./BackToTop";
import { ChatWidget } from "../chat/ChatWidget";
import { PageFallback } from "./PageFallback";

export const Layout = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  
  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium shadow-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {t("common.skipToContent")}
      </a>
      <Navbar />
      <main id="main-content" className="flex-1 outline-none" tabIndex={-1}>
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <BackToTop />
      <ChatWidget />
    </div>
  );
};