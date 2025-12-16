import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

const WEBSITE_URL = 'https://nextjs-demo-site-2025.publishwithagility.com/';
const SCREENSHOT_DIR = path.join(process.cwd(), 'docs/training-guide/screenshots/website');

// Ensure screenshot directory exists
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function captureScreenshots() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: false }); // Use headless: false so you can authenticate if needed
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();

  const screenshots = [
    // Main pages
    { url: WEBSITE_URL, name: '01-homepage.jpeg', description: 'Homepage' },
    { url: `${WEBSITE_URL}about`, name: '02-about-page.jpeg', description: 'About page' },
    { url: `${WEBSITE_URL}pricing`, name: '03-pricing-page.jpeg', description: 'Pricing page' },
    { url: `${WEBSITE_URL}features`, name: '04-features-page.png', description: 'Features page' },
    { url: `${WEBSITE_URL}contact-us`, name: '05-contact-page.png', description: 'Contact page' },

    // Blog pages
    { url: `${WEBSITE_URL}blog`, name: '06-blog-listing.png', description: 'Blog listing page' },

    // Try to get a blog post (we'll need to find a valid slug)
    // { url: `${WEBSITE_URL}blog/[slug]`, name: '07-blog-post.png', description: 'Blog post detail' },
  ];

  console.log(`Capturing ${screenshots.length} website screenshots...`);

  for (const screenshot of screenshots) {
    try {
      console.log(`Capturing: ${screenshot.description}...`);
      await page.goto(screenshot.url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(3000); // Wait for animations and content to load

      // Scroll to bottom to trigger lazy loading
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1000);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(1000);

      const filePath = path.join(SCREENSHOT_DIR, screenshot.name);
      await page.screenshot({ path: filePath, fullPage: true });
      console.log(`✓ Saved: ${filePath}`);
    } catch (error) {
      console.error(`✗ Failed to capture ${screenshot.name}:`, error);
    }
  }

  // Try to find and capture blog post URLs
  try {
    console.log('Finding blog post URLs...');
    await page.goto(`${WEBSITE_URL}blog`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Look for blog post links
    const blogLinks = await page.$$eval('a[href*="/blog/"]', (links) =>
      links.slice(0, 3).map(link => (link as HTMLAnchorElement).href)
    );

    if (blogLinks.length > 0) {
      for (let i = 0; i < blogLinks.length; i++) {
        const blogUrl = blogLinks[i];
        const slug = blogUrl.split('/blog/')[1]?.split('?')[0] || 'unknown';
        try {
          console.log(`Capturing blog post: ${slug}...`);
          await page.goto(blogUrl, { waitUntil: 'networkidle', timeout: 30000 });
          await page.waitForTimeout(3000);

          const filePath = path.join(SCREENSHOT_DIR, `07-blog-post-${i + 1}-${slug}.png`);
          await page.screenshot({ path: filePath, fullPage: true });
          console.log(`✓ Saved: ${filePath}`);
        } catch (error) {
          console.error(`✗ Failed to capture blog post ${slug}:`, error);
        }
      }
    }
  } catch (error) {
    console.error('Could not capture blog posts:', error);
  }

  await browser.close();
  console.log('Website screenshot capture complete!');
}

captureScreenshots().catch(console.error);

