import { useTranslation } from "react-i18next";
import { DepositsListPage } from "@/components/site/DepositsListPage";
export default function ManatDeposits() {
  const { t } = useTranslation();
  return (
    <DepositsListPage
      title={t("pages.depositsAzn.title")}
      description={t("pages.depositsAzn.desc")}
      breadcrumbs={[
        { label: t("pages.depositsAll.crumb"), to: "/depozit" },
        { label: t("pages.depositsAzn.crumb") },
      ]}
      initialCurrency="AZN"
      lockCurrency
    />
  );
}
