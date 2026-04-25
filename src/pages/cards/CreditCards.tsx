import { useTranslation } from "react-i18next";
import { CardsListPage } from "@/components/site/CardsListPage";
export default function CreditCards() {
  const { t } = useTranslation();
  return (
    <CardsListPage
      kind="kredit"
      title={t("pages.creditCards.title")}
      description={t("pages.creditCards.desc")}
      breadcrumbs={[
        { label: t("pages.creditCards.parent") },
        { label: t("pages.creditCards.crumb") },
      ]}
    />
  );
}
