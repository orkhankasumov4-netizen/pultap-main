import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { HeroSearch } from "@/components/home/HeroSearch";
import { RatesTicker } from "@/components/home/RatesTicker";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { TopLoansTable } from "@/components/home/TopLoansTable";
import { BanksWall } from "@/components/home/BanksWall";
import { WhyPultap } from "@/components/home/WhyPultap";
import { CtaBanner } from "@/components/home/CtaBanner";

const Index = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t("seo.home.title")}</title>
        <meta name="description" content={t("seo.home.description")} />
        <meta name="keywords" content={t("seo.home.keywords", "kredit, depozit, bank kartları, ipoteka, pulsuz müqayisə, faiz dərəcələri, azərbaycan bankları, nağd kredit, online kredit, pultap")} />
        <link rel="canonical" href="https://pultap.az/" />
      </Helmet>

      <HeroSearch />
      <RatesTicker />
      <CategoryGrid />
      <TopLoansTable />
      <BanksWall />
      <WhyPultap />
      <CtaBanner />
    </>
  );
};

export default Index;
