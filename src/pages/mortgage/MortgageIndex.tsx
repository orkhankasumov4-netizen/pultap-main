import { useTranslation } from "react-i18next";
import { CreditsListPage } from "@/components/site/CreditsListPage";
export default function MortgageIndex() {
  const { t } = useTranslation();
  return (
    <CreditsListPage
      title={t("pages.mortgageAll.title")}
      description={t("pages.mortgageAll.desc")}
      breadcrumbs={[{ label: t("pages.mortgageAll.crumb") }]}
      initialType="ipoteka"
      lockType
    />
  );
}
