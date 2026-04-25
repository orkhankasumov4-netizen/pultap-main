import { useTranslation } from "react-i18next";
import { CardsListPage } from "@/components/site/CardsListPage";
export default function DebitCards() {
  const { t } = useTranslation();
  return (
    <CardsListPage
      kind="debet"
      title={t("pages.debitCards.title")}
      description={t("pages.debitCards.desc")}
      breadcrumbs={[
        { label: t("pages.debitCards.parent") },
        { label: t("pages.debitCards.crumb") },
      ]}
    />
  );
}
