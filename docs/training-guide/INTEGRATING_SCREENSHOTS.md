# Integrating Screenshots into Training Guides

This guide explains how to add screenshots to the training materials and reference them in the markdown files.

## Screenshot Organization

Screenshots are organized into two main directories:

- `screenshots/website/` - Screenshots of the live website
- `screenshots/agility-cms/` - Screenshots of the Agility CMS interface

## Adding Screenshots to Guides

### Basic Image Reference

Use standard markdown image syntax with relative paths:

```markdown
![Alt text describing the screenshot](./assets/screenshots/website/01-homepage.jpeg)
```

### Screenshot Examples by Section

#### Content Editor Guide

**Dashboard Overview:**
```markdown
![Agility CMS Dashboard](./assets/screenshots/agility-cms/01-dashboard-home.png)
```

**Content Section:**
```markdown
![Content Section Overview](./assets/screenshots/agility-cms/02-content-section-overview.png)
```

**Creating a Blog Post:**
```markdown
![Posts Content List](./assets/screenshots/agility-cms/03-content-posts-list.png)

To create a new blog post, navigate to the Posts content list and click "Add Content".

![Content Item Edit View](./assets/screenshots/agility-cms/13-page-edit-view.png)
```

**Page Management:**
```markdown
![Sitemap View](./assets/screenshots/agility-cms/09-sitemap-view.png)

The sitemap shows the structure of your website. Click on any page to edit it.

![Page Edit View](./assets/screenshots/agility-cms/13-page-edit-view.png)
```

#### Developer Guide

**Component Structure:**
```markdown
![Components Section](./assets/screenshots/agility-cms/10-components-section.png)

All components must be registered in the frontend code.

![Component Definition](./assets/screenshots/agility-cms/14-component-definition.png)
```

**Website Examples:**
```markdown
![Homepage](./assets/screenshots/website/01-homepage.jpeg)

The homepage demonstrates multiple components working together.

![Blog Listing](./assets/screenshots/website/06-blog-listing.png)

The blog listing page uses the PostListing component.
```

#### Administrator Guide

**Content Models:**
```markdown
![Content Section](./assets/screenshots/agility-cms/02-content-section-overview.png)

This view shows all available content models in the instance.

![Authors Content List](./assets/screenshots/agility-cms/04-content-authors-list.png)

Content items like Authors are managed in their respective content lists.
```

**Asset Management:**
```markdown
![Assets Section](./assets/screenshots/agility-cms/11-assets-section.png)

The Assets section is where you manage all media files.
```

## Screenshot Naming Convention

When adding new screenshots, follow this naming pattern:

### Website Screenshots
- Format: `##-page-name.png`
- Example: `01-homepage.jpeg`, `02-about-page.jpeg`

### Agility CMS Screenshots
- Format: `##-section-description.png`
- Example: `01-dashboard-home.png`, `03-content-posts-list.png`

### Numbering System
- `01-09`: Main navigation and overview screens
- `10-19`: Detailed views and edit screens
- `20+`: Additional or specialized views

## Best Practices

1. **Descriptive Alt Text**: Always include meaningful alt text
   ```markdown
   ![Agility CMS Dashboard showing main navigation](./assets/screenshots/agility-cms/01-dashboard-home.png)
   ```

2. **Context Before Screenshot**: Explain what the user is looking at
   ```markdown
   When you first log into Agility CMS, you'll see the dashboard:

   ![Dashboard Home](./assets/screenshots/agility-cms/01-dashboard-home.png)
   ```

3. **Caption After Screenshot**: Add additional context if needed
   ```markdown
   ![Content Section](./assets/screenshots/agility-cms/02-content-section-overview.png)

   *The Content section shows all available content models. Click on any model to view or create content items.*
   ```

4. **Sequence Screenshots**: Show workflows with multiple screenshots
   ```markdown
   ### Creating a New Page

   1. Navigate to the Pages section:

   ![Pages Section](./assets/screenshots/agility-cms/08-pages-section.png)

   2. Click on Sitemap to see the page structure:

   ![Sitemap View](./assets/screenshots/agility-cms/09-sitemap-view.png)

   3. Click on a page to edit it:

   ![Page Edit View](./assets/screenshots/agility-cms/13-page-edit-view.png)
   ```

## Screenshot Checklist

When adding screenshots to a guide:

- [ ] Screenshot is saved in the correct directory
- [ ] Filename follows naming convention
- [ ] Alt text is descriptive and helpful
- [ ] Screenshot is referenced in context
- [ ] Path is relative (starts with `./assets/screenshots/`)
- [ ] Screenshot shows relevant information
- [ ] Screenshot is clear and readable

## Common Screenshot Locations

### Content Editor Guide
- Dashboard and navigation
- Content creation workflows
- Page editing
- Media management

### Developer Guide
- Component definitions
- API structure examples
- Website examples showing components

### Architect Guide
- System architecture diagrams
- Content model relationships
- Multi-channel examples

### Administrator Guide
- User management
- Content model administration
- Component management
- Settings and configuration

## Updating This Document

When adding new screenshot types or patterns, update this document to help future maintainers.

---

*For more information, see [Screenshots README](./assets/screenshots/README.md)*

