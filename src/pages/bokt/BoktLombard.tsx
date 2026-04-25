import { useTranslation } from "react-i18next";
import { BoktListPage } from "@/components/site/BoktListPage";
export default function BoktLombard() {
  const { t } = useTranslation();
  return (
    <BoktListPage
      title={t("pages.boktLomb.title")}
      description={t("pages.boktLomb.desc")}
      breadcrumbs={[
        { label: t("pages.boktAll.crumb"), to: "/bokt-kredit" },
        { label: t("pages.boktLomb.crumb") },
      ]}
      initialType="lombard"
      lockType
    />
  );
}
