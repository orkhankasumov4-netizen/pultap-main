import { useTranslation } from "react-i18next";
import { InstitutionsList } from "@/components/site/InstitutionsList";

export default function BanksList() {
  const { t } = useTranslation();
  return (
    <InstitutionsList
      type="bank"
      title={t("pages.banks.title")}
      description={t("pages.banks.desc")}
      breadcrumbLabel={t("pages.banks.crumb")}
    />
  );
}
