import { useTranslation } from "react-i18next";
import { BoktListPage } from "@/components/site/BoktListPage";
export default function BoktIndex() {
  const { t } = useTranslation();
  return (
    <BoktListPage
      title={t("pages.boktAll.title")}
      description={t("pages.boktAll.desc")}
      breadcrumbs={[{ label: t("pages.boktAll.crumb") }]}
    />
  );
}
