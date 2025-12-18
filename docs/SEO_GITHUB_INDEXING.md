# SEO Guide: Getting GitHub README Indexed and Associated with Agility CMS Domain

This guide outlines strategies to improve Google indexing of the GitHub repository README and associate it with the Agility CMS domain.

## Current Status

- **GitHub Repository**: https://github.com/agility/nextjs-demo-site-2025
- **Live Demo Site**: https://demo.agilitycms.com
- **Target Domain**: agilitycms.com
- **Documentation Location**: `/docs` folder (to be served as pages on live site)

## Primary Strategy: In-Site Documentation Pages ⭐

**The main SEO strategy is to serve all documentation directly from the Next.js site using MDX routing.**

Instead of documentation only existing in GitHub, all markdown files in the `/docs` folder will be accessible as actual pages on `demo.agilitycms.com/docs/...`. This provides:

- ✅ **Maximum SEO value**: All docs content lives on the main domain
- ✅ **Better domain association**: Google sees docs as part of the Agility CMS ecosystem
- ✅ **Single source of truth**: Docs in `/docs` folder become real site pages
- ✅ **Better user experience**: Users can read docs without leaving the site
- ✅ **Internal linking**: Natural cross-linking between docs and site content

**Example URLs:**
- `https://demo.agilitycms.com/docs` - Docs index
- `https://demo.agilitycms.com/docs/SEO_GITHUB_INDEXING` - This guide
- `https://demo.agilitycms.com/docs/developer/codebase` - Developer docs
- `https://demo.agilitycms.com/docs/agility-cms/admin` - CMS admin docs

## Strategy Overview

### 1. GitHub Repository Optimization

#### Repository Settings
- ✅ **Description**: Ensure repository has a clear description mentioning "Agility CMS"
- ✅ **Topics**: Add relevant topics: `agility-cms`, `nextjs`, `headless-cms`, `typescript`, `react`, `demo-site`
- ✅ **Website URL**: Set to `https://demo.agilitycms.com`
- ✅ **Visibility**: Keep repository public

#### README Enhancements
- ✅ Add canonical link reference (via GitHub Pages or meta tags)
- ✅ Include structured data (JSON-LD)
- ✅ Add Open Graph meta tags (via GitHub Pages)
- ✅ Cross-link to Agility CMS documentation

### 2. In-Site Documentation Pages (Primary Strategy) ⭐

**Serve documentation directly from the Next.js site using MDX routing:**

**Benefits:**
- **Best SEO**: All docs live on `demo.agilitycms.com/docs/...` (main domain)
- **Single source of truth**: Docs in `/docs` folder become actual site pages
- **Full control**: Custom layouts, meta tags, structured data per page
- **Better UX**: Users can read docs without leaving the site
- **Internal linking**: Natural cross-linking between docs and site content
- **Domain authority**: All content contributes to `demo.agilitycms.com` SEO

**Implementation:**

1. **Set up MDX routing in Next.js App Router:**
   ```bash
   npm install @next/mdx @mdx-js/loader @mdx-js/react
   ```

2. **Create docs route structure:**
   ```
   src/app/docs/
   ├── layout.tsx          # Docs layout with sidebar navigation
   ├── page.tsx            # Docs index page
   └── [...slug]/
       └── page.tsx        # Dynamic MDX page handler
   ```

3. **Configure Next.js for MDX:**
   - Update `next.config.mjs` to handle MDX files
   - Set up MDX components for custom rendering
   - Configure file-based routing from `/docs` folder

4. **Create docs layout:**
   - Sidebar navigation (auto-generated from folder structure)
   - Breadcrumbs
   - Table of contents
   - SEO meta tags per page
   - Structured data (Article schema)

5. **Route structure:**
   - `/docs` → Index page listing all docs
   - `/docs/SEO_GITHUB_INDEXING` → Individual doc pages
   - `/docs/developer/codebase` → Nested docs
   - `/docs/agility-cms/admin` → Category-based docs

6. **SEO enhancements:**
   - Generate sitemap entries for all doc pages
   - Add canonical URLs
   - Include breadcrumb structured data
   - Add "last updated" dates
   - Generate Open Graph tags

**File Structure:**
```
docs/                          # Source markdown files (keep as-is)
├── README.md
├── SEO_GITHUB_INDEXING.md
├── developer/
└── agility-cms/

src/app/docs/                  # Next.js route handlers
├── layout.tsx                 # Docs layout with navigation
├── page.tsx                   # Docs index
└── [...slug]/
    └── page.tsx               # MDX renderer
```

**Key Features:**
- Auto-generate navigation from folder structure
- Syntax highlighting for code blocks
- Link validation
- Search functionality (optional)
- Mobile-responsive sidebar
- Dark mode support

### 3. GitHub Pages Setup (Secondary/Backup)

**Optional**: Create a GitHub Pages site as a backup/alternative access point:

**Benefits:**
- Alternative access point for documentation
- Can use custom subdomain if needed
- Good for users who prefer GitHub interface

**Implementation:**
1. Enable GitHub Pages in repository settings
2. Create `docs/index.md` that mirrors README.md
3. Use Jekyll or static site generator with proper meta tags
4. Link from GitHub Pages to main site docs

**Note**: Primary strategy is in-site docs (#2 above), GitHub Pages is optional backup.

### 4. Cross-Linking Strategy

#### From Live Site to GitHub
Add a prominent link on the live demo site:

```html
<!-- In footer or about page -->
<a href="https://github.com/agility/nextjs-demo-site-2025" rel="noopener">
  View Source Code on GitHub
</a>
```

#### From Agility CMS Main Site
- Add link from agilitycms.com/docs or agilitycms.com/examples
- Include in "Demo Sites" or "Examples" section
- Use descriptive anchor text: "Next.js Demo Site - Open Source"

### 5. Structured Data (JSON-LD)

Add structured data to help Google understand the relationship:

**Option A: GitHub Pages with JSON-LD**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Agility CMS Next.js Demo Site",
  "description": "Production-ready Next.js demo site showcasing Agility CMS integration",
  "url": "https://github.com/agility/nextjs-demo-site-2025",
  "codeRepository": "https://github.com/agility/nextjs-demo-site-2025",
  "programmingLanguage": "TypeScript",
  "runtimePlatform": "Next.js",
  "applicationCategory": "WebApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Agility CMS",
    "url": "https://agilitycms.com"
  },
  "mainEntity": {
    "@type": "WebSite",
    "url": "https://demo.agilitycms.com"
  }
}
</script>
```

**Option B: Add to Live Site Docs Pages**
Add structured data to each documentation page:

```html
<!-- On each /docs/* page -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "SEO Guide: Getting GitHub README Indexed",
  "description": "Guide for improving Google indexing...",
  "author": {
    "@type": "Organization",
    "name": "Agility CMS",
    "url": "https://agilitycms.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Agility CMS",
    "url": "https://agilitycms.com"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://demo.agilitycms.com/docs/SEO_GITHUB_INDEXING"
  },
  "codeRepository": "https://github.com/agility/nextjs-demo-site-2025"
}
</script>
```

**Option C: Add to Live Site Homepage**
Add structured data to the live demo site's homepage linking to GitHub and docs.

### 6. Google Search Console Setup

#### For GitHub Repository
1. Verify ownership of `github.com/agility/nextjs-demo-site-2025`
2. Submit sitemap: `https://github.com/agility/nextjs-demo-site-2025/sitemap.xml` (if available)
3. Request indexing of README page

#### For Agility CMS Domain
1. Verify ownership of `demo.agilitycms.com` in Google Search Console
2. Submit sitemap: `https://demo.agilitycms.com/sitemap.xml` (includes all docs pages)
3. Submit docs sitemap: `https://demo.agilitycms.com/docs/sitemap.xml` (if separate)
4. Use "URL Inspection" tool to request indexing of:
   - Homepage
   - `/docs` index page
   - Key documentation pages
   - GitHub repository link page

### 7. Content Optimization

#### README Keywords
Ensure README includes relevant keywords naturally:
- "Agility CMS"
- "Next.js demo"
- "Headless CMS"
- "TypeScript"
- "React 19"
- "Production-ready"

#### Add "About" Section
Consider adding an "About" section that explicitly mentions:
- This is an official Agility CMS demo site
- Built by Agility CMS team
- Showcases best practices for Agility CMS integration

### 8. Social Signals

- Share repository on Agility CMS social media
- Link from Agility CMS blog posts
- Include in email newsletters
- Mention in documentation and tutorials

### 9. Backlinks Strategy

#### Internal Links (Agility CMS Ecosystem)
- Link from agilitycms.com/docs
- Link from agilitycms.com/examples
- Link from agilitycms.com/blog posts
- Link from other Agility CMS repositories

#### External Links
- Submit to "awesome-nextjs" lists
- Submit to "awesome-headless-cms" lists
- Share in relevant developer communities
- Include in conference talks/presentations

### 10. GitHub Actions for SEO

Create a workflow that:
- Generates sitemap for GitHub Pages
- Validates structured data
- Checks for broken links
- Updates meta tags automatically

### 11. Documentation Site Integration

If Agility CMS has a documentation site:
- Add the demo site to examples section
- Create a dedicated page: `agilitycms.com/docs/examples/nextjs-demo`
- Include screenshots and feature highlights
- Link to GitHub repository prominently

## Implementation Checklist

### Phase 1: In-Site Documentation (Priority)
- [ ] Install MDX dependencies (`@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`)
- [ ] Configure Next.js for MDX in `next.config.mjs`
- [ ] Create `/src/app/docs` route structure
- [ ] Create docs layout component with sidebar navigation
- [ ] Set up dynamic MDX page handler (`[...slug]/page.tsx`)
- [ ] Generate navigation from `/docs` folder structure
- [ ] Add SEO meta tags to docs layout
- [ ] Add structured data (Article schema) to docs pages
- [ ] Update sitemap to include all docs pages
- [ ] Test all doc routes and navigation

### Phase 2: SEO Optimization
- [ ] Optimize GitHub repository description and topics
- [ ] Set repository website URL to `https://demo.agilitycms.com/docs`
- [ ] Add cross-links from live site to GitHub
- [ ] Add link from agilitycms.com to repository
- [ ] Add structured data (JSON-LD) to homepage
- [ ] Verify in Google Search Console (`demo.agilitycms.com`)
- [ ] Submit sitemaps (main + docs if separate)
- [ ] Request manual indexing of key pages
- [ ] Set up GitHub Pages (optional backup)

### Phase 3: Monitoring & Optimization
- [ ] Monitor indexing status
- [ ] Track search performance
- [ ] Analyze which docs pages get traffic
- [ ] Optimize based on search queries
- [ ] Add internal linking between docs
- [ ] Create docs index/search page

## Monitoring

### Google Search Console Metrics
- Track impressions for "Agility CMS Next.js demo"
- Monitor click-through rates
- Check indexing status
- Review search queries

### GitHub Analytics
- Track repository views
- Monitor stars and forks
- Review traffic sources

## Expected Timeline

- **Week 1**: Set up MDX routing and docs pages
- **Week 2**: SEO optimization, structured data, sitemaps
- **Week 3**: Google Search Console setup, indexing requests
- **2-4 weeks**: Google starts indexing docs pages
- **1-2 months**: Full indexing and domain association
- **Ongoing**: Monitor and optimize based on performance

## Key SEO Benefits of In-Site Docs

1. **Domain Authority**: All docs content contributes to `demo.agilitycms.com` domain authority
2. **Internal Linking**: Natural cross-linking between docs and site content
3. **User Signals**: Users reading docs on-site sends positive signals to Google
4. **Content Depth**: More indexed pages = better site authority
5. **Long-tail Keywords**: Docs capture long-tail search queries
6. **Freshness**: Easy to update docs and signal freshness to Google
7. **Mobile-Friendly**: Responsive docs improve mobile search rankings

## Additional Resources

- [Google Search Central Documentation](https://developers.google.com/search/docs)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Schema.org SoftwareSourceCode](https://schema.org/SoftwareSourceCode)
- [GitHub SEO Best Practices](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/creating-diagrams)

---

**Note**: Domain association happens naturally over time through consistent cross-linking, structured data, and content signals. Focus on creating quality content and proper linking structure.
