import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

const AGILITY_URL = 'https://app.agilitycms.com/instance/13f09fe2-u/en-us/home';
const SCREENSHOT_DIR = path.join(process.cwd(), 'docs/training-guide/screenshots/agility-cms');

// Ensure screenshot directory exists
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function captureScreenshots() {
  console.log('Launching browser (headless: false for authentication)...');
  const browser = await chromium.launch({
    headless: false, // Keep visible so user can authenticate
    slowMo: 500 // Slow down for visibility
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();

  console.log('\n=== IMPORTANT ===');
  console.log('Please authenticate in the browser window that just opened.');
  console.log('Once authenticated, press Enter in this terminal to continue...');
  console.log('==================\n');

  // Wait for user to authenticate
  await new Promise(resolve => {
    process.stdin.once('data', () => resolve(undefined));
  });

  const screenshots = [
    // Dashboard and main views
    { url: `${AGILITY_URL}`, name: '01-dashboard-home.png', description: 'Dashboard Home', wait: 3000 },

    // Content section
    { url: `${AGILITY_URL.replace('/home', '/content')}`, name: '02-content-section.png', description: 'Content Section', wait: 3000 },
    { url: `${AGILITY_URL.replace('/home', '/content/post')}`, name: '03-content-posts-list.png', description: 'Posts Content List', wait: 3000 },
    { url: `${AGILITY_URL.replace('/home', '/content/author')}`, name: '04-content-authors-list.png', description: 'Authors Content List', wait: 3000 },
    { url: `${AGILITY_URL.replace('/home', '/content/category')}`, name: '05-content-categories-list.jpeg', description: 'Categories Content List', wait: 3000 },

    // Pages section
    { url: `${AGILITY_URL.replace('/home', '/pages')}`, name: '06-pages-section.png', description: 'Pages Section', wait: 3000 },
    { url: `${AGILITY_URL.replace('/home', '/pages/sitemap')}`, name: '07-sitemap-view.png', description: 'Sitemap View', wait: 3000 },

    // Components section
    { url: `${AGILITY_URL.replace('/home', '/components')}`, name: '08-components-section.png', description: 'Components Section', wait: 3000 },

    // Assets section
    { url: `${AGILITY_URL.replace('/home', '/assets')}`, name: '09-assets-section.png', description: 'Assets Section', wait: 3000 },
  ];

  console.log(`\nCapturing ${screenshots.length} Agility CMS screenshots...\n`);

  for (const screenshot of screenshots) {
    try {
      console.log(`Capturing: ${screenshot.description}...`);
      await page.goto(screenshot.url, { waitUntil: 'networkidle', timeout: 60000 });
      await page.waitForTimeout(screenshot.wait || 2000);

      // Wait for main content to load
      try {
        await page.waitForSelector('main, [role="main"], .agility-content', { timeout: 10000 });
      } catch (e) {
        // Continue even if selector not found
      }

      const filePath = path.join(SCREENSHOT_DIR, screenshot.name);
      await page.screenshot({ path: filePath, fullPage: true });
      console.log(`✓ Saved: ${filePath}`);
    } catch (error) {
      console.error(`✗ Failed to capture ${screenshot.name}:`, error);
      console.error(`  URL: ${screenshot.url}`);
    }
  }

  // Try to capture a content item edit view
  try {
    console.log('\nAttempting to capture content item edit view...');
    await page.goto(`${AGILITY_URL.replace('/home', '/content/post')}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Try to click on first content item if available
    const firstItem = await page.$('a[href*="/content/post/"], button[data-content-id]');
    if (firstItem) {
      await firstItem.click();
      await page.waitForTimeout(3000);

      const filePath = path.join(SCREENSHOT_DIR, '10-content-item-edit.png');
      await page.screenshot({ path: filePath, fullPage: true });
      console.log(`✓ Saved: ${filePath}`);
    }
  } catch (error) {
    console.error('Could not capture content item edit view:', error);
  }

  // Try to capture a page edit view
  try {
    console.log('\nAttempting to capture page edit view...');
    await page.goto(`${AGILITY_URL.replace('/home', '/pages/sitemap')}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Try to click on first page if available
    const firstPage = await page.$('a[href*="/pages/"], [data-page-id]');
    if (firstPage) {
      await firstPage.click();
      await page.waitForTimeout(3000);

      const filePath = path.join(SCREENSHOT_DIR, '11-page-edit-view.png');
      await page.screenshot({ path: filePath, fullPage: true });
      console.log(`✓ Saved: ${filePath}`);
    }
  } catch (error) {
    console.error('Could not capture page edit view:', error);
  }

  await browser.close();
  console.log('\nAgility CMS screenshot capture complete!');
}

captureScreenshots().catch(console.error);

