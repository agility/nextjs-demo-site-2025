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
    slowMo: 500 // Slower for better visibility
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();

  // Navigate to Agility CMS
  console.log('Navigating to Agility CMS...');
  await page.goto(AGILITY_BASE, { waitUntil: 'networkidle', timeout: 60000 });

  console.log('Waiting 30 seconds for authentication...');
  await page.waitForTimeout(30000);

  // Helper function to click and wait
  async function clickAndWait(selector: string, description: string, waitTime = 3000) {
    try {
      await page.waitForSelector(selector, { timeout: 10000 });
      await page.click(selector);
      await page.waitForTimeout(waitTime);
      return true;
    } catch (error) {
      console.error(`Could not click ${description}:`, error);
      return false;
    }
  }

  // Helper function to take screenshot
  async function takeScreenshot(name: string, description: string) {
    try {
      await page.waitForTimeout(2000); // Wait for page to settle
      const filePath = path.join(SCREENSHOT_DIR, name);
      await page.screenshot({ path: filePath, fullPage: true });
      console.log(`✓ Saved: ${filePath} - ${description}`);
      return true;
    } catch (error) {
      console.error(`✗ Failed to capture ${name}:`, error);
      return false;
    }
  }

  console.log('\n=== Starting Screenshot Capture ===\n');

  // 1. Dashboard Home (should already be there)
  console.log('1. Capturing Dashboard Home...');
  await takeScreenshot('01-dashboard-home.png', 'Dashboard Home');

  // 2. Navigate to Content section
  console.log('\n2. Navigating to Content section...');
  const contentNav = await page.$('a[href*="content"], [data-testid*="content"], nav a:has-text("Content"), [aria-label*="Content"]').catch(() => null);
  if (contentNav) {
    await contentNav.click();
    await page.waitForTimeout(3000);
    await takeScreenshot('02-content-section-overview.png', 'Content Section Overview');
  } else {
    // Try direct navigation as fallback
    await page.goto(`${AGILITY_BASE}/content`, { waitUntil: 'networkidle', timeout: 60000 });
    await takeScreenshot('02-content-section-overview.png', 'Content Section Overview');
  }

  // 3. Navigate to Posts
  console.log('\n3. Navigating to Posts...');
  const postsLink = await page.$('a:has-text("Post"), a[href*="post"], [data-content-type="Post"]').catch(() => null);
  if (postsLink) {
    await postsLink.click();
    await page.waitForTimeout(3000);
    await takeScreenshot('03-content-posts-list.png', 'Posts Content List');
  }

  // 4. Navigate to Authors
  console.log('\n4. Navigating to Authors...');
  // Go back to content overview first
  await page.goto(`${AGILITY_BASE}/content`, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2000);
  const authorsLink = await page.$('a:has-text("Author"), a[href*="author"], [data-content-type="Author"]').catch(() => null);
  if (authorsLink) {
    await authorsLink.click();
    await page.waitForTimeout(3000);
    await takeScreenshot('04-content-authors-list.png', 'Authors Content List');
  }

  // 5. Navigate to Categories
  console.log('\n5. Navigating to Categories...');
  await page.goto(`${AGILITY_BASE}/content`, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2000);
  const categoriesLink = await page.$('a:has-text("Category"), a[href*="category"], [data-content-type="Category"]').catch(() => null);
  if (categoriesLink) {
    await categoriesLink.click();
    await page.waitForTimeout(3000);
    await takeScreenshot('05-content-categories-list.jpeg', 'Categories Content List');
  }

  // 6. Navigate to Bento Cards
  console.log('\n6. Navigating to Bento Cards...');
  await page.goto(`${AGILITY_BASE}/content`, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2000);
  const bentoCardsLink = await page.$('a:has-text("Bento"), a[href*="bento"], [data-content-type*="Bento"]').catch(() => null);
  if (bentoCardsLink) {
    await bentoCardsLink.click();
    await page.waitForTimeout(3000);
    await takeScreenshot('06-content-bento-cards-list.png', 'Bento Cards Content List');
  }

  // 7. Navigate to Testimonials
  console.log('\n7. Navigating to Testimonials...');
  await page.goto(`${AGILITY_BASE}/content`, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2000);
  const testimonialsLink = await page.$('a:has-text("Testimonial"), a[href*="testimonial"], [data-content-type*="Testimonial"]').catch(() => null);
  if (testimonialsLink) {
    await testimonialsLink.click();
    await page.waitForTimeout(3000);
    await takeScreenshot('07-content-testimonials-list.png', 'Testimonials Content List');
  }

  // 8. Navigate to Pages section
  console.log('\n8. Navigating to Pages section...');
  const pagesNav = await page.$('a[href*="pages"], [data-testid*="pages"], nav a:has-text("Pages"), [aria-label*="Pages"]').catch(() => null);
  if (pagesNav) {
    await pagesNav.click();
    await page.waitForTimeout(3000);
    await takeScreenshot('08-pages-section.png', 'Pages Section');
  } else {
    await page.goto(`${AGILITY_BASE}/pages`, { waitUntil: 'networkidle', timeout: 60000 });
    await takeScreenshot('08-pages-section.png', 'Pages Section');
  }

  // 9. Navigate to Sitemap
  console.log('\n9. Navigating to Sitemap...');
  const sitemapLink = await page.$('a:has-text("Sitemap"), a[href*="sitemap"], [data-testid*="sitemap"]').catch(() => null);
  if (sitemapLink) {
    await sitemapLink.click();
    await page.waitForTimeout(3000);
    await takeScreenshot('09-sitemap-view.png', 'Sitemap View');
  } else {
    await page.goto(`${AGILITY_BASE}/pages/sitemap`, { waitUntil: 'networkidle', timeout: 60000 });
    await takeScreenshot('09-sitemap-view.png', 'Sitemap View');
  }

  // 10. Navigate to Components section
  console.log('\n10. Navigating to Components section...');
  const componentsNav = await page.$('a[href*="components"], [data-testid*="components"], nav a:has-text("Components"), [aria-label*="Components"]').catch(() => null);
  if (componentsNav) {
    await componentsNav.click();
    await page.waitForTimeout(3000);
    await takeScreenshot('10-components-section.png', 'Components Section');
  } else {
    await page.goto(`${AGILITY_BASE}/components`, { waitUntil: 'networkidle', timeout: 60000 });
    await takeScreenshot('10-components-section.png', 'Components Section');
  }

  // 11. Navigate to Assets section
  console.log('\n11. Navigating to Assets section...');
  const assetsNav = await page.$('a[href*="assets"], [data-testid*="assets"], nav a:has-text("Assets"), [aria-label*="Assets"]').catch(() => null);
  if (assetsNav) {
    await assetsNav.click();
    await page.waitForTimeout(3000);
    await takeScreenshot('11-assets-section.png', 'Assets Section');
  } else {
    await page.goto(`${AGILITY_BASE}/assets`, { waitUntil: 'networkidle', timeout: 60000 });
    await takeScreenshot('11-assets-section.png', 'Assets Section');
  }

  // 12. Try to capture content item edit view
  console.log('\n12. Attempting to capture content item edit view...');
  try {
    await page.goto(`${AGILITY_BASE}/content/post`, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(2000);

    // Try multiple selectors for content items
    const itemSelectors = [
      'a[href*="/content/post/"]:not([href*="/content/post$"])',
      'tr a',
      '[data-content-id]',
      'button:has-text("Edit")',
      '.content-item a'
    ];

    let clicked = false;
    for (const selector of itemSelectors) {
      const item = await page.$(selector).catch(() => null);
      if (item) {
        await item.click();
        await page.waitForTimeout(4000);
        await takeScreenshot('12-content-item-edit.png', 'Content Item Edit View');
        clicked = true;
        break;
      }
    }

    if (!clicked) {
      console.log('Could not find content item to edit. You may need to manually navigate.');
    }
  } catch (error) {
    console.error('Could not capture content item edit view:', error);
  }

  // 13. Try to capture page edit view
  console.log('\n13. Attempting to capture page edit view...');
  try {
    await page.goto(`${AGILITY_BASE}/pages/sitemap`, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(2000);

    const pageSelectors = [
      'a[href*="/pages/"]:not([href*="/pages/sitemap"]):not([href*="/pages$"])',
      '[data-page-id]',
      'tr a',
      '.page-item a'
    ];

    let clicked = false;
    for (const selector of pageSelectors) {
      const pageLink = await page.$(selector).catch(() => null);
      if (pageLink) {
        await pageLink.click();
        await page.waitForTimeout(4000);
        await takeScreenshot('13-page-edit-view.png', 'Page Edit View');
        clicked = true;
        break;
      }
    }

    if (!clicked) {
      console.log('Could not find page to edit. You may need to manually navigate.');
    }
  } catch (error) {
    console.error('Could not capture page edit view:', error);
  }

  // 14. Try to capture component definition
  console.log('\n14. Attempting to capture component definition...');
  try {
    await page.goto(`${AGILITY_BASE}/components`, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(2000);

    const componentSelectors = [
      'a[href*="/components/"]:not([href*="/components$"])',
      '[data-component-id]',
      'tr a',
      '.component-item a'
    ];

    let clicked = false;
    for (const selector of componentSelectors) {
      const componentLink = await page.$(selector).catch(() => null);
      if (componentLink) {
        await componentLink.click();
        await page.waitForTimeout(4000);
        await takeScreenshot('14-component-definition.png', 'Component Definition');
        clicked = true;
        break;
      }
    }

    if (!clicked) {
      console.log('Could not find component to view. You may need to manually navigate.');
    }
  } catch (error) {
    console.error('Could not capture component definition:', error);
  }

  console.log('\n✅ Agility CMS screenshot capture complete!');
  console.log(`\nScreenshots saved to: ${SCREENSHOT_DIR}`);
  console.log('\nIf any screenshots were missed, you can manually navigate and the script will try to capture them.');

  // Keep browser open for 10 seconds so user can see final state
  await page.waitForTimeout(10000);
  await browser.close();
}

captureScreenshots().catch(console.error);

