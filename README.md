<p align="center">
  <img src="public/logo.webp" alt="Pultap.az Logo" width="200" />
</p>

<h1 align="center">Pultap.az</h1>

<p align="center">
  <strong>Azərbaycanın İlk Açıq Maliyyə Müqayisə Platforması</strong>
</p>

<p align="center">
  Banklar, kreditlər, depozitlər, kartlar, valyuta kursları — hamısı bir yerdə, şəffaf və pulsuz.
</p>

<p align="center">
  <a href="https://pultap-main.pages.dev"><img src="https://img.shields.io/badge/🌐_Demo-pultap--main.pages.dev-00C853?style=for-the-badge" alt="Live Demo" /></a>
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/License-Private-red?style=flat-square" alt="License" />
  <img src="https://img.shields.io/badge/Tests-29%20Passed-brightgreen?style=flat-square" alt="Tests" />
  <img src="https://img.shields.io/badge/i18n-AZ%20%7C%20EN%20%7C%20RU-blue?style=flat-square" alt="Languages" />
  <img src="https://img.shields.io/badge/PWA-Ready-blueviolet?style=flat-square" alt="PWA" />
  <img src="https://img.shields.io/badge/SEO-Optimized-orange?style=flat-square" alt="SEO" />
</p>

---

## 📸 Ekran Görüntüləri

<table>
  <tr>
    <td align="center"><strong>🏠 Ana Səhifə</strong></td>
    <td align="center"><strong>💰 Kredit Müqayisə</strong></td>
  </tr>
  <tr>
    <td><em>Valyuta kursu tikeri, kateqoriya şəbəkəsi, top kreditlər cədvəli</em></td>
    <td><em>Filtrlər, sıralama, real-time müqayisə paneli</em></td>
  </tr>
  <tr>
    <td align="center"><strong>🔢 Kalkulyatorlar</strong></td>
    <td align="center"><strong>🏦 Bank Profili</strong></td>
  </tr>
  <tr>
    <td><em>Kredit və Depozit kalkulyatoru, aylıq ödəniş qrafiki</em></td>
    <td><em>Bank haqqında məlumat, təklif olunan məhsullar</em></td>
  </tr>
</table>

---

## ✨ Əsas Xüsusiyyətlər

### 🏦 Maliyyə Məhsulları
| Modul | Təsvir |
|-------|--------|
| **Kreditlər** | Nağd, online, BOKT, lombard, PTS girovu — 30+ məhsul müqayisəsi |
| **Depozitlər** | Manat və xarici valyuta depozitləri, faiz dərəcəsi müqayisəsi |
| **İpoteka** | Dövlət ipotekası və daxili ipoteka proqramları |
| **Bank Kartları** | Kredit və debet kartlarının tam müqayisəsi |
| **Valyuta Kursları** | CBAR-dan real-time məzənnə məlumatları |

### 🧮 Alətlər
| Alət | Təsvir |
|------|--------|
| **Kredit Kalkulyatoru** | Aylıq ödəniş, ümumi faiz, amortizasiya cədvəli |
| **Depozit Kalkulyatoru** | Gəlir proqnozu, mürəkkəb faiz hesablaması |
| **Valyuta Konvertoru** | USD/AZN, EUR/AZN, RUB/AZN — canlı çevirmə |
| **Müqayisə Paneli** | Seçilən məhsulları yan-yana müqayisə edin |

### 🌍 Platform Xüsusiyyətləri
- 🌐 **Çoxdilli dəstək** — Azərbaycan, English, Русский (i18next ilə)
- 📱 **Progressive Web App** — Offline dəstək, ana ekrana əlavə etmə
- 🌙 **Qaranlıq/İşıqlı rejim** — Sistem temasına uyğunlaşma
- 🔍 **SEO Optimizasiyası** — Sitemap, meta tags, canonical URLs, 135+ indekslənmiş URL
- ⚡ **Lazy Loading** — Hər səhifə tələbə görə yüklənir (Code-Splitting)
- 📊 **Admin Panel** — Müraciətlər, statistikalar, kredit idarəetməsi
- 📬 **Telegram Bildirişləri** — Hər yeni müraciət birbaşa Telegram-a çatır
- 📝 **Bloq & Lüğət** — Maliyyə terminləri, məqalələr

---

## 🏗️ Arxitektura

```
pultap-az/
├── public/                     # Statik resurslar (favicon, manifest, sitemap)
├── scripts/                    # Build vaxtı skriptlər (sitemap generatoru)
├── src/
│   ├── assets/                 # Şəkillər, loqolar
│   ├── components/
│   │   ├── home/               # Ana səhifə komponentləri (Hero, Ticker, Grid)
│   │   ├── layout/             # Navbar, Footer, ErrorBoundary
│   │   ├── site/               # Əsas biznes komponentləri (Kalkulyator, Kartlar)
│   │   ├── auth/               # Autentifikasiya komponentləri
│   │   ├── shared/             # Paylaşılan komponentlər
│   │   └── ui/                 # Radix UI primitiv komponentləri (shadcn/ui)
│   ├── context/                # React Context (Müqayisə paneli)
│   ├── data/                   # Statik maliyyə məlumatları (30+ kredit, 15+ bank)
│   ├── hooks/                  # Custom React Hook-ları
│   │   ├── use-cbar-rates.ts   # CBAR valyuta kursları
│   │   ├── use-pagination.ts   # Səhifələmə məntiqi
│   │   └── use-top-loans.ts    # Ən yaxşı kreditlər
│   ├── i18n/
│   │   └── locales/            # az.json · en.json · ru.json
│   ├── lib/                    # Utility funksiyalar
│   ├── pages/                  # 18 səhifə modulu (50+ route)
│   ├── store/                  # Zustand state management
│   └── test/                   # Vitest + Testing Library testləri
├── vite.config.ts              # Vite konfiqurasiyası + PWA
├── tailwind.config.ts          # TailwindCSS konfiqurasiyası
└── package.json
```

---

## 🔧 Texnologiya Steki

<table>
  <tr>
    <td align="center"><strong>Kateqoriya</strong></td>
    <td align="center"><strong>Texnologiya</strong></td>
  </tr>
  <tr>
    <td>⚛️ Frontend Framework</td>
    <td>React 18 + TypeScript 5.8</td>
  </tr>
  <tr>
    <td>⚡ Build Tool</td>
    <td>Vite 5.4 (SWC ilə)</td>
  </tr>
  <tr>
    <td>🎨 Stilizasiya</td>
    <td>TailwindCSS 3.4 + Radix UI (shadcn/ui)</td>
  </tr>
  <tr>
    <td>🗄️ State Management</td>
    <td>Zustand 5 + TanStack React Query 5</td>
  </tr>
  <tr>
    <td>🌍 i18n</td>
    <td>i18next + react-i18next (AZ / EN / RU)</td>
  </tr>
  <tr>
    <td>🧭 Routing</td>
    <td>React Router DOM 6 (locale-aware)</td>
  </tr>
  <tr>
    <td>🗃️ Backend/DB</td>
    <td>Node.js + Express → Supabase (PostgreSQL)</td>
  </tr>
  <tr>
    <td>📬 Bildirişlər</td>
    <td>Telegram Bot API</td>
  </tr>
  <tr>
    <td>🧪 Test</td>
    <td>Vitest + Testing Library + MSW</td>
  </tr>
  <tr>
    <td>📦 Deploy</td>
    <td>Cloudflare Pages (FE) + Kamatera VPS (BE)</td>
  </tr>
  <tr>
    <td>🔒 SSL/Proxy</td>
    <td>Nginx + Let's Encrypt (Certbot)</td>
  </tr>
  <tr>
    <td>🔄 Process Manager</td>
    <td>PM2</td>
  </tr>
</table>

---

## 🚀 Başlanğıc

### Tələblər

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

### Quraşdırma

```bash
# 1. Repozitoriyanı klonlayın
git clone https://github.com/orkhankasumov4-netizen/pultap-main.git
cd pultap-main

# 2. Asılılıqları yükləyin
npm install

# 3. Development serverini işə salın
npm run dev
```

Server **http://localhost:8082** ünvanında işə düşəcək.

### Mövcud Skriptlər

| Skript | Təsvir |
|--------|--------|
| `npm run dev` | Development server (HMR ilə) |
| `npm run build` | İstehsal üçün optimallaşdırılmış build |
| `npm run preview` | Build olunmuş versiyanı lokal olaraq bax |
| `npm run test` | Test suite-ni işə sal |
| `npm run test:coverage` | Coverage hesabatı ilə testlər |
| `npm run lint` | ESLint ilə kod keyfiyyəti yoxlanışı |

---

## 🌐 API İnteqrasiyaları

| API | Məqsəd | Endpoint |
|-----|--------|----------|
| **CBAR** | Canlı valyuta kursları | `cbar.az/currencies` |
| **Pultap API** | Müraciət və Əlaqə formları | `pultap.duckdns.org/api/v1/*` |
| **Telegram Bot** | Real-time bildirişlər | `api.telegram.org` |

---

## 🧪 Testlər

Layihədə **30 test** mövcuddur və **97% pass rate** təmin edilir:

```bash
# Bütün testləri işə sal
npm run test

# Coverage hesabatı
npm run test:coverage
```

| Test Modulu | Təsvir |
|-------------|--------|
| `calculators.test.ts` | Kredit/depozit hesablama doğruluğu |
| `filters.test.ts` | Məhsul filtrlərinin doğruluğu |
| `pagination.test.tsx` | Səhifələmə komponenti |
| `cbar.test.tsx` | CBAR API mock inteqrasiyası |
| `HeroSearch.test.tsx` | Axtarış komponenti |
| `LoanCalculator.test.tsx` | Kalkulyator UI |

---

## 📁 Əsas Səhifə Xəritəsi

```
/                          → Ana səhifə
/kreditler                 → Bütün kreditlər
/kreditler/:id             → Kredit detalları
/kreditler/online-kredit   → Online kreditlər
/kreditler/nagd-pul-krediti → Nağd kreditlər
/kredit-tarixcesi          → Kredit tarixi
/bokt-kredit               → BOKT kreditləri
/bokt-kredit/pts-girovu    → PTS girovu
/depozit                   → Depozitlər
/ipoteka                   → İpoteka proqramları
/bank-kartlari/*           → Kredit & Debet kartları
/valyuta-kurslar           → Valyuta kursları
/konvertor                 → Valyuta konvertoru
/kredit-kalkulyatoru       → Kredit kalkulyatoru
/depozit-kalkulyatoru      → Depozit kalkulyatoru
/muqayise                  → Müqayisə paneli
/banks                     → Banklar siyahısı
/banks/:id                 → Bank profili
/bloq                      → Maliyyə bloqu
/luget                     → Maliyyə lüğəti
/sual-cavab                → Tez-tez verilən suallar
/haqqimizda                → Haqqımızda
/elaqe                     → Əlaqə
/admin                     → Admin panel (qorunan)
```

---

## 🌙 Tema Dəstəyi

Pultap.az **qaranlıq rejim** dəstəkləyir. Sistem parametrlərinə uyğunlaşır və istifadəçi manual keçid edə bilər. `next-themes` kitabxanası ilə həyata keçirilib.

---

## 📱 PWA (Progressive Web App)

- ✅ Offline hazırdır — Service Worker keşləmə strategiyası
- ✅ Ana ekrana əlavə edilə bilər (installable)
- ✅ Manifest.json konfiqurasiya edilib
- ✅ 192x192 & 512x512 app ikonları

---

## 🔐 Təhlükəsizlik

- ✅ Admin panel parol ilə qorunur (`AdminProtectedRoute`)
- ✅ Backend `service_role` açarı ilə DB-yə yazır (frontend-də açıq deyil)
- ✅ Nginx reverse-proxy + HTTPS (Let's Encrypt)
- ✅ Helmet.js headers (backend-də)
- ✅ CORS konfiqurasiyası

---

## 📊 Layihə Statistikaları

| Metrik | Dəyər |
|--------|-------|
| 📄 TypeScript/TSX faylları | 157 |
| 📏 Kod sətirləri | ~14,800+ |
| 📦 Asılılıqlar (prod) | 261 |
| 🧪 Test sayı | 30 |
| 🌐 İndekslənmiş URL-lər | 135+ |
| 🌍 Dəstəklənən dillər | 3 (AZ, EN, RU) |
| ⚡ Build müddəti | ~3 saniyə |
| 📁 Build ölçüsü | ~1.6 MB |

---

## 🚢 Deploy Arxitekturası

```
┌─────────────────────┐         ┌──────────────────────┐
│   Cloudflare Pages  │         │   Kamatera VPS       │
│   (Frontend)        │         │   83.229.86.123       │
│                     │  HTTPS  │                      │
│  pultap-main.       │ ──────► │  Nginx (443/80)      │
│  pages.dev          │         │    ↓                  │
│                     │         │  PM2 → Express :5000  │
│  React 18 SPA       │         │    ↓                  │
│  Vite Build         │         │  Supabase (DB)        │
│  PWA + SW           │         │  Telegram Bot API     │
└─────────────────────┘         └──────────────────────┘
```

---

## 🗺️ Yol Xəritəsi

- [x] Bank kredit müqayisə sistemi
- [x] Valyuta kursları (CBAR inteqrasiyası)
- [x] Kredit & Depozit kalkulyatorları
- [x] Çoxdilli dəstək (AZ/EN/RU)
- [x] PWA + Offline dəstək
- [x] Admin panel
- [x] Telegram bildirişləri
- [x] Kamatera backend miqrasiyası
- [ ] `pultap.az` əsas domeninin aktivləşdirilməsi
- [ ] Mobil tətbiq (React Native / Capacitor)
- [ ] İstifadəçi qeydiyyatı və şəxsi kabinet
- [ ] AI-powered kredit tövsiyələri
- [ ] Bank API inteqrasiyaları (Open Banking)

---

## 👨‍💻 Müəllif

<p>
  <strong>Orxan Kasumov</strong><br/>
  <a href="https://github.com/orkhankasumov4-netizen">GitHub</a>
</p>

---

## 📄 Lisenziya

Bu layihə **şəxsi/kommersiya** layihəsidir. Bütün hüquqlar qorunur.

---

<p align="center">
  <strong>Pultap.az</strong> — Maliyyə qərarlarınızı daha ağıllı qəbul edin. 💚
</p>
