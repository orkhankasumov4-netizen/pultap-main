export type Bank = { id: string; name: string; logoColor: string; rating: number; reviews: number };
export type Credit = {
  id: string;
  name: string;
  bankId: string;
  type: "online" | "nağd" | "ipoteka" | "avto";
  rate: number; // annual %
  amountMin: number;
  amountMax: number;
  termMin: number; // months
  termMax: number;
  collateral: boolean;
  insurance: boolean;
  highlight?: string;
};
export type Deposit = { id: string; name: string; bankId: string; rate: number; currency: "AZN"|"USD"|"EUR"; termMonths: number; minAmount: number };
export type Card = { id: string; name: string; bankId: string; kind: "debet"|"kredit"; cashback: number; annualFee: number; limit?: number; perks: string[] };
export type Currency = { code: string; flag: string; buy: number; sell: number; change: number };

export const banks: Bank[] = [
  { id: "kapital",  name: "Kapital Bank",  logoColor: "#d62828", rating: 4.6, reviews: 2814 },
  { id: "abb",      name: "ABB Bank",      logoColor: "#0a3d91", rating: 4.4, reviews: 1992 },
  { id: "birbank",  name: "Birbank",       logoColor: "#1f1f1f", rating: 4.7, reviews: 3120 },
  { id: "pasha",    name: "PAŞA Bank",     logoColor: "#1c4f3b", rating: 4.5, reviews: 1408 },
  { id: "unibank",  name: "Unibank",       logoColor: "#e63946", rating: 4.3, reviews: 1156 },
  { id: "rabita",   name: "Rabitəbank",    logoColor: "#0066b2", rating: 4.2, reviews: 842 },
  { id: "access",   name: "AccessBank",    logoColor: "#f5a623", rating: 4.4, reviews: 1267 },
  { id: "bank-of-baku", name: "Bank of Baku", logoColor: "#005baa", rating: 4.1, reviews: 990 },
  { id: "expressbank",  name: "Expressbank",  logoColor: "#7b2cbf", rating: 4.0, reviews: 612 },
  { id: "yelo",     name: "Yelo Bank",     logoColor: "#2ec4b6", rating: 4.3, reviews: 745 },
];

export const credits: Credit[] = [
  { id: "c1",  name: "Birbank Online Kredit",     bankId: "birbank", type: "online", rate: 14.9, amountMin: 100, amountMax: 25000, termMin: 3, termMax: 36, collateral: false, insurance: false, highlight: "Ən sürətli" },
  { id: "c2",  name: "Kapital Express Nağd",      bankId: "kapital", type: "nağd",   rate: 16.5, amountMin: 500, amountMax: 50000, termMin: 6, termMax: 60, collateral: false, insurance: true,  highlight: "Populyar" },
  { id: "c3",  name: "ABB Smart Kredit",          bankId: "abb",     type: "online", rate: 15.2, amountMin: 200, amountMax: 30000, termMin: 6, termMax: 48, collateral: false, insurance: false },
  { id: "c4",  name: "PAŞA Premium Nağd",         bankId: "pasha",   type: "nağd",   rate: 13.9, amountMin: 1000, amountMax: 80000, termMin: 12, termMax: 60, collateral: true, insurance: true, highlight: "Ən aşağı faiz" },
  { id: "c5",  name: "Unibank Plus Kredit",       bankId: "unibank", type: "nağd",   rate: 17.0, amountMin: 300, amountMax: 20000, termMin: 3, termMax: 36, collateral: false, insurance: false },
  { id: "c6",  name: "AccessBank Avto Kredit",    bankId: "access",  type: "avto",   rate: 12.5, amountMin: 5000, amountMax: 100000, termMin: 12, termMax: 84, collateral: true, insurance: true },
  { id: "c7",  name: "Rabitə Onlayn Mikrokredit", bankId: "rabita",  type: "online", rate: 18.5, amountMin: 100, amountMax: 5000,  termMin: 3, termMax: 18, collateral: false, insurance: false },
  { id: "c8",  name: "BoB Pul Kredit",            bankId: "bank-of-baku", type: "nağd", rate: 16.8, amountMin: 500, amountMax: 30000, termMin: 6, termMax: 48, collateral: false, insurance: true },
  { id: "c9",  name: "Yelo Onlayn",               bankId: "yelo",    type: "online", rate: 15.9, amountMin: 200, amountMax: 15000, termMin: 3, termMax: 36, collateral: false, insurance: false },
  { id: "c10", name: "Express Universal Kredit",  bankId: "expressbank", type: "nağd", rate: 17.5, amountMin: 500, amountMax: 25000, termMin: 6, termMax: 48, collateral: false, insurance: true },
  { id: "c11", name: "Kapital İpoteka",           bankId: "kapital", type: "ipoteka", rate: 8.0,  amountMin: 30000, amountMax: 350000, termMin: 60, termMax: 300, collateral: true, insurance: true, highlight: "Dövlət ipotekası" },
  { id: "c12", name: "ABB Daxili İpoteka",        bankId: "abb",     type: "ipoteka", rate: 9.5,  amountMin: 20000, amountMax: 250000, termMin: 60, termMax: 240, collateral: true, insurance: true },
];

export const deposits: Deposit[] = [
  { id: "d1", name: "Kapital Sabit", bankId: "kapital", rate: 9.5, currency: "AZN", termMonths: 12, minAmount: 500 },
  { id: "d2", name: "PAŞA Premium",  bankId: "pasha",   rate: 10.2, currency: "AZN", termMonths: 24, minAmount: 1000 },
  { id: "d3", name: "ABB Sərfəli",   bankId: "abb",     rate: 8.5, currency: "USD", termMonths: 12, minAmount: 500 },
  { id: "d4", name: "Birbank Smart", bankId: "birbank", rate: 9.8, currency: "AZN", termMonths: 18, minAmount: 200 },
  { id: "d5", name: "Unibank Euro",  bankId: "unibank", rate: 4.5, currency: "EUR", termMonths: 12, minAmount: 1000 },
  { id: "d6", name: "Yelo Plus",     bankId: "yelo",    rate: 9.2, currency: "AZN", termMonths: 6,  minAmount: 100 },
];

export const cards: Card[] = [
  { id: "k1", name: "Birbank Plus Kredit Kartı", bankId: "birbank", kind: "kredit", cashback: 5, annualFee: 0,   limit: 10000, perks: ["55 gün faizsiz", "5% kafeyə cashback"] },
  { id: "k2", name: "Kapital BirKart Gold",      bankId: "kapital", kind: "kredit", cashback: 3, annualFee: 25,  limit: 15000, perks: ["Hissəli ödəniş", "Bonus point"] },
  { id: "k3", name: "ABB Smart Debet",           bankId: "abb",     kind: "debet",  cashback: 2, annualFee: 0,   perks: ["Apple/Google Pay", "Pulsuz çıxarış"] },
  { id: "k4", name: "PAŞA Premium Mastercard",   bankId: "pasha",   kind: "kredit", cashback: 4, annualFee: 50,  limit: 25000, perks: ["Lounge access", "Səyahət sığortası"] },
  { id: "k5", name: "Unibank Cashback",          bankId: "unibank", kind: "debet",  cashback: 3, annualFee: 0,   perks: ["3% market", "Pulsuz hesab"] },
  { id: "k6", name: "Yelo Virtual",              bankId: "yelo",    kind: "debet",  cashback: 1, annualFee: 0,   perks: ["Onlayn alış-veriş", "Anında açılış"] },
];

export const currencies: Currency[] = [
  { code: "USD", flag: "🇺🇸", buy: 1.6985, sell: 1.7010, change: 0.02 },
  { code: "EUR", flag: "🇪🇺", buy: 1.8450, sell: 1.8520, change: -0.15 },
  { code: "RUB", flag: "🇷🇺", buy: 0.0185, sell: 0.0192, change: 0.32 },
  { code: "TRY", flag: "🇹🇷", buy: 0.0490, sell: 0.0510, change: -0.45 },
  { code: "GBP", flag: "🇬🇧", buy: 2.1530, sell: 2.1620, change: 0.08 },
  { code: "GEL", flag: "🇬🇪", buy: 0.6280, sell: 0.6340, change: 0.05 },
];

export const bankById = (id: string) => banks.find(b => b.id === id)!;

export type Bokt = { id: string; name: string; logoColor: string; rating: number; reviews: number };
export type BoktProduct = {
  id: string;
  name: string;
  boktId: string;
  type: "nağd" | "lombard" | "pts";
  rate: number;
  amountMin: number;
  amountMax: number;
  termMin: number;
  termMax: number;
  collateral: boolean;
  highlight?: string;
};

export const bokts: Bokt[] = [
  { id: "embafinans",   name: "Embafinans BOKT",   logoColor: "#0a8754", rating: 4.3, reviews: 612 },
  { id: "finkomkredit", name: "Finkomkredit BOKT", logoColor: "#1565c0", rating: 4.1, reviews: 488 },
  { id: "tezpara",      name: "TezPara BOKT",      logoColor: "#e63946", rating: 4.4, reviews: 904 },
  { id: "manatpro",     name: "ManatPro BOKT",     logoColor: "#7b2cbf", rating: 4.0, reviews: 357 },
  { id: "vivacash",     name: "VivaCash BOKT",     logoColor: "#f5a623", rating: 4.2, reviews: 521 },
  { id: "azerlombard",  name: "Azərlombard BOKT",  logoColor: "#b8860b", rating: 4.5, reviews: 740 },
];
export const boktById = (id: string) => bokts.find(b => b.id === id)!;

export const boktProducts: BoktProduct[] = [
  { id: "bp1", name: "TezPara Express",          boktId: "tezpara",      type: "nağd",    rate: 22.0, amountMin: 100, amountMax: 5000,  termMin: 1, termMax: 18, collateral: false, highlight: "5 dəq. təsdiq" },
  { id: "bp2", name: "Embafinans Mikro",         boktId: "embafinans",   type: "nağd",    rate: 24.5, amountMin: 200, amountMax: 7000,  termMin: 3, termMax: 24, collateral: false },
  { id: "bp3", name: "Finkomkredit Plus",        boktId: "finkomkredit", type: "nağd",    rate: 26.0, amountMin: 100, amountMax: 3000,  termMin: 1, termMax: 12, collateral: false, highlight: "Sənədsiz" },
  { id: "bp4", name: "ManatPro Online",          boktId: "manatpro",     type: "nağd",    rate: 28.0, amountMin: 50,  amountMax: 1500,  termMin: 1, termMax: 6,  collateral: false },
  { id: "bp5", name: "VivaCash Smart",           boktId: "vivacash",     type: "nağd",    rate: 23.5, amountMin: 100, amountMax: 4000,  termMin: 2, termMax: 18, collateral: false },
  { id: "bp6", name: "Azərlombard Qızıl",        boktId: "azerlombard",  type: "lombard", rate: 18.0, amountMin: 50,  amountMax: 50000, termMin: 1, termMax: 12, collateral: true,  highlight: "Qızıl girov" },
  { id: "bp7", name: "TezPara Lombard",          boktId: "tezpara",      type: "lombard", rate: 19.5, amountMin: 100, amountMax: 30000, termMin: 1, termMax: 12, collateral: true },
  { id: "bp8", name: "Embafinans Avto-girov",    boktId: "embafinans",   type: "lombard", rate: 20.0, amountMin: 500, amountMax: 80000, termMin: 3, termMax: 36, collateral: true },
  { id: "bp9", name: "TezPara Avto Girov",       boktId: "tezpara",      type: "pts",     rate: 20.0, amountMin: 500, amountMax: 30000, termMin: 1, termMax: 24, collateral: true, highlight: "5 dəq. təsdiq" },
  { id: "bp10", name: "Azərlombard PTS",         boktId: "azerlombard",  type: "pts",     rate: 17.5, amountMin: 1000, amountMax: 80000, termMin: 1, termMax: 36, collateral: true, highlight: "Ən çox məbləğ" },
  { id: "bp11", name: "Embafinans Avto",         boktId: "embafinans",   type: "pts",     rate: 21.0, amountMin: 300, amountMax: 20000, termMin: 2, termMax: 18, collateral: true  },
  { id: "bp12", name: "VivaCash Avto Kredit",    boktId: "vivacash",     type: "pts",     rate: 22.5, amountMin: 200, amountMax: 15000, termMin: 1, termMax: 12, collateral: true  },
  { id: "bp13", name: "ManatPro PTS Girov",      boktId: "manatpro",     type: "pts",     rate: 24.0, amountMin: 100, amountMax: 5000,  termMin: 1, termMax: 6,  collateral: true, highlight: "Sənədsiz" },
  { id: "bp14", name: "Finkomkredit Avto",       boktId: "finkomkredit", type: "pts",     rate: 25.0, amountMin: 100, amountMax: 8000,  termMin: 1, termMax: 12, collateral: true  },
];

export type Institution = {
  id: string;
  name: string;
  officialName?: string;
  logoColor: string;
  type: "bank" | "bokt";
  established: number;
  branches: number;
  atms?: number;
  website: string;
  phone: string;
  rating: number;
  reviews: number;
  description: string;
  swift?: string;
  voen?: string;
  correspondentAccount?: string;
  address?: string;
  logoUrl?: string;
};

export const institutions: Institution[] = [
  // ── Banks ──────────────────────────────────────────────
  {
    id: "kapital",
    name: "Kapital Bank",
    officialName: "\"Kapital Bank\" ASC",
    logoColor: "#d62828",
    type: "bank",
    established: 1874,
    branches: 114,
    atms: 420,
    website: "kapitalbank.az",
    phone: "*196",
    rating: 4.6,
    reviews: 2814,
    description: "Kapital Bank 1874-cü ildə Bakıda Əmanət Kassası kimi fəaliyyətə başlayıb — Azərbaycanın ən qədim maliyyə qurumdur. Hazırda 5 milyondan çox fiziki şəxsə və 22 000-dən artıq hüquqi şəxsə xidmət göstərir. 114 filial və 53 şöbə ilə ölkənin ən geniş bank şəbəkəsinə malikdir. Birbank rəqəmsal platforması tamamilə onlayn kredit, kart sifariş və ipoteka müraciətinə imkan verir.",
    swift: "AIBA AZ 2X",
    voen: "9900003611",
    correspondentAccount: "Mərkəzi Bank",
    address: "Bakı şəhəri, Füzuli küç. 71, AZ1014",
    logoUrl: "https://kapitalbank.az/assets/images/logo.svg"
  },
  {
    id: "abb",
    name: "ABB Bank",
    officialName: "\"Azərbaycan Beynəlxalq Bankı\" ASC",
    logoColor: "#003087",
    type: "bank",
    established: 1992,
    branches: 66,
    atms: 995,
    website: "abb-bank.az",
    phone: "*8000",
    rating: 4.4,
    reviews: 1992,
    description: "ABB (Azərbaycan Beynəlxalq Bankı) 1992-ci ildə yaradılmış, aktivlərinin həcminə görə Cənubi Qafqazın ən iri bankıdır. 66 filial, 13 şöbə, 995-dən çox ATM və 13 000-dən artıq POS-terminal ilə xidmət edir. 2.2 milyondan çox fərdi müştəri və 18 000 hüquqi şəxs ABB-nin müştərisidir. 'The Banker' 2023 və 'Euromoney' 2024 mükafatları — İlin Ən Yaxşı Bankı. Dövlət tərəfindən nəzarət edilir.",
    swift: "IBAZ AZ 2X",
    voen: "9900001811",
    correspondentAccount: "Mərkəzi Bank",
    address: "Bakı şəhəri, Nizami küç., 67, AZ1005",
    logoUrl: "https://abb-bank.az/img/logo.svg"
  },
  {
    id: "birbank",
    name: "Birbank",
    officialName: "Birbank (Kapital Bank ASC)",
    logoColor: "#1f1f1f",
    type: "bank",
    established: 2019,
    branches: 14,
    atms: 156,
    website: "birbank.az",
    phone: "*196",
    rating: 4.7,
    reviews: 3120,
    description: "Birbank Kapital Bank-ın 2019-cu ildə yaratdığı tam rəqəmsal bank platformasıdır. Filial olmadan, yalnız mobil tətbiq vasitəsilə kredit, kart, depozit xidmətlərini əhatə edir. 30 000 AZN-ə qədər kredit limiti, qonşulara pulsuz köçürmə, QR ödənişlərindən ikiqat ƏDV qaytarılması əsas üstünlükləri arasındadır. App Store və Google Play-da Azərbaycanın ən yüksək reytinqli maliyyə tətbiqidir.",
    swift: "N/A",
    voen: "N/A",
    correspondentAccount: "N/A",
    address: "Bakı şəhəri, Füzuli küç. 71, AZ1014",
    logoUrl: "N/A"
  },
  {
    id: "pasha",
    name: "PAŞA Bank",
    officialName: "\"PAŞA Bank\" ASC",
    logoColor: "#1c4f3b",
    type: "bank",
    established: 2007,
    branches: 8,
    atms: 40,
    website: "pashabank.az",
    phone: "(+994 12) 505-50-00",
    rating: 4.5,
    reviews: 1408,
    description: "PAŞA Bank 2007-ci ildə yaradılmış, kapital həcminə görə Azərbaycanın ən iri özəl bankıdır. 2025-ci il yarım illik göstəricisinə görə kapital 963 mln AZN, aktivlər 9,3 mlrd AZN-dir. Korporativ bankçılıq, investisiya bankçılığı və ticarətin maliyyələşdirilməsini əhatə edir. Gürcüstanda (2013) və Türkiyədə (2014) törəmə bankları fəaliyyət göstərir. Premium fərdi müştərilərə xüsusi lounge xidməti, səyahət sığortası və VIP paketlər təklif edir.",
    swift: "PASH AZ 22",
    voen: "1700685611",
    correspondentAccount: "Mərkəzi Bank",
    address: "Bakı şəhəri, Yusif Məmmədəliyev küç., 13, AZ1005",
    logoUrl: "N/A"
  },
  {
    id: "unibank",
    name: "Unibank",
    officialName: "\"Unibank Kommersiya Bankı\" ASC",
    logoColor: "#e63946",
    type: "bank",
    established: 1992,
    branches: 38,
    atms: 210,
    website: "unibank.az",
    phone: "(+994 12) 498-22-44",
    rating: 4.3,
    reviews: 1156,
    description: "Unibank 1992-ci ildə MBank adı ilə yaradılmış, 2002-ci ildə PROMTEXBANK ilə birləşərək hazırkı adını almışdır. 2021-ci ildə Azərbaycanda ilk 'mobile-only' neobank olan Leobank-ı təsis edib. 2009-cu ilədək Azərbaycan Premyer Liqasının baş sponsoru olub. Fərdi müştərilər üçün Visa kredit kartı, cashback proqramları və Leobank vasitəsilə tam rəqəmsal bank xidmətləri təklif edir.",
    swift: "UNIB AZ 22",
    voen: "1300067611",
    correspondentAccount: "Mərkəzi Bank",
    address: "Bakı şəhəri, Rəşid Behbudov küç., 55, AZ1014",
    logoUrl: "N/A"
  },
  {
    id: "rabita",
    name: "Rabitəbank",
    officialName: "\"Rabitəbank\" ASC",
    logoColor: "#0066b2",
    type: "bank",
    established: 1993,
    branches: 29,
    atms: 145,
    website: "rabitabank.com",
    phone: "133",
    rating: 4.2,
    reviews: 842,
    description: "Rabitəbank 1993-cü ildə yaradılmış universal bankdır. 31 illik fəaliyyəti ərzində Sumqayıt, Gəncə, Lənkəran, Şəki, Naxçıvan daxil olmaqla 17 regionda 29 xidmət şəbəkəsi qurub. EBRD, İslam İnkişaf Bankı, IFC, Western Union və SWIFT üzv. Ticarət, istehsal, kənd təsərrüfatı, nəqliyyat sektoru müştərilərinə korporativ kreditlər, akkreditiv və qarantiya xidmətləri göstərir.",
    swift: "RABI AZ 22",
    voen: "9900004511",
    correspondentAccount: "Mərkəzi Bank",
    address: "Bakı şəhəri, Şıxəli Qurbanov küç., 28, AZ1009",
    logoUrl: "N/A"
  },
  {
    id: "access",
    name: "AccessBank",
    officialName: "\"AccessBank\" QSC",
    logoColor: "#f5a623",
    type: "bank",
    established: 2002,
    branches: 32,
    atms: 80,
    website: "accessbank.az",
    phone: "(+994 12) 490 80 10",
    rating: 4.4,
    reviews: 1267,
    description: "AccessBank 2002-ci ildə Azərbaycan Mikromaliyyə Bankı (AMMB) kimi EBRD, IFC, KfW və Qara Dəniz Ticarət Bankının dəstəyi ilə yaradılıb; 2008-ci ildə AccessBank adını alıb. Kiçik və orta sahibkarlara, mikro kredit sektoruna yönəlmiş Avropa standartlı bank. 32 filial Bakı, Abşeron və regionlarda. 'Sizin Yerli Avropa Bankınız' sloqanı ilə tanınan AccessBank maliyyə inteqrasiyası sahəsində mükafatlar almışdır.",
    swift: "BSCA AZ 22",
    voen: "9900040411",
    correspondentAccount: "Mərkəzi Bank",
    address: "Bakı şəhəri, Tbilisi pr., 3, AZ1065",
    logoUrl: "N/A"
  },
  {
    id: "bank-of-baku",
    name: "Bank of Baku",
    officialName: "\"Bank of Baku\" ASC",
    logoColor: "#005baa",
    type: "bank",
    established: 1993,
    branches: 34,
    atms: 165,
    website: "bankofbaku.com",
    phone: "(+994 12) 447-00-55",
    rating: 4.1,
    reviews: 990,
    description: "Bank of Baku əvvəlcə 'Tuqay' adı altında fəaliyyət göstərmiş, sonradan hazırkı adını almış universal ticarət bankıdır. Atatürk prospekti 42, Bakıda baş ofis. Fərdi müştərilər üçün nağd pul kreditləri, avto kreditlər, debet və kredit kartları, onlayn bankçılıq xidmətləri göstərir. Bakı və regionlarda 34 filial şəbəkəsi ilə xidmət edir. SME (kiçik bizneslər) kredit xəttləri bankın əsas korporativ məhsullarından biridir.",
    swift: "BAKU AZ 22",
    voen: "1700016111",
    correspondentAccount: "Mərkəzi Bank",
    address: "Bakı şəhəri, Atatürk pr., 42, AZ1069",
    logoUrl: "N/A"
  },
  {
    id: "expressbank",
    name: "Expressbank",
    officialName: "\"Expressbank\" ASC",
    logoColor: "#7b2cbf",
    type: "bank",
    established: 1989,
    branches: 22,
    atms: 70,
    website: "expressbank.az",
    phone: "(+994 12) 404-40-04",
    rating: 4.0,
    reviews: 612,
    description: "Expressbank Azərbaycanda mövcud banklar içində ən köhnə kommersiya bankıdır — 1989-cu ildə Azərnəqliyyatbank adı ilə təsis edilmiş, 2010-cu ildə hazırkı adını almışdır. Fitch Ratings 2024-cü ilin oktyabrında bankın reytinqini B+ (stabil) səviyyəsinə yüksəldib. 3 500-dən artıq POS-terminal, 700 ExpressPay ödəniş terminalı şəbəkəsi var. Nağd pul kreditlərindən 70 000 AZN-ə qədər, 10,9%-dən başlayan illik faizlə təklif edir.",
    swift: "EXPB AZ 22",
    voen: "1500044811",
    correspondentAccount: "Mərkəzi Bank",
    address: "Bakı şəhəri, Yusif Vəzir Çəmənzəminli küç., 134C, AZ1052",
    logoUrl: "N/A"
  },
  {
    id: "yelo",
    name: "Yelo Bank",
    officialName: "\"Yelo Bank\" ASC",
    logoColor: "#2ec4b6",
    type: "bank",
    established: 2016,
    branches: 13,
    atms: 80,
    website: "yelo.az",
    phone: "*981",
    rating: 4.3,
    reviews: 745,
    description: "Yelo Bank 2016-cı ildə müasir rəqəmsal bank olaraq fəaliyyətə başlayıb. Bakıda baş ofis (Həsən bəy Zərdabi 81K), Salyan, Gəncə, Lənkəran, Bərdə daxil olmaqla 13 filial. Pərakəndə (retail) müştərilərə yönəlmiş: nağd kreditlər, debet kartlar, depozitlər, onlayn ödənişlər, biznes hesabları. Müasir mobil tətbiq üzərindən bütün xidmətlər əlçatan. 830 mln AZN-lik aktiv bazası ilə Azərbaycanın TOP-10 bankları sırasına daxildir.",
    swift: "NIKO AZ 22",
    voen: "1700147611",
    correspondentAccount: "Mərkəzi Bank",
    address: "Bakı şəhəri, Həsən bəy Zərdabi pr., 81k, AZ1012",
    logoUrl: "https://yelo.az/assets/images/yelo-logo.svg"
  },

  // ── BOKTs ─────────────────────────────────────────────
  {
    id: "embafinans",
    name: "Embafinans BOKT",
    officialName: "\"Embafinans\" QSC BOKT",
    logoColor: "#0a8754",
    type: "bokt",
    established: 2009,
    branches: 18,
    website: "embafinans.az",
    phone: "*8844",
    rating: 4.3,
    reviews: 612,
    description: "Embafinans BOKT 2009-cu ildən fəaliyyət göstərən bank olmayan kredit təşkilatıdır. Fərdi müştərilərə sürətli mikrokredit, nağd pul kreditləri və lombard xidmətləri göstərir. 18 filial şəbəkəsi ilə Bakı və regionlarda xidmət edir. Onlayn müraciət imkanı mövcuddur.",
    swift: "N/A",
    voen: "1402241611",
    correspondentAccount: "N/A",
    address: "Bakı şəhəri, Xətai ray., M.Xəlifov küç. 1A",
    logoUrl: "N/A"
  },
  {
    id: "finkomkredit",
    name: "Finkomkredit BOKT",
    officialName: "N/A",
    logoColor: "#1565c0",
    type: "bokt",
    established: 2011,
    branches: 10,
    website: "finkomkredit.az",
    phone: "*7755",
    rating: 4.1,
    reviews: 488,
    description: "Finkomkredit BOKT 2011-ci ildən fəaliyyət göstərən mikromaliyyə təşkilatıdır. Sənədsiz sürətli nağd kreditlər əsas məhsuludur. Bakı daxilində 10 xidmət nöqtəsi var. Kredit qərarı 15-30 dəqiqə ərzində verilir, minimal sənəd tələb olunur.",
    swift: "N/A",
    voen: "N/A",
    correspondentAccount: "N/A",
    address: "N/A",
    logoUrl: "N/A"
  },
  {
    id: "tezpara",
    name: "TezPara BOKT",
    officialName: "N/A",
    logoColor: "#e63946",
    type: "bokt",
    established: 2008,
    branches: 22,
    website: "tezpara.az",
    phone: "*7744",
    rating: 4.4,
    reviews: 904,
    description: "TezPara BOKT 2008-ci ildən fəaliyyət göstərən, sürətli mikrokredit sahəsinin tanınan adlarından biridir. '5 dəqiqədə kredit qərarı' sloqanı ilə bilinir. 22 filial şəbəkəsi, onlayn və mobil müraciət imkanı. Nağd pul kreditləri 100 AZN-dən 5 000 AZN-ə qədər, lombard xidmətləri isə avto girov üzrə 80 000 AZN-ə qədər.",
    swift: "N/A",
    voen: "N/A",
    correspondentAccount: "N/A",
    address: "N/A",
    logoUrl: "N/A"
  },
  {
    id: "manatpro",
    name: "ManatPro BOKT",
    officialName: "N/A",
    logoColor: "#7b2cbf",
    type: "bokt",
    established: 2015,
    branches: 8,
    website: "manatpro.az",
    phone: "*7733",
    rating: 4.0,
    reviews: 357,
    description: "ManatPro BOKT 2015-ci ildən fəaliyyət göstərən rəqəmsal fokuslu mikrokredit təşkilatıdır. Tam onlayn müraciət mümkündür — filiala getmədən kart hesabına kredit alınır. Minimum məbləğ 50 AZN-dən başlayır, qısamüddətli (6 ayadək) kredit üzrə ixtisaslaşıb.",
    swift: "N/A",
    voen: "N/A",
    correspondentAccount: "N/A",
    address: "N/A",
    logoUrl: "N/A"
  },
  {
    id: "vivacash",
    name: "VivaCash BOKT",
    officialName: "N/A",
    logoColor: "#f5a623",
    type: "bokt",
    established: 2012,
    branches: 14,
    website: "vivacash.az",
    phone: "*7722",
    rating: 4.2,
    reviews: 521,
    description: "VivaCash BOKT 2012-ci ildən fəaliyyət göstərir. Fərdi müştərilərə nağd pul mikrokreditləri, 14 filial vasitəsilə regional əhatə. Kredit müddəti 2-18 ay arasında, onlayn müraciət 24/7 rejimində mövcuddur. Pensiya yaşına çatmış vətəndaşlar üçün xüsusi şərtlər.",
    swift: "N/A",
    voen: "N/A",
    correspondentAccount: "N/A",
    address: "N/A",
    logoUrl: "N/A"
  },
  {
    id: "azerlombard",
    name: "Azərlombard BOKT",
    officialName: "N/A",
    logoColor: "#b8860b",
    type: "bokt",
    established: 2006,
    branches: 26,
    website: "azerlombard.az",
    phone: "*7711",
    rating: 4.5,
    reviews: 740,
    description: "Azərlombard BOKT 2006-cı ildən fəaliyyət göstərən lombard xidmətlərinin lideridir. Qızıl, gümüş, qiymətli daşlar, avto nəqliyyat vasitələri girova alınaraq kredit verilir. 26 filial ilə ölkənin ən geniş lombard şəbəkəsidir. Qiymətləndirmə 15 dəqiqə, kredit eyni gün. Faiz dərəcəsi aylıq 1,5%-dən başlayır — ən aşağı lombard faizi.",
    swift: "N/A",
    voen: "N/A",
    correspondentAccount: "N/A",
    address: "N/A",
    logoUrl: "N/A"
  }
];

export const blogPosts = [
  {
    id: "b1",
    slug: "en-serfeli-nagd-kredit-2026",
    title: "2026-cı ildə ən sərfəli nağd kredit necə seçilir?",
    excerpt: "Faiz dərəcəsi, APRC və gizli komissiyalar — bilməli olduğunuz hər şey.",
    category: "Kredit",
    readMin: 6,
    date: "12 Apr 2026",
    cover: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    body: `Nağd kredit seçərkən yalnız faiz dərəcəsinə baxmaq kifayət deyil. APRC (İllik Faiz Dərəcəsi Ekvivalenti) kreditin real dəyərini göstərir. Bu məqalədə banklar arasındakı fərqləri, gizli komissiyaları və ən sərfəli variantları müqayisə edirik.\n\nKreditin müddəti, aylıq ödəniş və ümumi ödəniləcək məbləğ arasındakı balansı tapmaq vacibdir. 2026-cı ildə bankların təklif etdiyi ən aşağı faiz dərəcələri və xüsusi kampaniyalar haqqında ətraflı məlumat əldə edin.`,
  },
  {
    id: "b2",
    slug: "manat-vs-valyuta-depozit",
    title: "Manat depozitləri vs valyuta depozitləri — hansı sərfəlidir?",
    excerpt: "Real gəlirlilik və risk balansı haqqında mütəxəssis baxışı.",
    category: "Depozit",
    readMin: 4,
    date: "08 Apr 2026",
    cover: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
    body: `Depozit yerləşdirərkən valyuta seçimi kritik əhəmiyyət daşıyır. Manat depozitləri adətən daha yüksək faiz dərəcəsi təklif edir, lakin inflyasiya riski mövcuddur.\n\nValyuta depozitləri isə aşağı faiz dərəcəsinə malik olsa da, məzənnə dəyişikliyindən qazanc əldə etmək imkanı yaradır. Bu yazıda hər iki variantın real gəlirliliyini, riskləri və optimallaşdırma yollarını araşdırırıq.`,
  },
  {
    id: "b3",
    slug: "dovlet-ipoteka-sertleri-2026",
    title: "Dövlət ipoteka şərtlərində yenilik: 2026 versiyası",
    excerpt: "İlkin ödəniş, faiz tavanı və yeni qaydalar tam icmal.",
    category: "İpoteka",
    readMin: 8,
    date: "01 Apr 2026",
    cover: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    body: `2026-cı ildə dövlət ipoteka proqramında mühüm dəyişikliklər baş verib. İlkin ödəniş faizi, maksimal kredit məbləği və faiz tavanı yenilənib.\n\nYeni qaydalar gənc ailələr üçün xüsusi güzəştlər nəzərdə tutur. Bu tam icmalda bütün dəyişiklikləri, müraciət prosesini və tələb olunan sənədləri ətraflı izah edirik.`,
  },
];

