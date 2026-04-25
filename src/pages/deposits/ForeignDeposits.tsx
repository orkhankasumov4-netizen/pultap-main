import { useTranslation } from "react-i18next";
import { DepositsListPage } from "@/components/site/DepositsListPage";
export default function ForeignDeposits() {
  const { t } = useTranslation();
  return (
    <DepositsListPage
      title={t("pages.depositsFx.title")}
      description={t("pages.depositsFx.desc")}
      breadcrumbs={[
        { label: t("pages.depositsAll.crumb"), to: "/depozit" },
        { label: t("pages.depositsFx.crumb") },
      ]}
      initialCurrency="foreign"
      lockCurrency
    />
  );
}
