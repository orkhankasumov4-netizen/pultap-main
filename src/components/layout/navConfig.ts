import {
  Wallet, CreditCard, PiggyBank, Home, ArrowLeftRight, Building2,
  Calculator, Coins, Landmark, ScrollText, Banknote, Gem, Car,
  type LucideIcon
} from "lucide-react";

export type NavChild = { to: string; labelKey: string; descKey?: string; icon?: LucideIcon };
export type NavSection = {
  to?: string;
  labelKey: string;
  icon: LucideIcon;
  children?: { headingKey?: string; items: NavChild[] }[];
};

export const navSections: NavSection[] = [
  {
    labelKey: "nav.credits",
    icon: Wallet,
    to: "/kreditler",
    children: [
      {
        headingKey: "nav.headings.bankCredits",
        items: [
          { to: "/kreditler", labelKey: "nav.items.allCredits", descKey: "nav.items.allCreditsDesc", icon: Wallet },
          { to: "/kreditler/online-kredit", labelKey: "nav.items.onlineCredit", descKey: "nav.items.onlineCreditDesc", icon: Banknote },
          { to: "/kreditler/nagd-pul-krediti", labelKey: "nav.items.cashCredit", descKey: "nav.items.cashCreditDesc", icon: Coins },
          { to: "/kredit-tarixcesi", labelKey: "nav.items.creditHistory", descKey: "nav.items.creditHistoryDesc", icon: ScrollText },
        ],
      },
      {
        headingKey: "nav.headings.tools",
        items: [
          { to: "/kredit-kalkulyatoru", labelKey: "nav.items.creditCalc", descKey: "nav.items.creditCalcDesc", icon: Calculator },
        ],
      },
    ],
  },
  {
    labelKey: "nav.bokt",
    icon: Landmark,
    to: "/bokt-kredit",
    children: [
      {
        items: [
          { to: "/bokt-kredit", labelKey: "nav.items.allBokt", icon: Landmark },
          { to: "/bokt-kredit/nagd-pul", labelKey: "nav.items.boktCash", icon: Coins },
          { to: "/bokt-kredit/lombard", labelKey: "nav.items.lombard", icon: Gem },
          { to: "/bokt-kredit/pts-girovu", labelKey: "nav.items.ptsCredit", icon: Car },
          { to: "/bokt", labelKey: "nav.items.boktList", icon: Building2 },
        ],
      },
    ],
  },
  {
    labelKey: "nav.cards",
    icon: CreditCard,
    to: "/bank-kartlari/kredit-kartlari",
    children: [
      {
        items: [
          { to: "/bank-kartlari/kredit-kartlari", labelKey: "nav.items.creditCards", descKey: "nav.items.creditCardsDesc", icon: CreditCard },
          { to: "/bank-kartlari/debet-kartlar", labelKey: "nav.items.debitCards", descKey: "nav.items.debitCardsDesc", icon: CreditCard },
        ],
      },
    ],
  },
  {
    labelKey: "nav.deposits",
    icon: PiggyBank,
    to: "/depozit",
    children: [
      {
        items: [
          { to: "/depozit", labelKey: "nav.items.allDeposits", icon: PiggyBank },
          { to: "/depozit/manatla-depozit", labelKey: "nav.items.manatDeposits", icon: Coins },
          { to: "/depozit/xarici-valyutada-depozit", labelKey: "nav.items.fxDeposits", icon: ArrowLeftRight },
          { to: "/depozit-kalkulyatoru", labelKey: "nav.items.depositCalc", icon: Calculator },
        ],
      },
    ],
  },
  {
    labelKey: "nav.mortgage",
    icon: Home,
    to: "/ipoteka",
    children: [
      {
        items: [
          { to: "/ipoteka", labelKey: "nav.items.allMortgage", icon: Home },
          { to: "/ipoteka/dovlet-ipotekasi", labelKey: "nav.items.stateMortgage", icon: Landmark },
          { to: "/ipoteka/daxili-ipoteka", labelKey: "nav.items.internalMortgage", icon: Home },
        ],
      },
    ],
  },
  {
    labelKey: "nav.currency",
    icon: ArrowLeftRight,
    to: "/valyuta-kurslar",
    children: [
      {
        headingKey: "nav.headings.rates",
        items: [{ to: "/valyuta-kurslar", labelKey: "nav.items.currencyRates", descKey: "nav.items.currencyRatesDesc", icon: Coins }],
      },
      {
        headingKey: "nav.headings.converter",
        items: [
          { to: "/konvertor", labelKey: "nav.items.universalConverter", icon: Calculator },
          { to: "/konvertor/dollar-manat", labelKey: "nav.items.usdAzn", icon: ArrowLeftRight },
          { to: "/konvertor/avro-manat", labelKey: "nav.items.eurAzn", icon: ArrowLeftRight },
          { to: "/konvertor/rubl-manat", labelKey: "nav.items.rubAzn", icon: ArrowLeftRight },
        ],
      },
    ],
  },
  { labelKey: "nav.banks", icon: Building2, to: "/banks" },
];
