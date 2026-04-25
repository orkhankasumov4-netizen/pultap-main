import { useTranslation } from "react-i18next";
import { DepositsListPage } from "@/components/site/DepositsListPage";
export default function DepositsIndex() {
  const { t } = useTranslation();
  return (
    <DepositsListPage
      title={t("pages.depositsAll.title")}
      description={t("pages.depositsAll.desc")}
      breadcrumbs={[{ label: t("pages.depositsAll.crumb") }]}
    />
  );
}
