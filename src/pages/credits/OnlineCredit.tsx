import { useTranslation } from "react-i18next";
import { CreditsListPage } from "@/components/site/CreditsListPage";
export default function OnlineCredit() {
  const { t } = useTranslation();
  return (
    <CreditsListPage
      title={t("pages.online.title")}
      description={t("pages.online.desc")}
      breadcrumbs={[
        { label: t("pages.credits.crumb"), to: "/kreditler" },
        { label: t("pages.online.crumb") },
      ]}
      initialType="online"
      lockType
    />
  );
}
