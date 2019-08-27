const puppeteer = require('puppeteer');

async function scrape(url, tag, selectorInput) {
  // Launch Puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Go to target URL
  await page.goto(`${url}`, { waitUntil: 'networkidle2' });

  // Determine if user typed in ID or Class
  const name = selectorInput.split('=')[1];
  var selector;
  if (selectorInput.includes('id=')) {
    selector = `${tag}#${name}`;
  } else if (selectorInput.includes('class=')) {
    selector = `${tag}.${name}`;
  }

  // Wait for tag population
  await page.waitForSelector(`${selector}`);

  // Generate an array of Image tags
  const imgArr = await page.evaluate(() => {
    const imgNodes = document.querySelectorAll(`${selector}`);
    return Array.from(imgNodes).map(node => node.outerHTML);
  })

  await console.log('DONE!');

  // Close browser
  browser.close();

  return imgArr;
}

// scrape();
export default scrape;