import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

const AGILITY_BASE = 'https://app.agilitycms.com/instance/13f09fe2-u/en-us';
const SCREENSHOT_DIR = path.join(process.cwd(), 'docs/training-guide/screenshots/agility-cms');

// Ensure screenshot directory exists
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

// Known IDs from instance analysis
const CONTENT_MODEL_IDS = {
  Post: 11,
  Author: 8,
  Category: 9,
  BentoCard: 17,
  TestimonialItem: 32,
};

const COMPONENT_MODEL_IDS = {
  ABTestHero: 40,
  BackgroundHero: 14,
  BentoSection: 16,
  PostListing: 24,
  PostDetails: 23,
};

const PAGE_IDS = {
  Home: 2,
  AboutUs: 3,
  Pricing: 4,
  Blog: 5,
  Features: 6,
  ContactUs: 8,
};

async function captureScreenshots() {
  console.log('Launching browser (headless: false)...');
  console.log('Please authenticate in the browser window that opens.');
  console.log('The script will wait 30 seconds for you to authenticate, then proceed automatically.\n');

  const browser = await chromium.launch({
    headless: false,
    slowMo: 300
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

  // Helper function to take screenshot
  async function takeScreenshot(name: string, description: string, waitTime = 3000) {
    try {
      await page.waitForTimeout(waitTime);
      const filePath = path.join(SCREENSHOT_DIR, name);
      await page.screenshot({ path: filePath, fullPage: true });
      console.log(`✓ Saved: ${filePath} - ${description}`);
      return true;
    } catch (error) {
      console.error(`✗ Failed to capture ${name}:`, error);
      return false;
    }
  }

  // Helper function to find container ID from current page
  async function findContainerId(): Promise<number | null> {
    try {
      // Try to extract container ID from URL or page content
      const url = page.url();
      const match = url.match(/list-(\d+)/);
      if (match) {
        return parseInt(match[1]);
      }
      return null;
    } catch {
      return null;
    }
  }

  console.log('\n=== Starting Screenshot Capture ===\n');

  // 1. Dashboard Home
  console.log('1. Capturing Dashboard Home...');
  await page.goto(`${AGILITY_BASE}/home`, { waitUntil: 'networkidle', timeout: 60000 });
  await takeScreenshot('01-dashboard-home.png', 'Dashboard Home');

  // 2. Content Section Overview
  console.log('\n2. Navigating to Content section...');
  await page.goto(`${AGILITY_BASE}/content`, { waitUntil: 'networkidle', timeout: 60000 });
  await takeScreenshot('02-content-section-overview.png', 'Content Section Overview');

  // 3-7. Content Lists - We'll navigate and capture container IDs dynamically
  console.log('\n3-7. Capturing Content Lists...');

  // Navigate to content section and try to find list links
  await page.goto(`${AGILITY_BASE}/content`, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2000);

  // Try to find and click on Posts
  const postsLink = await page.$('a:has-text("Post"), a[href*="post"], [data-content-type="Post"]').catch(() => null);
  if (postsLink) {
    await postsLink.click();
    await page.waitForTimeout(3000);
    await takeScreenshot('03-content-posts-list.png', 'Posts Content List');

    // Try to find a content item
    const firstPost = await page.$('a[href*="/listitem-"], tr a, [data-content-id]').catch(() => null);
    if (firstPost) {
      await firstPost.click();
      await page.waitForTimeout(3000);
      await takeScreenshot('12-content-item-edit.png', 'Content Item Edit View (Post)');
      // Go back to content overview
      await page.goto(`${AGILITY_BASE}/content`, { waitUntil: 'networkidle', timeout: 60000 });
      await page.waitForTimeout(2000);
    }
  }

  // Navigate to Authors
  const authorsLink = await page.$('a:has-text("Author"), a[href*="author"], [data-content-type="Author"]').catch(() => null);
  if (authorsLink) {
    await authorsLink.click();
    await page.waitForTimeout(3000);
    await takeScreenshot('04-content-authors-list.png', 'Authors Content List');
    await page.goto(`${AGILITY_BASE}/content`, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(2000);
  }

  // Navigate to Categories
  const categoriesLink = await page.$('a:has-text("Category"), a[href*="category"], [data-content-type="Category"]').catch(() => null);
  if (categoriesLink) {
    await categoriesLink.click();
    await page.waitForTimeout(3000);
    await takeScreenshot('05-content-categories-list.jpeg', 'Categories Content List');
    await page.goto(`${AGILITY_BASE}/content`, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(2000);
  }

  // Navigate to Bento Cards
  const bentoCardsLink = await page.$('a:has-text("Bento"), a[href*="bento"], [data-content-type*="Bento"]').catch(() => null);
  if (bentoCardsLink) {
    await bentoCardsLink.click();
    await page.waitForTimeout(3000);
    await takeScreenshot('06-content-bento-cards-list.png', 'Bento Cards Content List');
    await page.goto(`${AGILITY_BASE}/content`, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(2000);
  }

  // Navigate to Testimonials
  const testimonialsLink = await page.$('a:has-text("Testimonial"), a[href*="testimonial"], [data-content-type*="Testimonial"]').catch(() => null);
  if (testimonialsLink) {
    await testimonialsLink.click();
    await page.waitForTimeout(3000);
    await takeScreenshot('07-content-testimonials-list.png', 'Testimonials Content List');
  }

  // 8. Pages Section
  console.log('\n8. Navigating to Pages section...');
  await page.goto(`${AGILITY_BASE}/pages`, { waitUntil: 'networkidle', timeout: 60000 });
  await takeScreenshot('08-pages-section.png', 'Pages Section');

  // 9. Sitemap View
  console.log('\n9. Navigating to Sitemap...');
  await page.goto(`${AGILITY_BASE}/pages/sitemap`, { waitUntil: 'networkidle', timeout: 60000 });
  await takeScreenshot('09-sitemap-view.png', 'Sitemap View');

  // 10. Page Edit View (Home page)
  console.log('\n10. Navigating to Home Page edit view...');
  await page.goto(`${AGILITY_BASE}/pages/page-${PAGE_IDS.Home}`, { waitUntil: 'networkidle', timeout: 60000 });
  await takeScreenshot('13-page-edit-view.png', 'Page Edit View (Home)');

  // Try to find a component on the page
  const componentLink = await page.$('a[href*="/item-"], [data-component-id], [data-container-id]').catch(() => null);
  if (componentLink) {
    await componentLink.click();
    await page.waitForTimeout(3000);
    await takeScreenshot('14-component-on-page-edit.png', 'Component on Page Edit View');
  }

  // 11. Components Section
  console.log('\n11. Navigating to Components section...');
  await page.goto(`${AGILITY_BASE}/components`, { waitUntil: 'networkidle', timeout: 60000 });
  await takeScreenshot('10-components-section.png', 'Components Section');

  // 12. Component Model Definition
  console.log('\n12. Navigating to Component Model Definition...');
  await page.goto(`${AGILITY_BASE}/models/component-models/${COMPONENT_MODEL_IDS.BackgroundHero}`, { waitUntil: 'networkidle', timeout: 60000 });
  await takeScreenshot('14-component-definition.png', 'Component Model Definition (BackgroundHero)');

  // 13. Content Model Definition
  console.log('\n13. Navigating to Content Model Definition...');
  await page.goto(`${AGILITY_BASE}/models/contentmodels/${CONTENT_MODEL_IDS.Post}`, { waitUntil: 'networkidle', timeout: 60000 });
  await takeScreenshot('15-content-model-definition.png', 'Content Model Definition (Post)');

  // 14. Assets Section
  console.log('\n14. Navigating to Assets section...');
  await page.goto(`${AGILITY_BASE}/assets`, { waitUntil: 'networkidle', timeout: 60000 });
  await takeScreenshot('11-assets-section.png', 'Assets Section');

  console.log('\n✅ Agility CMS screenshot capture complete!');
  console.log(`\nScreenshots saved to: ${SCREENSHOT_DIR}`);

  // Keep browser open for 5 seconds
  await page.waitForTimeout(5000);
  await browser.close();
}

captureScreenshots().catch(console.error);

