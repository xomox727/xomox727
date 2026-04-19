import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  const consoleLogs = [];
  page.on('console', msg => consoleLogs.push(msg.text()));
  
  await page.goto('https://xomox727.github.io/xomox727/', { waitUntil: 'networkidle0' });
  
  // check image sizes and sources
  const images = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img')).map(img => ({
      src: img.src,
      width: img.naturalWidth,
      height: img.naturalHeight,
      complete: img.complete
    }));
  });
  
  console.log('Console Logs:');
  console.log(consoleLogs);
  console.log('Images Rendered:');
  console.log(images.slice(0, 5)); // show first 5 images
  
  await browser.close();
})();
