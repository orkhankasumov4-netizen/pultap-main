import { useTranslation } from "react-i18next";
import { CreditsListPage } from "@/components/site/CreditsListPage";
export default function CashCredit() {
  const { t } = useTranslation();
  return (
    <CreditsListPage
      title={t("pages.cash.title")}
      description={t("pages.cash.desc")}
      breadcrumbs={[
        { label: t("pages.credits.crumb"), to: "/kreditler" },
        { label: t("pages.cash.crumb") },
      ]}
      initialType="nağd"
      lockType
    />
  );
}
