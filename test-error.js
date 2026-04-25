import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('pageerror', err => {
    console.error('Page error:', err);
  });
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.error('Console error:', msg.text());
    }
  });

  await page.goto('http://localhost:8082/az/bokt-kredit/pts-girovu');
  await page.waitForSelector('a[href="/az/bokt-kredit"]');
  console.log('Clicking link...');
  await page.click('a[href="/az/bokt-kredit"]');
  await page.waitForTimeout(2000);
  
  await browser.close();
})();
