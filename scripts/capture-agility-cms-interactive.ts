import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

const AGILITY_BASE = 'https://app.agilitycms.com/instance/13f09fe2-u/en-us';
const SCREENSHOT_DIR = path.join(process.cwd(), 'docs/training-guide/screenshots/agility-cms');

// Ensure screenshot directory exists
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query: string): Promise<string> {
  return new Promise(resolve => rl.question(query, resolve));
}

async function captureScreenshots() {
  console.log('Launching browser (headless: false for authentication)...');
  const browser = await chromium.launch({
    headless: false,
    slowMo: 300
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();

  console.log('\n=== AUTHENTICATION REQUIRED ===');
  console.log('A browser window will open. Please:');
  console.log('1. Log in to Agility CMS');
  console.log('2. Navigate to the instance if needed');
  console.log('3. Once you see the dashboard, come back here');
  console.log('================================\n');

  await page.goto(AGILITY_BASE, { waitUntil: 'networkidle', timeout: 60000 });

  await question('Press Enter once you are logged in and see the dashboard...\n');

  const screenshots: Array<{ name: string, description: string, action: () => Promise<void> }> = [
    {
      name: '01-dashboard-home.png',
      description: 'Dashboard Home',
      action: async () => {
        await page.goto(`${AGILITY_BASE}/home`, { waitUntil: 'networkidle', timeout: 60000 });
        await page.waitForTimeout(3000);
      }
    },
    {
      name: '02-content-section-overview.png',
      description: 'Content Section Overview',
      action: async () => {
        await page.goto(`${AGILITY_BASE}/content`, { waitUntil: 'networkidle', timeout: 60000 });
        await page.waitForTimeout(3000);
      }
    },
    {
      name: '03-content-posts-list.png',
      description: 'Posts Content List',
      action: async () => {
        await page.goto(`${AGILITY_BASE}/content/post`, { waitUntil: 'networkidle', timeout: 60000 });
        await page.waitForTimeout(3000);
      }
    },
    {
      name: '04-content-authors-list.png',
      description: 'Authors Content List',
      action: async () => {
        await page.goto(`${AGILITY_BASE}/content/author`, { waitUntil: 'networkidle', timeout: 60000 });
        await page.waitForTimeout(3000);
      }
    },
    {
      name: '05-content-categories-list.jpeg',
      description: 'Categories Content List',
      action: async () => {
        await page.goto(`${AGILITY_BASE}/content/category`, { waitUntil: 'networkidle', timeout: 60000 });
        await page.waitForTimeout(3000);
      }
    },
    {
      name: '06-content-bento-cards-list.png',
      description: 'Bento Cards Content List',
      action: async () => {
        await page.goto(`${AGILITY_BASE}/content/bentocard`, { waitUntil: 'networkidle', timeout: 60000 });
        await page.waitForTimeout(3000);
      }
    },
    {
      name: '07-content-testimonials-list.png',
      description: 'Testimonials Content List',
      action: async () => {
        await page.goto(`${AGILITY_BASE}/content/testimonialitem`, { waitUntil: 'networkidle', timeout: 60000 });
        await page.waitForTimeout(3000);
      }
    },
    {
      name: '08-pages-section.png',
      description: 'Pages Section',
      action: async () => {
        await page.goto(`${AGILITY_BASE}/pages`, { waitUntil: 'networkidle', timeout: 60000 });
        await page.waitForTimeout(3000);
      }
    },
    {
      name: '09-sitemap-view.png',
      description: 'Sitemap View',
      action: async () => {
        await page.goto(`${AGILITY_BASE}/pages/sitemap`, { waitUntil: 'networkidle', timeout: 60000 });
        await page.waitForTimeout(3000);
      }
    },
    {
      name: '10-components-section.png',
      description: 'Components Section',
      action: async () => {
        await page.goto(`${AGILITY_BASE}/components`, { waitUntil: 'networkidle', timeout: 60000 });
        await page.waitForTimeout(3000);
      }
    },
    {
      name: '11-assets-section.png',
      description: 'Assets Section',
      action: async () => {
        await page.goto(`${AGILITY_BASE}/assets`, { waitUntil: 'networkidle', timeout: 60000 });
        await page.waitForTimeout(3000);
      }
    },
  ];

  console.log(`\nCapturing ${screenshots.length} Agility CMS screenshots...\n`);

  for (const screenshot of screenshots) {
    try {
      console.log(`Capturing: ${screenshot.description}...`);
      await screenshot.action();

      // Wait for content to be visible
      await page.waitForTimeout(2000);

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

    // Look for "Add Content" or first item link
    const addButton = await page.$('button:has-text("Add"), a:has-text("Add"), [data-testid*="add"]');
    const firstItemLink = await page.$('a[href*="/content/post/"]:not([href*="/content/post$"])');

    if (firstItemLink) {
      console.log('Clicking on first content item...');
      await firstItemLink.click();
      await page.waitForTimeout(4000);

      const filePath = path.join(SCREENSHOT_DIR, '12-content-item-edit.png');
      await page.screenshot({ path: filePath, fullPage: true });
      console.log(`✓ Saved: ${filePath}`);
    } else if (addButton) {
      console.log('Clicking Add button to see create form...');
      await addButton.click();
      await page.waitForTimeout(3000);

      const filePath = path.join(SCREENSHOT_DIR, '12-content-item-create.png');
      await page.screenshot({ path: filePath, fullPage: true });
      console.log(`✓ Saved: ${filePath}`);
    }
  } catch (error) {
    console.error('Could not capture content item edit view:', error);
    console.log('You may need to manually navigate to a content item and press Enter...');
    await question('Press Enter when ready to capture content item edit view...\n');
    const filePath = path.join(SCREENSHOT_DIR, '12-content-item-edit-manual.png');
    await page.screenshot({ path: filePath, fullPage: true });
    console.log(`✓ Saved: ${filePath}`);
  }

  // Try to capture page edit view
  console.log('\nAttempting to capture page edit view...');
  try {
    await page.goto(`${AGILITY_BASE}/pages/sitemap`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    const firstPageLink = await page.$('a[href*="/pages/"]:not([href*="/pages/sitemap"])');
    if (firstPageLink) {
      console.log('Clicking on first page...');
      await firstPageLink.click();
      await page.waitForTimeout(4000);

      const filePath = path.join(SCREENSHOT_DIR, '13-page-edit-view.png');
      await page.screenshot({ path: filePath, fullPage: true });
      console.log(`✓ Saved: ${filePath}`);
    }
  } catch (error) {
    console.error('Could not capture page edit view:', error);
    console.log('You may need to manually navigate to a page and press Enter...');
    await question('Press Enter when ready to capture page edit view...\n');
    const filePath = path.join(SCREENSHOT_DIR, '13-page-edit-view-manual.png');
    await page.screenshot({ path: filePath, fullPage: true });
    console.log(`✓ Saved: ${filePath}`);
  }

  // Try to capture component definition
  console.log('\nAttempting to capture component definition...');
  try {
    await page.goto(`${AGILITY_BASE}/components`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    const firstComponentLink = await page.$('a[href*="/components/"]:not([href*="/components$"])');
    if (firstComponentLink) {
      console.log('Clicking on first component...');
      await firstComponentLink.click();
      await page.waitForTimeout(4000);

      const filePath = path.join(SCREENSHOT_DIR, '14-component-definition.png');
      await page.screenshot({ path: filePath, fullPage: true });
      console.log(`✓ Saved: ${filePath}`);
    }
  } catch (error) {
    console.error('Could not capture component definition:', error);
  }

  await browser.close();
  rl.close();
  console.log('\n✅ Agility CMS screenshot capture complete!');
}

captureScreenshots().catch(console.error);

