import { useTranslation } from "react-i18next";
import { InstitutionsList } from "@/components/site/InstitutionsList";

export default function BoktList() {
  const { t } = useTranslation();
  return (
    <InstitutionsList
      type="bokt"
      title={t("pages.bokt.title")}
      description={t("pages.bokt.desc")}
      breadcrumbLabel={t("pages.bokt.crumb")}
    />
  );
}
