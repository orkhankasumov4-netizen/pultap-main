export interface GlossaryTerm {
  id: string;
  termAz: string;
  termEn?: string;
  termRu?: string;
  definitionAz: string;
  definitionEn?: string;
  definitionRu?: string;
  category?: string;
}

export const glossaryData: GlossaryTerm[] = [
  {
    id: "1",
    termAz: "Akkreditiv",
    termEn: "Letter of Credit",
    termRu: "Аккредитив",
    definitionAz: "Bankın (emitentin) müştərinin (akkreditiv verənin) tapşırığı ilə və ya öz adından üçüncü şəxsə (benefisiara) müvafiq sənədlərin təqdim edilməsi şərti ilə ödəniş etmək öhdəliyidir.",
    definitionEn: "An obligation of a bank (issuer) to make a payment to a third party (beneficiary) on behalf of a customer (applicant) or on its own behalf, subject to the presentation of complying documents.",
    definitionRu: "Обязательство банка (эмитента) по поручению клиента (приказодателя) или от своего имени произвести платеж третьему лицу (бенефициару) при условии представления соответствующих документов.",
    category: "trade-finance"
  },
  {
    id: "2",
    termAz: "Aktivlər",
    termEn: "Assets",
    termRu: "Активы",
    definitionAz: "Fiziki və ya hüquqi şəxsə məxsus olan, dəyəri olan və gələcəkdə iqtisadi mənfəət gətirməsi gözlənilən resurslar.",
    definitionEn: "Resources owned by an individual or a legal entity that have value and are expected to provide future economic benefits.",
    definitionRu: "Ресурсы, принадлежащие физическому или юридическому лицу, имеющие стоимость и, как ожидается, приносящие будущие экономические выгоды.",
    category: "accounting"
  },
  {
    id: "3",
    termAz: "Banka hesabı",
    termEn: "Bank account",
    termRu: "Банковский счет",
    definitionAz: "Müştərinin pul vəsaitlərinin uçotunun aparılması, saxlanması və köçürülməsi üçün bank tərəfindən açılmış hesab.",
    definitionEn: "An account opened by a bank for the accounting, safekeeping, and transfer of a customer's funds.",
    definitionRu: "Счет, открытый банком для учета, хранения и перевода денежных средств клиента.",
    category: "retail-banking"
  },
  {
    id: "4",
    termAz: "Cari hesab",
    termEn: "Current account",
    termRu: "Текущий счет",
    definitionAz: "Fiziki və ya hüquqi şəxslərin gündəlik hesablaşmalarını aparmaq üçün istifadə etdiyi bank hesabı.",
    definitionEn: "A bank account used by individuals or legal entities for their daily settlements.",
    definitionRu: "Банковский счет, используемый физическими или юридическими лицами для проведения ежедневных расчетов.",
    category: "retail-banking"
  },
  {
    id: "5",
    termAz: "Depozit",
    termEn: "Deposit",
    termRu: "Депозит",
    definitionAz: "Faiz və ya digər gəlir əldə etmək məqsədilə bankda və ya digər maliyyə-kredit müəssisəsində saxlanılan pul vəsaiti və ya qiymətli kağızlar.",
    definitionEn: "Funds or securities kept in a bank or other financial institution for the purpose of earning interest or other income.",
    definitionRu: "Денежные средства или ценные бумаги, хранящиеся в банке или другом финансово-кредитном учреждении с целью получения процентов или иного дохода.",
    category: "savings"
  },
  {
    id: "6",
    termAz: "Elektron pul",
    termEn: "Electronic money",
    termRu: "Электронные деньги",
    definitionAz: "İstifadəçinin nağd və ya qeyri-nağd vəsaiti müqabilində emitent tərəfindən buraxılan, elektron daşıyıcılarda saxlanılan və ödəniş vasitəsi kimi qəbul edilən pul dəyəri.",
    definitionEn: "Monetary value issued by an issuer in exchange for the user's cash or non-cash funds, stored on an electronic device, and accepted as a means of payment.",
    definitionRu: "Денежная стоимость, выпущенная эмитентом в обмен на наличные или безналичные средства пользователя, хранящаяся на электронном носителе и принимаемая в качестве средства платежа.",
    category: "payments"
  },
  {
    id: "7",
    termAz: "Ekvayrinq",
    termEn: "Acquiring",
    termRu: "Эквайринг",
    definitionAz: "Ödəniş kartları vasitəsilə həyata keçirilən əməliyyatlar üzrə hesablaşmaların aparılması xidməti.",
    definitionEn: "The service of processing settlements for transactions made using payment cards.",
    definitionRu: "Услуга по проведению расчетов по операциям, совершаемым с использованием платежных карт.",
    category: "payments"
  },
  {
    id: "8",
    termAz: "İnflyasiya",
    termEn: "Inflation",
    termRu: "Инфляция",
    definitionAz: "Əmtəə və xidmətlərin qiymətlərinin ümumi səviyyəsinin davamlı olaraq artması və pulun alıcılıq qabiliyyətinin aşağı düşməsi prosesi.",
    definitionEn: "A continuous increase in the general price level of goods and services and a decline in the purchasing power of money.",
    definitionRu: "Процесс постоянного роста общего уровня цен на товары и услуги и снижения покупательной способности денег.",
    category: "macroeconomics"
  },
  {
    id: "9",
    termAz: "Kredit",
    termEn: "Credit / Loan",
    termRu: "Кредит",
    definitionAz: "Müəyyən müddətə, faizlə və qaytarılmaq şərti ilə verilən pul vəsaiti.",
    definitionEn: "Funds provided for a specified period, with interest and subject to repayment.",
    definitionRu: "Денежные средства, предоставляемые на определенный срок, под проценты и на условиях возвратности.",
    category: "lending"
  },
  {
    id: "10",
    termAz: "Kredit riski",
    termEn: "Credit risk",
    termRu: "Кредитный риск",
    definitionAz: "Borcalanın və ya kontragentin müqavilə öhdəliklərini vaxtında və ya tam şəkildə yerinə yetirə bilməməsi nəticəsində bankın itkilərə məruz qalma ehtimalı.",
    definitionEn: "The possibility of a bank incurring losses as a result of a borrower's or counterparty's inability to fulfill contractual obligations on time or in full.",
    definitionRu: "Вероятность того, что банк понесет убытки в результате неспособности заемщика или контрагента своевременно или в полном объеме выполнить договорные обязательства.",
    category: "risk-management"
  },
  {
    id: "11",
    termAz: "Lombard krediti",
    termEn: "Lombard loan",
    termRu: "Ломбардный кредит",
    definitionAz: "Tez realizə oluna bilən girov (məsələn, qızıl, qiymətli kağızlar) təminatı ilə verilən qısamüddətli kredit.",
    definitionEn: "A short-term loan granted against the security of highly liquid collateral (e.g., gold, securities).",
    definitionRu: "Краткосрочный кредит, выдаваемый под залог легкореализуемого обеспечения (например, золота, ценных бумаг).",
    category: "lending"
  },
  {
    id: "12",
    termAz: "Marja",
    termEn: "Margin",
    termRu: "Маржа",
    definitionAz: "Maliyyə, ticarət və ya bank əməliyyatlarında məhsulun və ya xidmətin alış (cəlb edilmə) və satış (yerləşdirilmə) qiymətləri, eləcə də faiz dərəcələri arasındakı fərq.",
    definitionEn: "The difference between the purchase (borrowing) and sale (lending) prices or interest rates of a product or service in financial, commercial, or banking operations.",
    definitionRu: "Разница между ценами покупки (привлечения) и продажи (размещения) или процентными ставками продукта или услуги в финансовых, коммерческих или банковских операциях.",
    category: "accounting"
  },
  {
    id: "13",
    termAz: "Pul kütləsi",
    termEn: "Money supply",
    termRu: "Денежная масса",
    definitionAz: "Müəyyən tarixə ölkə iqtisadiyyatında tədavüldə olan nağd pulun və bank hesablarındakı qeyri-nağd vəsaitlərin cəmi.",
    definitionEn: "The total amount of cash in circulation and non-cash funds in bank accounts in an economy as of a specific date.",
    definitionRu: "Общая сумма наличных денег в обращении и безналичных средств на банковских счетах в экономике страны на определенную дату.",
    category: "macroeconomics"
  },
  {
    id: "14",
    termAz: "Rerinanslaşdırma dərəcəsi",
    termEn: "Refinancing rate",
    termRu: "Ставка рефинансирования",
    definitionAz: "Mərkəzi Bankın kommersiya banklarına verdiyi kreditlər üzrə müəyyən etdiyi faiz dərəcəsi.",
    definitionEn: "The interest rate set by the Central Bank on loans provided to commercial banks.",
    definitionRu: "Процентная ставка, устанавливаемая Центральным банком по кредитам, предоставляемым коммерческим банкам.",
    category: "macroeconomics"
  },
  {
    id: "15",
    termAz: "Swap əməliyyatı",
    termEn: "Swap operation",
    termRu: "Операция своп",
    definitionAz: "Müxtəlif valyutaların, faiz dərəcələrinin və ya digər maliyyə alətlərinin müəyyən müddətə dəyişdirilməsi və gələcəkdə əvvəlcədən razılaşdırılmış şərtlərlə geri qaytarılmasını nəzərdə tutan müqavilə.",
    definitionEn: "An agreement involving the exchange of different currencies, interest rates, or other financial instruments for a specified period, with an obligation to reverse the exchange in the future under pre-agreed conditions.",
    definitionRu: "Соглашение, предусматривающее обмен различными валютами, процентными ставками или иными финансовыми инструментами на определенный срок с обязательством обратного обмена в будущем на заранее согласованных условиях.",
    category: "financial-markets"
  },
  {
    id: "16",
    termAz: "Təminat",
    termEn: "Collateral",
    termRu: "Обеспечение",
    definitionAz: "Borcalanın kredit öhdəliyini yerinə yetirə bilmədiyi təqdirdə bankın itkilərini ödəmək məqsədilə girov qoyulan əmlak və ya digər aktivlər.",
    definitionEn: "Property or other assets pledged as security to cover the bank's losses in case the borrower fails to fulfill their loan obligation.",
    definitionRu: "Имущество или иные активы, передаваемые в залог с целью покрытия убытков банка в случае невыполнения заемщиком своих кредитных обязательств.",
    category: "lending"
  },
  {
    id: "17",
    termAz: "Valyuta məzənnəsi",
    termEn: "Exchange rate",
    termRu: "Валютный курс",
    definitionAz: "Bir ölkənin pul vahidinin digər ölkənin pul vahidinə nisbətdə ifadə olunmuş qiyməti.",
    definitionEn: "The price of one country's currency expressed in terms of another country's currency.",
    definitionRu: "Цена денежной единицы одной страны, выраженная в денежной единице другой страны.",
    category: "financial-markets"
  }
];

export const alphabetsAz = ["A", "B", "C", "Ç", "D", "E", "Ə", "F", "G", "Ğ", "H", "X", "İ", "I", "J", "K", "Q", "L", "M", "N", "O", "Ö", "P", "R", "S", "Ş", "T", "U", "Ü", "V", "Y", "Z"];
