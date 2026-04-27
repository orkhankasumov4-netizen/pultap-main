import fs from 'fs';

const langs = ['az', 'en', 'ru'];
const cookieData = {
  az: {
    title: "Kuki Siyasəti",
    lastUpdated: "Son yenilənmə tarixi: 28 Aprel 2026",
    content: {
      p1: "Kuki (Cookie) nədir?",
      p2: "Kukilər (və ya Cookies) vebsaytımızı ziyarət etdiyiniz zaman brauzerinizə və ya cihazınıza yüklənən kiçik mətn fayllarıdır. Onlar saytın daha düzgün işləməsinə, sizin üstünlüklərinizi xatırlamağa və istifadəçi təcrübənizi yaxşılaşdırmağa kömək edir.",
      p3: "Hansı növ kukilərdən istifadə edirik?",
      p4: "1. Zəruri Kukilər: Vebsaytın əsas funksiyalarının (məsələn, təhlükəsizlik, şəbəkə idarəetməsi) işləməsi üçün vacibdir. Bu kukiləri söndürmək saytın bəzi hissələrinin işləməməsinə səbəb ola bilər.",
      p5: "2. Analitik və Performans Kukiləri: Saytımızın necə istifadə edildiyini anlamaq və performansı yaxşılaşdırmaq üçün istifadə olunur (məsələn, Google Analytics).",
      p6: "3. Funksional Kukilər: Dil seçimi və ya bölgə kimi fərdi seçimlərinizi yadda saxlamaq üçün istifadə olunur.",
      p7: "4. Marketinq və Reklam Kukiləri: Sizə daha uyğun reklamlar göstərmək və reklam kampaniyalarımızın effektivliyini ölçmək üçün istifadə olunur.",
      p8: "Kukiləri necə idarə etmək olar?",
      p9: "Əksər veb brauzerlər kukiləri avtomatik olaraq qəbul edir, lakin siz brauzerinizin parametrlərini dəyişdirərək kukiləri bloklaya və ya silə bilərsiniz. Nəzərə alın ki, kukiləri bloklamaq saytımızın bəzi funksiyalarından tam istifadə etməyinizə mane ola bilər."
    }
  },
  en: {
    title: "Cookie Policy",
    lastUpdated: "Last updated: April 28, 2026",
    content: {
      p1: "What are Cookies?",
      p2: "Cookies are small text files downloaded to your browser or device when you visit our website. They help the site function properly, remember your preferences, and improve your user experience.",
      p3: "What types of cookies do we use?",
      p4: "1. Essential Cookies: Crucial for the basic functions of the website (e.g., security, network management). Disabling these may cause some parts of the site to not function properly.",
      p5: "2. Analytics and Performance Cookies: Used to understand how our site is used and to improve performance (e.g., Google Analytics).",
      p6: "3. Functional Cookies: Used to remember your personal preferences, such as language choice or region.",
      p7: "4. Marketing and Advertising Cookies: Used to show you more relevant advertisements and measure the effectiveness of our advertising campaigns.",
      p8: "How to manage cookies?",
      p9: "Most web browsers automatically accept cookies, but you can block or delete them by changing your browser settings. Please note that blocking cookies may prevent you from fully using some features of our site."
    }
  },
  ru: {
    title: "Политика использования файлов cookie",
    lastUpdated: "Последнее обновление: 28 апреля 2026 г.",
    content: {
      p1: "Что такое файлы cookie?",
      p2: "Файлы cookie — это небольшие текстовые файлы, которые загружаются в ваш браузер или на устройство при посещении нашего веб-сайта. Они помогают сайту работать должным образом, запоминать ваши предпочтения и улучшать ваш пользовательский опыт.",
      p3: "Какие типы файлов cookie мы используем?",
      p4: "1. Основные файлы cookie: Необходимы для базовых функций веб-сайта (например, безопасность, управление сетью). Отключение этих файлов может привести к тому, что некоторые части сайта перестанут работать должным образом.",
      p5: "2. Аналитические и эксплуатационные файлы cookie: Используются для понимания того, как используется наш сайт, и для улучшения его работы (например, Google Analytics).",
      p6: "3. Функциональные файлы cookie: Используются для запоминания ваших личных предпочтений, таких как выбор языка или региона.",
      p7: "4. Маркетинговые и рекламные файлы cookie: Используются для показа более релевантной рекламы и измерения эффективности наших рекламных кампаний.",
      p8: "Как управлять файлами cookie?",
      p9: "Большинство веб-браузеров автоматически принимают файлы cookie, но вы можете заблокировать или удалить их, изменив настройки браузера. Обратите внимание, что блокировка файлов cookie может помешать вам в полной мере использовать некоторые функции нашего сайта."
    }
  }
};

langs.forEach(lang => {
  const path = `src/i18n/locales/${lang}.json`;
  if (fs.existsSync(path)) {
    const data = JSON.parse(fs.readFileSync(path, 'utf8'));
    data.cookiePolicy = cookieData[lang];
    fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
    console.log(`Updated ${lang}.json`);
  }
});
