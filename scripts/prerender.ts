import fs from 'fs';
import path from 'path';
import { generateSitemap } from './sitemap-generator';

const routes = [
  { path: '/', title: 'Pultap.az - Bütün maliyyə xidmətləri bir platformada', desc: 'Kreditlər, depozitlər və bank kartları üzrə ən sərfəli təklifləri müqayisə edin və onlayn müraciət edin.' },
  { path: '/kreditler', title: 'Bütün Kreditlər | Pultap.az', desc: 'Bütün bank və BOKT kreditlərini müqayisə edin və ən sərfəli variantı seçin.' },
  { path: '/kreditler/online-kredit', title: 'Onlayn Kreditlər | Pultap.az', desc: 'Dərhal rəsmiləşdirilən onlayn kredit təklifləri. Asan və sürətli müraciət.' },
  { path: '/kreditler/nagd-pul-krediti', title: 'Nağd Pul Kreditləri | Pultap.az', desc: 'Ən aşağı faizli nağd pul kreditləri. Bankların təkliflərini müqayisə edin.' },
  { path: '/kredit-kalkulyatoru', title: 'Kredit Kalkulyatoru | Pultap.az', desc: 'Aylıq ödənişləri və effektiv faiz dərəcələrini hesablamaq üçün universal kredit kalkulyatoru.' },
  { path: '/bokt-kredit', title: 'BOKT Kreditləri | Pultap.az', desc: 'Bank Olmayan Kredit Təşkilatlarının ən sərfəli kredit təklifləri.' },
  { path: '/bank-kartlari/kredit-kartlari', title: 'Kredit Kartları | Pultap.az', desc: 'Faizsiz, keşbekli və taksitli kredit kartlarını müqayisə edin.' },
  { path: '/depozit', title: 'Depozitlər | Pultap.az', desc: 'Ən yüksək gəlirli manat və xarici valyuta depozitləri.' },
  { path: '/ipoteka', title: 'İpoteka Kreditləri | Pultap.az', desc: 'Dövlət və daxili ipoteka kreditlərini müqayisə edin.' },
  { path: '/valyuta-kurslar', title: 'Valyuta Kursları | Pultap.az', desc: 'Bankların və Mərkəzi Bankın ən son valyuta kursları və konvertor.' },
  { path: '/banks', title: 'Banklar və BOKT-lar | Pultap.az', desc: 'Azərbaycanda fəaliyyət göstərən bütün banklar və Bank Olmayan Kredit Təşkilatları haqqında məlumat.' },
  { path: '/haqqimizda', title: 'Haqqımızda | Pultap.az', desc: 'Pultap.az maliyyə xidmətlərini asan və əlçatan etmək üçün yaradılmış platformadır.' },
  { path: '/elaqe', title: 'Əlaqə | Pultap.az', desc: 'Pultap.az komandası ilə əlaqə saxlayın.' },
  { path: '/mexfilik-siyaseti', title: 'Məxfilik Siyasəti | Pultap.az', desc: 'Pultap.az platformasında fərdi məlumatların qorunması və məxfilik siyasəti.' },
  { path: '/istifade-qaydalari', title: 'İstifadə Şərtləri | Pultap.az', desc: 'Platformadan istifadə qaydaları və hüquqi şərtlər.' },
  { path: '/kuki-siyaseti', title: 'Kuki Siyasəti | Pultap.az', desc: 'Pultap.az saytında kuki (cookie) fayllarından istifadə qaydaları.' }
];

async function generateStaticMeta() {
  const distDir = path.resolve(process.cwd(), 'dist');
  const indexHtmlPath = path.resolve(distDir, 'index.html');
  
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('dist/index.html not found! Please build the project first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

  for (const route of routes) {
    console.log(`Generating static HTML for ${route.path}...`);
    
    // Replace title and meta description
    const modifiedHtml = baseHtml
      .replace(/<title>(.*?)<\/title>/, `<title>${route.title}</title>`)
      .replace(/<meta name="description" content="(.*?)"/g, `<meta name="description" content="${route.desc}"`)
      .replace(/<meta property="og:title" content="(.*?)"/g, `<meta property="og:title" content="${route.title}"`)
      .replace(/<meta property="og:description" content="(.*?)"/g, `<meta property="og:description" content="${route.desc}"`);

    // Ensure the original structure is maintained while updating SEO for bots
    
    const routePath = route.path === '/' ? 'index.html' : `${route.path.substring(1)}/index.html`;
    const filePath = path.resolve(distDir, routePath);
    
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    fs.writeFileSync(filePath, modifiedHtml);
    console.log(`Saved ${routePath}`);
  }
  
  console.log('Generating sitemap...');
  generateSitemap();
  // Also copy sitemap to dist if it generated it in public
  const publicSitemap = path.resolve(process.cwd(), 'public/sitemap.xml');
  const distSitemap = path.resolve(process.cwd(), 'dist/sitemap.xml');
  if (fs.existsSync(publicSitemap)) {
    fs.copyFileSync(publicSitemap, distSitemap);
    console.log('Copied sitemap.xml to dist/');
  }

  console.log('Static meta prerendering complete!');
}

generateStaticMeta().catch(e => {
  console.error(e);
  process.exit(1);
});
