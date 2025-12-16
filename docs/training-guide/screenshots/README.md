# Screenshots Index

This directory contains screenshots of both the live website and the Agility CMS content manager interface.

## Directory Structure

```
screenshots/
├── README.md (this file)
├── website/          # Screenshots of the live website
└── agility-cms/      # Screenshots of the Agility CMS interface
```

## Website Screenshots

Screenshots of the live website: https://nextjs-demo-site-2025.publishwithagility.com/

### Main Pages
- `01-homepage.jpeg` - Homepage
- `02-about-page.jpeg` - About Us page
- `03-pricing-page.jpeg` - Pricing page
- `04-features-page.png` - Features page
- `05-contact-page.png` - Contact Us page

### Blog Pages
- `06-blog-listing.png` - Blog listing page
- `07-blog-post-1-vitality-health-net-case-study.png` - Sample blog post
- `07-blog-post-2-ai-customer-intelligence-implementation-steps.png` - Sample blog post
- `07-blog-post-3-future-of-retail-ai-customer-intelligence.png` - Sample blog post

## Agility CMS Screenshots

Screenshots of the Agility CMS content manager for the Demo Site instance: https://app.agilitycms.com/instance/13f09fe2-u/

### Dashboard & Navigation
- `01-dashboard-home.png` - Main dashboard/home view
- `02-content-section-overview.png` - Content section overview

### Content Management
- `03-content-posts-list.png` - Posts content list
- `04-content-authors-list.png` - Authors content list
- `05-content-categories-list.png` / `.jpeg` - Categories content list
- `06-content-bento-cards-list.png` - Bento Cards content list
- `07-content-testimonials-list.png` - Testimonials content list

### Page Management
- `08-pages-section.png` - Pages section overview
- `09-sitemap-view.png` - Sitemap view showing page structure
- `13-page-edit-view.png` - Page edit view with modules

### Component Management
- `10-components-section.png` - Components section overview
- `14-component-definition.png` - Component definition/edit view
- `15-content-model-definition.png` - Content model definition view

### Asset Management
- `11-assets-section.png` - Assets/media library section

## Using Screenshots in Training Guides

Screenshots are referenced in the training guides using relative paths:

```markdown
![Dashboard Home](./screenshots/agility-cms/01-dashboard-home.png)
```

### Screenshot Naming Convention

- **Website screenshots**: Numbered sequentially with descriptive names
- **Agility CMS screenshots**: Numbered sequentially showing workflow progression
- **Blog posts**: Include slug in filename for identification

## Capturing New Screenshots

### Website Screenshots
Run the automated script:
```bash
npx tsx scripts/capture-website-screenshots.ts
```

### Agility CMS Screenshots
Run the interactive script (requires authentication):
```bash
npx tsx scripts/capture-agility-cms-interactive.ts
```

The script will:
1. Open a browser window
2. Wait for you to authenticate
3. Prompt you to press Enter when ready
4. Automatically capture screenshots
5. Allow manual navigation if needed

## Screenshot Guidelines

When capturing new screenshots:

1. **Use full-page screenshots** - Capture entire page content
2. **Wait for content to load** - Ensure all dynamic content is visible
3. **Use consistent viewport** - 1920x1080 for consistency
4. **Descriptive filenames** - Use clear, numbered filenames
5. **Update this README** - Document new screenshots here

## Integration with Training Guides

Screenshots are integrated into training guides to:
- Show real examples of the interface
- Illustrate step-by-step processes
- Provide visual context for concepts
- Help users identify UI elements

---

*Last updated: After manual screenshot capture*

