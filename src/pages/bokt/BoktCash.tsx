import { useTranslation } from "react-i18next";
import { BoktListPage } from "@/components/site/BoktListPage";
export default function BoktCash() {
  const { t } = useTranslation();
  return (
    <BoktListPage
      title={t("pages.boktCash.title")}
      description={t("pages.boktCash.desc")}
      breadcrumbs={[
        { label: t("pages.boktAll.crumb"), to: "/bokt-kredit" },
        { label: t("pages.boktCash.crumb") },
      ]}
      initialType="nağd"
      lockType
    />
  );
}
