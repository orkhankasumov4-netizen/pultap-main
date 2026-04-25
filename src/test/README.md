# Pultap.az Test Dokumentasiyası

Bu layihədə frontend testləri üçün **Vitest**, **React Testing Library** (RTL) və API mockinq üçün **Mock Service Worker (MSW)** istifadə olunur.

## 🚀 Testləri İşə Salmaq

Aşağıdakı scriptlər vasitəsilə testləri idarə edə bilərsiniz:

- `npm test` - Testləri watch rejimində (fayl dəyişdikcə avtomatik yenilənən) işə salır.
- `npm run test:ui` - Vitest UI panelini brauzerdə açır.
- `npm run test:coverage` - Bütün testləri işə salır və sonunda *Coverage Report* (kodun əhatə olunma faizi) verir.
- `npm run test:ci` - CI/CD mühitləri üçün testləri bir dəfə işlədir və dayandırır.

## 📁 Test Fayl Strukturu

Test faylları adətən test edilən faylla eyni yerdə və ya `src/test` qovluğunda toplanır. Adlandırma standartı: `*.test.ts` və ya `*.test.tsx`.

- `src/test/setup.ts` — Test mühitinin tənzimlənməsi (jest-dom, matchMedia mock, MSW serverin işə salınması).
- `src/test/mocks/handlers.ts` — MSW üçün fake API cavabları (məs: CBAR xml).

## ✍️ Yeni Test Necə Yazılır?

1. **Komponent Testi (UI Testi)**:
   Yeni bir komponent yazdıqda onun `render` olduğunu və içindəki mətnin/elementin göründüyünü yoxlamaq üçün `@testing-library/react`-dən istifadə edin.
   ```tsx
   import { render, screen } from "@testing-library/react";
   import { it, expect } from "vitest";
   import { MyComponent } from "./MyComponent";

   it("renders properly", () => {
     render(<MyComponent />);
     expect(screen.getByText("Hello")).toBeInTheDocument();
   });
   ```

2. **Məntiq Testi (Logic/Functions)**:
   Sadə Javascript/Typescript funksiyalarının düzgün cavab verdiyini yoxlayın.
   ```ts
   import { expect, it } from "vitest";
   import { sum } from "./math";

   it("adds 1 + 2 to equal 3", () => {
     expect(sum(1, 2)).toBe(3);
   });
   ```

## 📊 Coverage Report Necə Baxılır?

`npm run test:coverage` əmrini işə saldıqdan sonra terminalda cədvəl şəklində faizlər görünəcək. Həmçinin layihənin kök qovluğunda `coverage/` adlı yeni bir qovluq yaranacaq. Həmin qovluqdakı `index.html` faylını brauzerdə açaraq (məs: `open coverage/index.html` macOS-da) hansı sətirlərin test edilib-edilmədiyini qrafik şəkildə görə bilərsiniz. Hədəf minimum 80%-dir.
