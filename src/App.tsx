import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "./components/layout/Layout";
import { LocaleSync } from "./i18n/locale-routing";
import { CompareProvider } from "./context/CompareContext";
import { ThemeProvider } from "next-themes";
import { ErrorBoundary } from "./components/layout/ErrorBoundary";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));

const CreditsIndex = lazy(() => import("./pages/credits/CreditsIndex"));
const OnlineCredit = lazy(() => import("./pages/credits/OnlineCredit"));
const CashCredit = lazy(() => import("./pages/credits/CashCredit"));
const CreditHistory = lazy(() => import("./pages/credits/CreditHistory"));
const CreditDetailPage = lazy(() => import("./pages/credits/CreditDetailPage"));

const LoanCalculatorPage = lazy(() => import("./pages/calculators/LoanCalculatorPage"));
const DepositCalculatorPage = lazy(() => import("./pages/calculators/DepositCalculatorPage"));

const BoktIndex = lazy(() => import("./pages/bokt/BoktIndex"));
const BoktCash = lazy(() => import("./pages/bokt/BoktCash"));
const BoktLombard = lazy(() => import("./pages/bokt/BoktLombard"));
const PtsCredit = lazy(() => import("./pages/bokt/PtsCredit"));

const CreditCards = lazy(() => import("./pages/cards/CreditCards"));
const DebitCards = lazy(() => import("./pages/cards/DebitCards"));

const DepositsIndex = lazy(() => import("./pages/deposits/DepositsIndex"));
const ManatDeposits = lazy(() => import("./pages/deposits/ManatDeposits"));
const ForeignDeposits = lazy(() => import("./pages/deposits/ForeignDeposits"));

const MortgageIndex = lazy(() => import("./pages/mortgage/MortgageIndex"));
const StateMortgage = lazy(() => import("./pages/mortgage/StateMortgage"));
const InternalMortgage = lazy(() => import("./pages/mortgage/InternalMortgage"));

const Rates = lazy(() => import("./pages/currency/Rates"));
const ConverterIndex = lazy(() => import("./pages/currency/ConverterIndex"));
const UsdAzn = lazy(() => import("./pages/currency/UsdAzn"));
const EurAzn = lazy(() => import("./pages/currency/EurAzn"));
const RubAzn = lazy(() => import("./pages/currency/RubAzn"));

const BanksList = lazy(() => import("./pages/institutions/BanksList"));
const BoktList = lazy(() => import("./pages/institutions/BoktList"));

const BlogListPage = lazy(() => import("./pages/blog/BlogListPage"));
const BlogPostPage = lazy(() => import("./pages/blog/BlogPostPage"));
const BankDetailPage = lazy(() => import("./pages/institutions/BankDetailPage"));

const ComparePage = lazy(() => import("./pages/compare/ComparePage"));

const AboutPage = lazy(() => import("./pages/about/AboutPage"));
const ContactPage = lazy(() => import("./pages/contact/ContactPage"));
const AdvertisePage = lazy(() => import("./pages/advertise/AdvertisePage"));
const TermsOfUsePage = lazy(() => import("./pages/terms/TermsOfUsePage"));
const PrivacyPolicyPage = lazy(() => import("./pages/terms/PrivacyPolicyPage"));
const CookiePolicyPage = lazy(() => import("./pages/terms/CookiePolicyPage"));
const QnaPage = lazy(() => import("./pages/qna/QnaPage"));
const GlossaryPage = lazy(() => import("./pages/glossary/GlossaryPage"));

// Admin Panel Pages
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout").then(m => ({ default: m.AdminLayout })));
const DashboardPage = lazy(() => import("./pages/admin/DashboardPage").then(m => ({ default: m.DashboardPage })));
const LoansPage = lazy(() => import("./pages/admin/LoansPage").then(m => ({ default: m.LoansPage })));

// Auth Pages
const Login = lazy(() => import("./pages/auth/Login").then(m => ({ default: m.Login })));
const Register = lazy(() => import("./pages/auth/Register").then(m => ({ default: m.Register })));
const AdminLogin = lazy(() => import("./pages/auth/AdminLogin").then(m => ({ default: m.AdminLogin })));
import { AdminProtectedRoute } from "./components/auth/AdminProtectedRoute";
import { OfflineBanner } from "./components/site/OfflineBanner";
import { CookieConsent } from "./components/site/CookieConsent";
const OfflinePage = lazy(() => import("./pages/OfflinePage").then(m => ({ default: m.OfflinePage })));

const queryClient = new QueryClient();

/**
 * Set of routes shared by every locale.
 * Default locale (az) is mounted at "/", others at "/:lang/...".
 */
const AppRoutes = () => (
  <Route element={<Layout />}>
    <Route index element={<Index />} />

    {/* Credits */}
    <Route path="kreditler" element={<CreditsIndex />} />
    <Route path="kreditler/:id" element={<CreditDetailPage />} />
    <Route path="kreditler/online-kredit" element={<OnlineCredit />} />
    <Route path="kreditler/nagd-pul-krediti" element={<CashCredit />} />
    <Route path="kredit-tarixcesi" element={<CreditHistory />} />

    {/* Calculators */}
    <Route path="kredit-kalkulyatoru" element={<LoanCalculatorPage />} />
    <Route path="depozit-kalkulyatoru" element={<DepositCalculatorPage />} />

    {/* BOKT */}
    <Route path="bokt-kredit" element={<BoktIndex />} />
    <Route path="bokt-kredit/nagd-pul" element={<BoktCash />} />
    <Route path="bokt-kredit/lombard" element={<BoktLombard />} />
    <Route path="bokt-kredit/pts-girovu" element={<PtsCredit />} />

    {/* Cards */}
    <Route path="bank-kartlari/kredit-kartlari" element={<CreditCards />} />
    <Route path="bank-kartlari/debet-kartlar" element={<DebitCards />} />

    {/* Deposits */}
    <Route path="depozit" element={<DepositsIndex />} />
    <Route path="depozit/manatla-depozit" element={<ManatDeposits />} />
    <Route path="depozit/xarici-valyutada-depozit" element={<ForeignDeposits />} />

    {/* Mortgage */}
    <Route path="ipoteka" element={<MortgageIndex />} />
    <Route path="ipoteka/dovlet-ipotekasi" element={<StateMortgage />} />
    <Route path="ipoteka/daxili-ipoteka" element={<InternalMortgage />} />

    {/* Currency */}
    <Route path="valyuta-kurslar" element={<Rates />} />
    <Route path="konvertor" element={<ConverterIndex />} />
    <Route path="konvertor/dollar-manat" element={<UsdAzn />} />
    <Route path="konvertor/avro-manat" element={<EurAzn />} />
    <Route path="konvertor/rubl-manat" element={<RubAzn />} />

    {/* Institutions */}
    <Route path="banks" element={<BanksList />} />
    <Route path="banks/:id" element={<BankDetailPage />} />
    <Route path="bokt" element={<BoktList />} />

    {/* Blog */}
    <Route path="bloq" element={<BlogListPage />} />
    <Route path="bloq/:slug" element={<BlogPostPage />} />

    {/* Compare */}
    <Route path="muqayise" element={<ComparePage />} />
    <Route path="haqqimizda" element={<AboutPage />} />
    <Route path="elaqe" element={<ContactPage />} />
    <Route path="reklam" element={<AdvertisePage />} />
    <Route path="istifade-qaydalari" element={<TermsOfUsePage />} />
    <Route path="mexfilik-siyaseti" element={<PrivacyPolicyPage />} />
    <Route path="kuki-siyaseti" element={<CookiePolicyPage />} />
    <Route path="sual-cavab" element={<QnaPage />} />
    <Route path="luget" element={<GlossaryPage />} />
    <Route path="giris" element={<Login />} />
    <Route path="qeydiyyat" element={<Register />} />
    <Route path="offline" element={<OfflinePage />} />

    {/* Phase-1 → Phase-2 redirects */}
    <Route path="depozitler" element={<Navigate to="../depozit" replace />} />
    <Route path="kartlar" element={<Navigate to="../bank-kartlari/kredit-kartlari" replace />} />
    <Route path="valyuta" element={<Navigate to="../valyuta-kurslar" replace />} />
    <Route path="banklar" element={<Navigate to="../banks" replace />} />
    <Route path="*" element={<NotFound />} />
  </Route>
);

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="pultap-theme">
    <QueryClientProvider client={queryClient}>
      <CompareProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <OfflineBanner />
            <CookieConsent />
            <LocaleSync />
            <ErrorBoundary>
              <Suspense fallback={<div className="h-screen w-full flex items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div>}>
              <Routes>
                {/* Admin Auth Route */}
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* Protected Admin Routes */}
                <Route path="/admin" element={<AdminProtectedRoute />}>
                  <Route element={<AdminLayout />}>
                    <Route index element={<DashboardPage />} />
                    <Route path="loans" element={<LoansPage />} />
                    <Route path="*" element={<DashboardPage />} />
                  </Route>
                </Route>

                {/* Default locale: unprefixed (az) */}
                <Route path="/">{AppRoutes()}</Route>
                {/* Non-default locales: /:lang/... */}
                <Route path="/:lang">{AppRoutes()}</Route>
              </Routes>
            </Suspense>
            </ErrorBoundary>
          </BrowserRouter>
        </TooltipProvider>
      </CompareProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
