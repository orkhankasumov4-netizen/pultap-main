import puppeteer from 'puppeteer';

// Bu script bankların rəsmi saytına daxil olub kredit faizlərini oxumaq üçün bir bot (scraper) nümunəsidir.
// İşlətmək üçün terminalda bu paketləri yükləmək lazımdır:
// npm install puppeteer

async function scrapeBanks() {
  console.log("🤖 Avtomatlaşdırılmış Bot işə düşdü...\n");
  
  // Brauzeri arxa planda (görünmədən) açırıq
  const browser = await puppeteer.launch({ 
    headless: true, // Ekranda brauzer açılmasını istəmirsinizsə true edin
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  try {
    // ----------------------------------------------------
    // NÜMUNƏ 1: Kapital Bank Gündəlik Tələbat Krediti
    // ----------------------------------------------------
    console.log("⏳ Kapital Bankın saytından məlumat çəkilir...");
    await page.goto('https://kapitalbank.az/loans/cash-loan', { waitUntil: 'networkidle2' });

    // Saytın içindəki DOM elementlərindən faizi çıxarırıq
    // Qeyd: Bankların sayt strukturu dəyişə bilər deyə, real proyektlərdə bu selectorlar tez-tez güncəllənir.
    const kapitalRate = await page.evaluate(() => {
      // Mətndə faizi tapmaq üçün sadə axtarış (Saytda "10.9%-dən başlayaraq" kimi yazılır)
      const textMatches = document.body.innerText.match(/(\d+(\.\d+)?)%/);
      return textMatches ? textMatches[1] : null; // Sadəcə rəqəmi qaytarır
    });
    
    console.log(`✅ Kapital Bank: ${kapitalRate}%`);

    // ----------------------------------------------------
    // NÜMUNƏ 2: ABB (Beynəlxalq Bank) Nağd Kredit
    // ----------------------------------------------------
    console.log("\n⏳ ABB Bankın saytından məlumat çəkilir...");
    await page.goto('https://abb-bank.az/az/ferdi/kreditler/nagd-pul-krediti', { waitUntil: 'networkidle2' });

    const abbRate = await page.evaluate(() => {
      const textMatches = document.body.innerText.match(/(\d+(\.\d+)?)%/);
      return textMatches ? textMatches[1] : null;
    });

    console.log(`✅ ABB Bank: ${abbRate}%`);

    // ----------------------------------------------------
    // Nəticələrin Bazaya Göndərilməsi Simulyasiyası
    // ----------------------------------------------------
    console.log("\n🔄 Məlumatlar nizamlanır və bazaya (Database) göndərilir...");
    
    const dbUpdatePayload = [
      { bank: "kapital", type: "nağd", rate: parseFloat(kapitalRate || "0") },
      { bank: "abb", type: "nağd", rate: parseFloat(abbRate || "0") }
    ];

    console.log("💾 Data bazasına yazılacaq məlumat: ", JSON.stringify(dbUpdatePayload, null, 2));
    console.log("\n🎉 Əməliyyat uğurla bitdi! Sizin saytınız indi ən son faizləri göstərəcək.");

  } catch (error) {
    console.error("❌ Xəta baş verdi:", error);
  } finally {
    await browser.close();
  }
}

scrapeBanks();
