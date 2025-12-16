import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

const AGILITY_BASE = 'https://app.agilitycms.com/instance/13f09fe2-u/en-us';
const SCREENSHOT_DIR = path.join(process.cwd(), 'docs/training-guide/screenshots/agility-cms');

// Ensure screenshot directory exists
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function captureScreenshots() {
  console.log('Launching browser (headless: false)...');
  console.log('Please authenticate in the browser window that opens.');
  console.log('The script will wait 30 seconds for you to authenticate, then proceed automatically.\n');

  const browser = await chromium.launch({
    headless: false,
    slowMo: 200
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();

  // Navigate to Agility CMS
  console.log('Navigating to Agility CMS...');
  await page.goto(AGILITY_BASE, { waitUntil: 'networkidle', timeout: 60000 });

  console.log('Waiting 30 seconds for authentication...');
  await page.waitForTimeout(30000); // Wait 30 seconds for user to authenticate

  const screenshots: Array<{ name: string, description: string, url: string }> = [
    { name: '01-dashboard-home.png', description: 'Dashboard Home', url: `${AGILITY_BASE}/home` },
    { name: '02-content-section-overview.png', description: 'Content Section Overview', url: `${AGILITY_BASE}/content` },
    { name: '03-content-posts-list.png', description: 'Posts Content List', url: `${AGILITY_BASE}/content/post` },
    { name: '04-content-authors-list.png', description: 'Authors Content List', url: `${AGILITY_BASE}/content/author` },
    { name: '05-content-categories-list.jpeg', description: 'Categories Content List', url: `${AGILITY_BASE}/content/category` },
    { name: '06-content-bento-cards-list.png', description: 'Bento Cards Content List', url: `${AGILITY_BASE}/content/bentocard` },
    { name: '07-content-testimonials-list.png', description: 'Testimonials Content List', url: `${AGILITY_BASE}/content/testimonialitem` },
    { name: '08-pages-section.png', description: 'Pages Section', url: `${AGILITY_BASE}/pages` },
    { name: '09-sitemap-view.png', description: 'Sitemap View', url: `${AGILITY_BASE}/pages/sitemap` },
    { name: '10-components-section.png', description: 'Components Section', url: `${AGILITY_BASE}/components` },
    { name: '11-assets-section.png', description: 'Assets Section', url: `${AGILITY_BASE}/assets` },
  ];

  console.log(`\nCapturing ${screenshots.length} Agility CMS screenshots...\n`);

  for (const screenshot of screenshots) {
    try {
      console.log(`Capturing: ${screenshot.description}...`);
      await page.goto(screenshot.url, { waitUntil: 'networkidle', timeout: 60000 });
      await page.waitForTimeout(3000); // Wait for content to load

      const filePath = path.join(SCREENSHOT_DIR, screenshot.name);
      await page.screenshot({ path: filePath, fullPage: true });
      console.log(`✓ Saved: ${filePath}`);
    } catch (error) {
      console.error(`✗ Failed to capture ${screenshot.name}:`, error);
    }
  }

  // Try to capture content item edit view
  console.log('\nAttempting to capture content item edit view...');
  try {
    await page.goto(`${AGILITY_BASE}/content/post`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Try to find and click first content item
    const firstItem = await page.$('a[href*="/content/post/"]:not([href*="/content/post$"])');
    if (firstItem) {
      await firstItem.click();
      await page.waitForTimeout(4000);

      const filePath = path.join(SCREENSHOT_DIR, '12-content-item-edit.png');
      await page.screenshot({ path: filePath, fullPage: true });
      console.log(`✓ Saved: ${filePath}`);
    } else {
      console.log('Could not find content item to edit. Skipping...');
    }
  } catch (error) {
    console.error('Could not capture content item edit view:', error);
  }

  // Try to capture page edit view
  console.log('\nAttempting to capture page edit view...');
  try {
    await page.goto(`${AGILITY_BASE}/pages/sitemap`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    const firstPage = await page.$('a[href*="/pages/"]:not([href*="/pages/sitemap"]):not([href*="/pages$"])');
    if (firstPage) {
      await firstPage.click();
      await page.waitForTimeout(4000);

      const filePath = path.join(SCREENSHOT_DIR, '13-page-edit-view.png');
      await page.screenshot({ path: filePath, fullPage: true });
      console.log(`✓ Saved: ${filePath}`);
    } else {
      console.log('Could not find page to edit. Skipping...');
    }
  } catch (error) {
    console.error('Could not capture page edit view:', error);
  }

  // Try to capture component definition
  console.log('\nAttempting to capture component definition...');
  try {
    await page.goto(`${AGILITY_BASE}/components`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    const firstComponent = await page.$('a[href*="/components/"]:not([href*="/components$"])');
    if (firstComponent) {
      await firstComponent.click();
      await page.waitForTimeout(4000);

      const filePath = path.join(SCREENSHOT_DIR, '14-component-definition.png');
      await page.screenshot({ path: filePath, fullPage: true });
      console.log(`✓ Saved: ${filePath}`);
    } else {
      console.log('Could not find component to view. Skipping...');
    }
  } catch (error) {
    console.error('Could not capture component definition:', error);
  }

  console.log('\n✅ Agility CMS screenshot capture complete!');
  console.log(`\nScreenshots saved to: ${SCREENSHOT_DIR}`);

  await browser.close();
}

captureScreenshots().catch(console.error);

