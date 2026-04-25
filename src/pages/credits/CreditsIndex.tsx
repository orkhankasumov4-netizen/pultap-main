import { useTranslation } from "react-i18next";
import { CreditsListPage } from "@/components/site/CreditsListPage";
export default function CreditsIndex() {
  const { t } = useTranslation();
  return (
    <CreditsListPage
      title={t("pages.credits.title")}
      description={t("pages.credits.desc")}
      breadcrumbs={[{ label: t("pages.credits.crumb") }]}
    />
  );
}
