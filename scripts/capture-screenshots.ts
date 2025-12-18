import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

const WEBSITE_URL = 'https://demo.agilitycms.com/';
const SCREENSHOT_DIR = path.join(process.cwd(), 'docs/training-guide/screenshots');

// Ensure screenshot directory exists
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function captureScreenshots() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();

  const screenshots = [
    { url: WEBSITE_URL, name: 'homepage.png', description: 'Homepage' },
    { url: `${WEBSITE_URL}blog`, name: 'blog-listing.png', description: 'Blog listing page' },
    { url: `${WEBSITE_URL}about`, name: 'about-page.png', description: 'About page' },
  ];

  console.log(`Capturing ${screenshots.length} screenshots...`);

  for (const screenshot of screenshots) {
    try {
      console.log(`Capturing: ${screenshot.description}...`);
      await page.goto(screenshot.url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000); // Wait for any animations

      const filePath = path.join(SCREENSHOT_DIR, screenshot.name);
      await page.screenshot({ path: filePath, fullPage: true });
      console.log(`✓ Saved: ${filePath}`);
    } catch (error) {
      console.error(`✗ Failed to capture ${screenshot.name}:`, error);
    }
  }

  await browser.close();
  console.log('Screenshot capture complete!');
}

captureScreenshots().catch(console.error);

